import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TetherComponent from 'react-tether';
import { Field, getFormValues } from 'redux-form';
import { MultiSelection, Col, Select, TextField, Row, Button, KeyValue } from '@folio/stripes/components';
import { Required } from '../Utils/Validate';
import css from './css/Emails.css';

class Emails extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.string),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
    phoneCollection: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.state = {
      parentName: 'emails',
      isOpen: false,
      currWidth: 100,
      itemCollection: [],
      items: []
    };
    this.renderSub = this.renderSub.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    // this.selectedValues = this.selectedValues.bind(this);
    this.onPhoneInputChange = this.onPhoneInputChange.bind(this);
    this.onPhoneInputClear = this.onPhoneInputClear.bind(this);
    this.onPhoneClickItem = this.onPhoneClickItem.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.phoneRenderItem = this.phoneRenderItem.bind(this);
    this.fieldRef = React.createRef();
    return false;
  }

  static getDerivedStateFromProps(props, state) {
    const { stripes: { store } } = props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const currValues = formValues[state.parentName] || null;
    console.log(currValues);
    
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

  // Phone Numbers
  onPhoneInputChange(obj, e) {
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
        return this.setState({ isOpen: true, itemCollection: objFiltered });
      } else if (_.isEmpty(objFiltered) && isOpen) {
        return this.setState({ isOpen: false, itemCollection: [] });
      }
      return false;
    }

    if (isOpen) this.setState({ isOpen: false, itemCollection: [] });
    return false;
  }

  onPhoneInputClear() {
    const { isOpen } = this.state;
    if (isOpen) this.setState({ isOpen: false, itemCollection: [] });
  }

  onPhoneClickItem(name, item) {
    const { isOpen } = this.state;
    const { dispatch, change } = this.props;
    dispatch(change(`${name}`, item));
    if (isOpen) this.setState({ isOpen: false, itemCollection: [] });
    return false;
  }

  onKeyPressed = () => {
    return false;
  }

  phoneRenderItem = (name) => {
    const { itemCollection } = this.state;
    const listItems = itemCollection.map((item, i) => {
      return (
        <div key={i}>
          <div className={css.inlineButton} onClick={() => this.onPhoneClickItem(name, item)} onKeyPress={(e) => this.onKeyPressed(e)} role="presentation">
            {item.phone_number.phone_number}
          </div>
        </div>
      );
    });
    return (<div>{listItems}</div>);
  }
  // End Phone Numbers

  renderSub = (elem, index, fields) => {
    const { isOpen, currWidth } = this.state;
    const { dropdownCategories, dropdownLanguages, name, label } = this.props;
    const constraints = [{
      to: 'window',
      attachment: 'together',
    },
    {
      to: 'scrollParent',
      pin: false
    }];

    console.log(elem);
    return (
      <div>
        <KeyValue label="Phone Number" value={_.get(elem, 'email.value', '')} />
        <Row>
          {/* <Col xs={12} md={3}>
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
          </Col> */}
          <Col xs={12} md={3}>
            <Field label="Email Address*" name={`${elem}.email.value`} id={`${elem}.email.value`} validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={3}>
            <Field label="Description" name={`${elem}.email.description`} id={`${elem}.email.description`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={3}>
            <Field label="Default Language" name={`${elem}.language`} id={`${elem}.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
          </Col>
          <Col xs={12} md={3}>
            <Field
              component={MultiSelection}
              filter={this.filterItems}
              label="Categories"
              name={`${elem}.categories`}
              dataOptions={dropdownCategories}
              onChange={(e) => this.onChangeSelect(e, elem, 'categories')}
              style={{ height: '80px' }}
              value={this.selectedValues(index, fields, 'categories')}
              itemToString={this.toString}
              formatter={this.formatter}
            />
          </Col>
          <Col xs={12} md={6} mdOffset={6} style={{ textAlign: 'right' }}>
            <Button onClick={() => fields.remove(index)} buttonStyle="primary">
              Save to Phone API
            </Button>
            <span> || </span>
            <Button onClick={() => fields.remove(index)} buttonStyle="primary">
              Edit
            </Button>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger">
              Remove
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <div className={css.subHeadings}>Email Address</div>
        </Col>
        {fields.length === 0 &&
          <Col xs={12}>
            <div><em>- Please add email -</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSub)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add Email</Button>
        </Col>
      </Row>
    );
  }
}

export default Emails;
