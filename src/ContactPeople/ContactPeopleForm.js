import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray, getFormValues } from 'redux-form';
import { MultiSelection, Row, Col, Button, TextField, TextArea, Select } from '@folio/stripes/components';
import { PhoneNumbers } from '../ContactInformation/ContactInfoFormGroup';
import PhoneNumbersCP from './ContactPeopleForm/PhoneNumbersCP';
import { Required } from '../Utils/Validate';
import css from './ContactPeopleForm.css';

class ContactPeopleForm extends Component {
  static propTypes = {
    dropdownContactCategories: PropTypes.arrayOf(PropTypes.string),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownCountry: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
    phoneCollection: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      phoneFilteredCollection: []
    };
    this.renderCreateContact = this.renderCreateContact.bind(this);
    this.renderSubCreateContact = this.renderSubCreateContact.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.selectedValues = this.selectedValues.bind(this);
    this.onPhoneInputChange = this.onPhoneInputChange.bind(this);
    this.onPhoneInputClear = this.onPhoneInputClear.bind(this);
    this.onPhoneClickItem = this.onPhoneClickItem.bind(this);
    this.phoneRenderItem = this.phoneRenderItem.bind(this);
  }

  onChangeSelect = (e, elem, propertyName) => {
    const { dispatch, change } = this.props;
    dispatch(change(`${elem}.${propertyName}`, e));
  }

  selectedValues = (index, fields, propertyName) => {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const currValues = formValues[fields.name][index][propertyName];
    return currValues;
  }

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
    this.setState({ isOpen: false });
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
          <div style={styles.inlineButton} onClick={(e) =>this. onPhoneClickItem(name, item)}>
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

  // For Multi dropdown
  toString = (option) => option;
  formatter = ({ option }) => <div>{option}</div>;
  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
    return { renderedItems };
  };

  renderSubCreateContact = (elem, index, fields) => {
    const { dropdownLanguages, dropdownCountry } = this.props;
    return (
      <Col xs={12} key={index} className={css.panels}>
        <Row>
          <Col xs={12}>
            <div className={css.subHeadings}>Name</div>
          </Col>
          <Col xs={12} md={2}>
            <Field label="Prefix" name={`${elem}.contact_person.prefix`} id={`${elem}.contact_person.perfix`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={5}>
            <Field label="First Name*" name={`${elem}.contact_person.first_name`} id={`${elem}.contact_person.first_name`} validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={5}>
            <Field label="Last Name*" name={`${elem}.contact_person.last_name`} id={`${elem}.contact_person.last_name`} validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
            <div className={css.subHeadings}>Address</div>
          </Col>
          <Col xs={12} md={4}>
            <Field label="Address 1" name={`${elem}.contact_person.primary_address.address.addressLine1`} id={`${elem}.contact_person.primary_address.address.addressLine1`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="Address 2" name={`${elem}.contact_person.primary_address.address.addressLine2`} id={`${elem}.contact_person.primary_address.address.addressLine2`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="City" name={`${elem}.contact_person.primary_address.address.city`} id={`${elem}.contact_person.primary_address.address.city`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="Region" name={`${elem}.contact_person.primary_address.address.stateRegion`} id={`${elem}.contact_person.primary_address.address.stateRegion`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="ZIP/Postal Code" name={`${elem}.contact_person.primary_address.address.zipCode`} id={`${elem}.address.zipCode`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="Country*" name={`${elem}.contact_person.primary_address.address.country`} id={`${elem}.contact_person.primary_address.country`} validate={[Required]} component={Select} dataOptions={dropdownCountry} fullWidth />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
            <div className={css.subHeadings}>Primary Phone Numbers</div>
          </Col>
          <Col xs={12}>
            <PhoneNumbersCP
              name={`${elem}.contact_person.primary_phone_number`}
              id={`${elem}.contact_person.primary_phone_number`}
              isOpen={this.state.isOpen}
              phoneFilteredCollection={this.state.phoneFilteredCollection}
              onPhoneInputChange={this.onPhoneInputChange}
              onPhoneInputClear={this.onPhoneInputClear}
              onPhoneClickItem={this.onPhoneClickItem}
              phoneRenderItem={this.phoneRenderItem}
              {...this.props}
            />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
            <div className={css.subHeadings}>Additional Phone Numbers</div>
          </Col>
          <Col xs={12}>
            <FieldArray
              label="Phone Numbers"
              name={`${elem}.contact_person.phone_numbers`}
              id={`${elem}.contact_person.phone_numbers`}
              component={PhoneNumbers}
              phoneFilteredCollection={this.state.phoneFilteredCollection}
              onPhoneInputChange={this.onPhoneInputChange}
              onPhoneInputClear={this.onPhoneInputClear}
              onPhoneClickItem={this.onPhoneClickItem}
              phoneRenderItem={this.phoneRenderItem}
              {...this.props}
            />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
            <div className={css.subHeadings}>Email</div>
          </Col>
          <Col xs={12} md={6}>
            <Field label="Email Address*" name={`${elem}.contact_person.primary_email.email.value`} id={`${elem}.contact_person.email.value`} type="email" validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label="Description" name={`${elem}.contact_person.primary_email.email.description`} id={`${elem}.contact_person.email.description`} component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
            <div className={css.subHeadings}>URL</div>
          </Col>
          <Col xs={12} md={6}>
            <Field label="URL" name={`${elem}.contact_person.primary_url.url.value`} id={`${elem}.url.value`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label="URL Description" name={`${elem}.contact_person.primary_url.url.description`} id={`${elem}.url.description`} component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
          </Col>
          <Col xs={12} md={3}>
            <Field label="Default Language" name={`${elem}.contact_person.language`} id={`${elem}.contact_person.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
          </Col>
          <Col xs={12} md={3}>
            <Field
              component={MultiSelection}
              label="Categories"
              name={`${elem}.categories`}
              dataOptions={this.props.dropdownContactCategories}
              onChange={(e) => this.onChangeSelect(e, elem, 'categories')}
              style={{ height: '80px' }}
              value={this.selectedValues(index, fields, 'categories')}
              itemToString={this.toString}
              filter={this.filterItems}
              formatter={this.formatter}
            />
          </Col>
          <Col xs={12} md={6}>
            <Field label="Notes" name={`${elem}.contact_person.notes`} id={`${elem}.contact_person.notes`} component={TextArea} style={{ height: '79px' }} fullWidth />
          </Col>
          <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger">
              Remove
            </Button>
          </Col>
        </Row>
      </Col>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Contacts" name="contacts" id="contacts" component={this.renderCreateContact} />
          <br />
        </Col>
      </Row>
    );
  }
}

const styles = {
  inlineButton: {
    cursor: 'pointer'
  }
};

export default ContactPeopleForm;
