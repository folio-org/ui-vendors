import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TetherComponent from 'react-tether';
import { Field } from 'redux-form';
import { MultiSelection, Row, Col, Select, TextField } from '@folio/stripes/components';
import { Required } from './Validate';
import css from './PhoneNumbersCP.css';

class PhoneNumbersCP extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.string),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
    name: PropTypes.string,
    phoneCollection: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currWidth: 100,
      phoneFilteredCollection: []
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onPhoneInputChange = this.onPhoneInputChange.bind(this);
    this.onPhoneInputClear = this.onPhoneInputClear.bind(this);
    this.onPhoneClickItem = this.onPhoneClickItem.bind(this);
    this.phoneRenderItem = this.phoneRenderItem.bind(this);

    this.fieldRef = React.createRef();
  }

  componentDidMount() {
    const { currWidth } = this.state;
    const { clientWidth } = this.fieldRef.current;
    if (clientWidth !== currWidth) {
      return this.setState({ currWidth: clientWidth });
    }
    return false;
  }

  static getSnapshotBeforeUpdate(prevProps, prevState) {
    const { clientWidth } = this.fieldRef.current;
    if (clientWidth !== prevState.currWidth) {
      return this.setState({ currWidth: clientWidth });
    }
    return false;
  }

  onChangeSelect = (e, elem, propertyName) => {
    const { dispatch, change } = this.props;
    dispatch(change(`${elem}.${propertyName}`, e));
  }
  // For Multi dropdown
  toString = (option) => option;
  formatter = ({ option }) => <div>{option}</div>;
  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
    return { renderedItems };
  };

  onPhoneInputChange(obj, e) {
    const { isOpen } = this.state;
    const { phoneCollection } = this.props;
    if (!_.isEmpty(phoneCollection) && (e.trim().length >= 1)) {
      const num = phoneCollection;
      const objFiltered = _.filter(num, (o) => o.phone_number.phone_number.includes(e));
      if (!_.isEmpty(objFiltered) && !isOpen) {
        return this.setState({ isOpen: true, phoneFilteredCollection: objFiltered });
      } else if (_.isEmpty(objFiltered) && isOpen) {
        return this.setState({ isOpen: false, phoneFilteredCollection: [] });
      }
      return false;
    }

    if (isOpen) this.setState({ isOpen: false, phoneFilteredCollection: [] });
    return false;
  }

  onPhoneInputClear() {
    const { isOpen } = this.state;
    if (isOpen) this.setState({ isOpen: false, phoneFilteredCollection: [] });
  }

  onPhoneClickItem(name, item) {
    const { isOpen } = this.state;
    const { dispatch, change } = this.props;
    dispatch(change(`${name}`, item));
    if (isOpen) this.setState({ isOpen: false, phoneFilteredCollection: [] });
  }

  phoneRenderItem = (name) => {
    const { phoneFilteredCollection } = this.state;
    const listItems = phoneFilteredCollection.map((item, i) => {
      return (
        <div key={i}>
          <div className={css.inlineButton} onClick={(e) =>this. onPhoneClickItem(name, item)}>
            {item.phone_number.phone_number}
          </div>
        </div>
      );
    });
    return (<div>{listItems}</div>);
  }

  renderCreateContact = ({ fields }) => {
    return (
      <Row>
        {fields.length === 0 &&
          <Col xs={12}>
            <div><em>- Please add contact person -</em></div>
          </Col>
        }
        {fields.map(this.renderSubCreateContact)}
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add</Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { isOpen, currWidth } = this.state;
    const {
      name,
      dropdownCategories,
      dropdownLanguages,
      dropdownPhoneType,
    } = this.props;
    const constraints = [{
      to: 'window',
      attachment: 'together',
    },
    {
      to: 'scrollParent',
      pin: false
    }];

    console.log(currWidth);

    return (
      <Fragment>
        <Col xs={12} md={3}>
          <TetherComponent
            attachment="top left"
            targetAttachment="bottom left"
            constraints={constraints}
          >
            <div ref={this.fieldRef}>
              <Field onChange={this.onPhoneInputChange} onClearField={this.onPhoneInputClear} label="Phone Number*" name={`${name}.phone_number.phone_number`} id={`${name}.phone_number.phone_number`} component={TextField} fullWidth />
            </div>
            {
              isOpen && (
              <div className={css.dropdown} style={{ width:`${currWidth}px` }}>
                <span className={css.dropDownItem}>
                  {this.phoneRenderItem(name)}
                </span>
              </div>
              )
            }
          </TetherComponent>
        </Col>
        <Col xs={12} md={3}>
          <Field label="Type" name={`${name}.phone_number.type`} id={`${name}.phone_number.type`} component={Select} fullWidth dataOptions={dropdownPhoneType} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${name}.language`} id={`${name}.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
        </Col>
        <Col xs={12} md={3}>
          <Field
            component={MultiSelection}
            filter={this.filterItems}
            label="Categories"
            name={`${name}.categories`}
            dataOptions={dropdownCategories}
            onChange={(e) => this.onChangeSelect(e, name, 'categories')}
            style={{ height: '80px' }}
            itemToString={this.toString}
            formatter={this.formatter}
          />
        </Col>
      </Fragment>
    );
  }
}

export default PhoneNumbersCP;
