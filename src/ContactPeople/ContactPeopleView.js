import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { AddressView } from '@folio/stripes/smart-components';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import BoolToCheckbox from '../Utils/BoolToCheckbox';
import css from './ContactPeopleView.css';
import CatIDToLabel from '../Utils/CatIDToLabel';

class ContactPeopleView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object.isRequired,
      dropdownCategories: PropTypes.arrayOf(PropTypes.object),
      CountryList: PropTypes.arrayOf(PropTypes.object)
    })
  }

  constructor(props) {
    super(props);
    this.getContacts = this.getContacts.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getAddresses = this.getAddresses.bind(this);
    this.getAddPhoneNumbers = this.getAddPhoneNumbers.bind(this);
    this.getAddEmails = this.getAddEmails.bind(this);
    this.getAddUrls = this.getAddUrls.bind(this);
  }

  getVendorcategory() {
    const { parentResources } = this.props;
    const data = ((parentResources || {}).vendorCategory || {}).records || [];
    if (data.length === 0) return null;
    return data;
  }

  getAddresses(val, key) {
    const newVal = Object.assign({}, val);
    newVal.categories = CatIDToLabel(val.categories, this.getVendorcategory()) || '';

    const visibleFields = [
      'addressLine1',
      'addressLine2',
      'city',
      'stateRegion',
      'zipCode',
      'country',
      'categories'
    ];

    return (
      <Row key={key}>
        <Col xs={12}>
          <AddressView addressObject={newVal} visibleFields={visibleFields} />
        </Col>
      </Row>
    );
  }

  getAddPhoneNumbers(val, key) {
    const categories = CatIDToLabel(val.categories, this.getVendorcategory()) || '';
    return (
      <Row key={key} className={css.rptBlocks}>
        <Col xs={3}>
          <KeyValue label="Phone Number" value={_.get(val, 'phone_number', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Type" value={_.get(val, 'type', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={_.get(val, 'language', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Categories" value={categories} />
        </Col>
      </Row>
    );
  }

  getAddEmails(val, key) {
    const categories = CatIDToLabel(val.categories, this.getVendorcategory()) || '';
    return (
      <Row key={key} className={css.rptBlocks}>
        <Col xs={3}>
          <KeyValue label="Email" value={`${_.get(val, 'value', '')}`} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Description" value={`${_.get(val, 'description', '')}`} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={`${_.get(val, 'language', '')}`} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Categories" value={categories} />
        </Col>
      </Row>
    );
  }

  getAddUrls(val, key) {
    const categories = CatIDToLabel(val.categories, this.getVendorcategory()) || '';
    return (
      <Row key={key} className={css.rptBlocks}>
        <Col xs={3}>
          <KeyValue label="URL" value={`${_.get(val, 'value', '')}`} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Description" value={`${_.get(val, 'description', '')}`} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={`${_.get(val, 'language', '')}`} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Categories" value={categories} />
        </Col>
      </Row>
    );
  }

  getCategories(val) {
    if (_.isEmpty(val.categories)) return [];
    const categories = val.categories.map(item => item.value);
    return categories.join(', ');
  }

  getContacts(val, key) {
    const rowCount = (this.props.initialValues.contacts.length - 1) !== key;
    const fullName = `${_.get(val, 'prefix', '')} ${_.get(val, 'first_name', '')} ${_.get(val, 'last_name', '')}`;
    const language = `${_.get(val, 'language', '')}`;
    const addressComplete = _.get(val, 'addresses', '');
    const addPhoneNumbers = _.get(val, 'phone_numbers', '');
    const addEmails = _.get(val, 'emails', '');
    const addURLS = _.get(val, 'urls', '');

    return (
      <div className={css.horizontalLine}>
        <Row key={key}>
          <Col xs={3}>
            <KeyValue label="Name" value={fullName} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Inactive">
              <BoolToCheckbox name="Status" value={_.get(val, ['inactive'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label="Language" value={language} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Categories" value={this.getCategories(val)} />
          </Col>
          { addressComplete.length > 0 && (
            <Fragment>
              <Col xs={12}>
                <hr />
                <div className={css.sub2Headings}>Addresses</div>
              </Col>
              <Col xs={12}>
                { addressComplete.map(this.getAddresses) }
              </Col>
            </Fragment>
          )}
          { addPhoneNumbers.length > 0 && (
            <Fragment>
              <Col xs={12}>
                <hr />
                <div className={css.sub2Headings}>Phone Numbers</div>
              </Col>
              <Col xs={12}>
                { addPhoneNumbers.map(this.getAddPhoneNumbers) }
              </Col>
            </Fragment>
          )}
          { addEmails.length > 0 && (
            <Fragment>
              <Col xs={12}>
                <hr />
                <div className={css.sub2Headings}>Email</div>
              </Col>
              <Col xs={12}>
                { addEmails.map(this.getAddEmails) }
              </Col>
            </Fragment>
          )}
          { addURLS.length > 0 && (
            <Fragment>
              <Col xs={12}>
                <hr />
                <div className={css.sub2Headings}>URLs</div>
              </Col>
              <Col xs={12}>
                { addURLS.map(this.getAddUrls) }
              </Col>
            </Fragment>
          )}
        </Row>
      </div>
    );
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.contacts.length >= 1 ? initialValues.contacts : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }}>
          {dataVal.map(this.getContacts)}
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No contact available --</p>
        </div>
      );
    }
  }
}

export default ContactPeopleView;
