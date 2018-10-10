import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, getFormValues } from 'redux-form';
import { MultiSelection, Row, Col, Button, TextField, TextArea, Select } from '@folio/stripes/components';
import { Required } from '../Utils/Validate';
import css from './ContactPeopleForm.css';

class ContactPeopleForm extends Component {
  static propTypes = {
    dropdownContactCategories: PropTypes.arrayOf(PropTypes.object),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownCountry: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      store: PropTypes.func
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.renderCreateContact = this.renderCreateContact.bind(this);
    this.renderSubCreateContact = this.renderSubCreateContact.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.selectedValues = this.selectedValues.bind(this);
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
            <Field label="Address 1" name={`${elem}.contact_person.address.addressLine1`} id={`${elem}.contact_person.address.addressLine1`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="Address 2" name={`${elem}.contact_person.address.addressLine2`} id={`${elem}.contact_person.address.addressLine2`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="City" name={`${elem}.contact_person.address.city`} id={`${elem}.contact_person.address.city`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="Region" name={`${elem}.contact_person.address.stateRegion`} id={`${elem}.contact_person.address.stateRegion`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={4}>
            <Field label="Country*" name={`${elem}.contact_person.address.country`} id={`${elem}.contact_person.address.country`} validate={[Required]} component={Select} dataOptions={dropdownCountry} fullWidth />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
            <div className={css.subHeadings}>Contacts</div>
          </Col>
          <Col xs={12} md={2}>
            <Field label="Country Code" name={`${elem}.contact_person.phone_number.country_code`} id={`${elem}.contact_person.phone_number.country_code`} type="tel" component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={5}>
            <Field label="Area Code" name={`${elem}.contact_person.phone_number.area_code`} id={`${elem}.contact_person.phone_number.area_code`} type="tel" component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={5}>
            <Field label="Phone Number*" name={`${elem}.contact_person.phone_number.phone_number`} id={`${elem}.contact_person.phone_number.phone_number`} type="tel" validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
          </Col>
          <Col xs={12} md={6}>
            <Field label="Email Address*" name={`${elem}.contact_person.email.value`} id={`${elem}.contact_person.email.value`} type="email" validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label="Description" name={`${elem}.contact_person.email.description`} id={`${elem}.contact_person.email.description`} component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
          </Col>
          <Col xs={12} md={6}>
            <Field label="URL*" name={`${elem}.contact_person.url.value`} id={`${elem}.url.value`} validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label="URL Description" name={`${elem}.contact_person.url.description`} id={`${elem}.url.description`} component={TextField} fullWidth />
          </Col>
          <Col xs={12}>
            <hr style={{ borderColor: '#f0f0f0' }} />
          </Col>
          <Col xs={12} md={3}>
            <Field label="Default Language" name={`${elem}.contact_person.language`} id={`${elem}.contact_person.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
          </Col>
          <Col xs={12} md={3}>
            <MultiSelection label="Categories" name={`${elem}.categories`} dataOptions={this.props.dropdownContactCategories} onChange={(e) => this.onChangeSelect(e, elem, 'categories')} style={{ height: '80px' }} value={this.selectedValues(index, fields, 'categories')} />
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

export default ContactPeopleForm;
