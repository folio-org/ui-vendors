import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TetherComponent from 'react-tether';
import { Field, getFormValues } from 'redux-form';
import { MultiSelection, Col, Select, TextField } from '@folio/stripes/components';
import css from './css/MultiForms.css';
import { Required } from '../Utils/Validate';

class EmailMF extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.string),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
    name: PropTypes.string,
    index: PropTypes.number,
    fields: PropTypes.object,
    emailCollection: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currWidth: 100,
      filteredCollection: []
    };
    this.selectedValues = this.selectedValues.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputClear = this.onInputClear.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.fieldRef = React.createRef();
    return false;
  }

  componentDidMount() {
    const { currWidth } = this.state;
    const { clientWidth } = this.fieldRef.current;
    if (clientWidth !== currWidth) {
      return this.setState({ currWidth: clientWidth });
    }
    return false;
  }

  // Multi dropdown
  onChangeSelect = (e, elem, propertyName) => {
    const { dispatch, change } = this.props;
    return dispatch(change(`${elem}.${propertyName}`, e));
  }

  selectedValues = (index, fields, propertyName) => {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const currValues = formValues[fields.name][index][propertyName] || null;
    return currValues;
  }

  toString = (option) => option;
  formatter = ({ option }) => <div>{option}</div>;
  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;

    return { renderedItems };
  };
  // End Multi dropdown

  // Input Actions
  // variables and prop names needs to be change for other use
  onInputChange(obj, e) {
    const { isOpen } = this.state;
    const { phoneCollection } = this.props;
    if (!_.isEmpty(phoneCollection) && (e.trim().length >= 1)) {
      const num = phoneCollection;
      const objFiltered = _.filter(num, (o) => {
        const phoneNumber = ((o.phone_number || []).phone_number || []);
        if (!_.includes(phoneNumber, e)) return false;
        return o;
      });

      if (!_.isEmpty(objFiltered) && !isOpen) {
        return this.setState({ isOpen: true, filteredCollection: objFiltered });
      } else if (_.isEmpty(objFiltered) && isOpen) {
        return this.setState({ isOpen: false, filteredCollection: [] });
      }
      return false;
    }

    if (isOpen) this.setState({ isOpen: false, filteredCollection: [] });
    return false;
  }

  onInputClear() {
    const { isOpen } = this.state;
    if (isOpen) this.setState({ isOpen: false, filteredCollection: [] });
  }

  onClickItem(name, item) {
    const { isOpen } = this.state;
    const { dispatch, change } = this.props;
    dispatch(change(`${name}`, item));
    if (isOpen) this.setState({ isOpen: false, filteredCollection: [] });
    return false;
  }

  onKeyPressed = () => {
    return false;
  }

  renderItem = (name) => {
    const { filteredCollection } = this.state;
    const listItems = filteredCollection.map((item, i) => {
      return (
        <div key={i}>
          <div className={css.inlineButton} onClick={() => this.onClickItem(name, item)} onKeyPress={(e) => this.onKeyPressed(e)} role="presentation">
            {item.phone_number.phone_number}
          </div>
        </div>
      );
    });
    return (<div>{listItems}</div>);
  }
  // End Input Actions


  render() {
    const { isOpen, currWidth } = this.state;
    const {
      name,
      index,
      fields,
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

    return (
      <Fragment>
        <Col xs={12} md={3}>
          <TetherComponent
            attachment="top left"
            targetAttachment="bottom left"
            constraints={constraints}
          >
            <div ref={this.fieldRef}>
              <Field onChange={this.onInputChange} onClearField={this.onInputClear} label="Phone Number*" name={`${name}.phone_number.phone_number`} id={`${name}.phone_number.phone_number`} component={TextField} fullWidth />
            </div>
            {
              isOpen && (
              <div className={css.dropdown} style={{ width:`${currWidth}px` }}>
                <span className={css.dropDownItem}>
                  {this.renderItem(name)}
                </span>
              </div>
              )
            }
          </TetherComponent>
        </Col>
        <Col xs={12} md={3}>
          <Field label="Email Address*" name={`${name}.email.value`} id={`${name}.email.value`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Description" name={`${name}.email.description`} id={`${name}.email.description`} component={TextField} fullWidth />
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
            value={this.selectedValues(index, fields, 'categories')}
            itemToString={this.toString}
            formatter={this.formatter}
          />
        </Col>
      </Fragment>
    );
  }
}


export default EmailMF;
