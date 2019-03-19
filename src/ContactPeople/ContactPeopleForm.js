import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray, getFormValues } from 'redux-form';
import { MultiSelection, Select, Row, Col, Button, TextField, Checkbox } from '@folio/stripes/components';
import { AdditionalAddress, AdditionalEmails, AdditionalPhoneNumbers, AdditionalUrls } from './ContactPeopleFormGroup';
import { Required } from '../Utils/Validate';
import css from './ContactPeopleForm.css';

class ContactPeopleForm extends Component {
  static propTypes = {
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

  onPhoneStateUpdate(obj) {
    if (!obj) return false;
    return this.setState(obj);
  }

  // Multi Select
  toString = (option) => option;
  formatter = ({ option }) => {
    const { dropdownVendorCategories } = this.props;
    const item = _.find(dropdownVendorCategories, { id: option }) || option;
    if (!item) return option;
    return <div>{item.value}</div>;
  };

  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
    return { renderedItems };
  };
  // End Multi Select

  renderCreateContact = ({ fields }) => {
    return (
      <Row>
        {fields.length === 0 &&
          <Col xs={12}>
            <div><em>{<FormattedMessage id="ui-vendors.contactPeople.pleaseAddContactPerson" />}</em></div>
          </Col>
        }
        {fields.map(this.renderSubCreateContact)}
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-vendors.contactPeople.add" />}</Button>
        </Col>
      </Row>
    );
  }

  renderSubCreateContact = (elem, index, fields) => {
    const { dropdownLanguages, dropdownVendorCategories } = this.props;
    return (
      <Col xs={12} key={index} className={css.panels}>
        <Row>
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactPeople.name" />}</div>
          </Col>
          <Col xs={12} md={2}>
            <Field label={<FormattedMessage id="ui-vendors.contactPeople.prefix" />} name={`${elem}.prefix`} id={`${elem}.perfix`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={5}>
            <Field label={<FormattedMessage id="ui-vendors.contactPeople.firstNameAst" />} name={`${elem}.first_name`} id={`${elem}.first_name`} validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={5}>
            <Field label={<FormattedMessage id="ui-vendors.contactPeople.lastNameAst" />} name={`${elem}.last_name`} id={`${elem}.last_name`} validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={2}>
            <div>Status</div>
            <Field label={<FormattedMessage id="ui-vendors.contactPeople.inactive" />} name={`${elem}.inactive`} id={`${elem}.inactive`} component={Checkbox} inline />
          </Col>
          <Col xs={12} md={5}>
            <Field label={<FormattedMessage id="ui-vendors.contactPeople.language" />} name={`${elem}.language`} id={`${elem}.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
          </Col>
          <Col xs={12} md={5}>
            <Field
              component={MultiSelection}
              label={<FormattedMessage id="ui-vendors.contactPeople.categories" />}
              name={`${elem}.categories`}
              style={{ height: '80px' }}
              onBlur={(e) => { e.preventDefault(); }}
              dataOptions={dropdownVendorCategories}
              itemToString={this.toString}
              formatter={this.formatter}
              filter={this.filterItems}
            />
          </Col>
          <Col xs={12}>
            <hr className={css.thinBorder} />
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactPeople.addesses" />}</div>
          </Col>
          <Col xs={12}>
            <FieldArray
              label="Addresses"
              name={`${elem}.addresses`}
              id={`${elem}.addresses`}
              component={AdditionalAddress}
              {...this.props}
              contactPeopleForm
            />
          </Col>
          <Col xs={12}>
            <hr className={css.thinBorder} />
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactPeople.phoneNumbers" />}</div>
          </Col>
          <Col xs={12}>
            <FieldArray
              label="Phone Numbers"
              name={`${elem}.phone_numbers`}
              id={`${elem}.phone_numbers`}
              component={AdditionalPhoneNumbers}
              {...this.props}
              contactPeopleForm
            />
          </Col>
          <Col xs={12}>
            <hr className={css.thinBorder} />
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactPeople.emails" />}</div>
          </Col>
          <Col xs={12}>
            <FieldArray
              label="Additional Email"
              name={`${elem}.emails`}
              id={`${elem}.emails`}
              component={AdditionalEmails}
              {...this.props}
              contactPeopleForm
            />
          </Col>
          <Col xs={12}>
            <hr className={css.thinBorder} />
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactPeople.urls" />}</div>
          </Col>
          <Col xs={12}>
            <FieldArray
              label="Additional Email"
              name={`${elem}.urls`}
              id={`${elem}.urls`}
              component={AdditionalUrls}
              {...this.props}
              contactPeopleForm
            />
          </Col>
          <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger">
              {<FormattedMessage id="ui-vendors.contactPeople.removeContact" />}
            </Button>
          </Col>
          <Col xs={12}>
            <hr className={css.thickBorder} />
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
