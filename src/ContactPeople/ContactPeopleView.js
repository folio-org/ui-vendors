import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from './ContactPeopleView.css';

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
    this.getAddPhoneNumbers = this.getAddPhoneNumbers.bind(this);
    this.getAddEmails = this.getAddEmails.bind(this);
    this.getAddUrls = this.getAddUrls.bind(this);
  }

  getAddPhoneNumbers(val, key) {
    const categories = val.categories.join(', ') || null;
    return (
      <Row key={key} className={css.rptBlocks}>
        <Col xs={3}>
          <KeyValue label="Phone Number" value={_.get(val, 'phone_number.phone_number', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Type" value={_.get(val, 'types', '')} />
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
    const categories = val.categories.join(', ') || null;
    return (
      <Row key={key} className={css.rptBlocks}>
        <Col xs={4}>
          <KeyValue label="Email" value={`${_.get(val, 'email.value', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Description" value={`${_.get(val, 'email.value', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Language" value={`${_.get(val, 'language', '')}`} />
        </Col>
      </Row>
    );
  }

  getAddUrls(val, key) {
    const categories = val.categories.join(', ') || null;
    return (
      <Row key={key} className={css.rptBlocks}>
        <Col xs={4}>
          <KeyValue label="URL" value={`${_.get(val, 'url.value', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Description" value={`${_.get(val, 'url.value', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Language" value={`${_.get(val, 'language', '')}`} />
        </Col>
      </Row>
    );
  }

  getContacts(val, key) {
    const { parentResources: { CountryList } } = this.props;
    const rowCount = (this.props.initialValues.contacts.length - 1) !== key;
    const categories = val.categories.join(', ') || null;
    const fullName = `${_.get(val, 'contact_person.prefix', '')} ${_.get(val, 'contact_person.first_name', '')} ${_.get(val, 'contact_person.last_name', '')}`;
    const language = `${_.get(val, 'contact_person.language', '')}`;
    // Address
    const address = _.get(val, 'contact_person.primary_address.address.addressLine1', '');
    const city = _.get(val, 'contact_person.primary_address.address.city', '');
    const stateRegion = _.get(val, 'contact_person.primary_address.address.stateRegion', '');
    const countryVal = _.get(val, 'contact_person.primary_address.address.country', '');
    const isCountry = CountryList.find(x => x.value === countryVal);
    const country = isCountry && isCountry.value !== '' ? `${isCountry.label}` : '';
    const zipCode = _.get(val, 'contact_person.primary_address.address.zipCode', '');
    const AddressComplete = `${address} ${city} ${stateRegion} ${country} ${zipCode}`;
    const addPhoneNumbers = _.get(val, 'contact_person.phone_numbers', '');
    const addEmails = _.get(val, 'contact_person.emails', '');
    const addURLS = _.get(val, 'contact_person.urls', '');

    return (
      <Row key={key}>
        <Col xs={4}>
          <KeyValue label="Name" value={fullName} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Language" value={language} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Address" value={AddressComplete} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Address 2" value={_.get(val, 'contact_person.primary_address.address.addressLine2', '')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Notes" value={_.get(val, 'contact_person.notes')} />
        </Col>
        <Col xs={12}> 
          <div className={css.subHeadings}>Primary Numbers</div>
        </Col>
        <Col xs={4}>
          <KeyValue label="Phone Number" value={`${_.get(val, 'contact_person.primary_phone_number.phone_number.phone_number', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Type" value={`${_.get(val, 'contact_person.primary_phone_number.phone_number.type', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Category" value={`${_.get(val, 'contact_person.primary_phone_number.categories', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Language" value={`${_.get(val, 'contact_person.primary_phone_number.Language', '')}`} />
        </Col>
        { addPhoneNumbers.length > 0 && (
          <Fragment>
            <Col xs={12}>
              <div className={css.sub2Headings}>Additional Phone Numbers</div>
            </Col>
            <Col xs={12}>
              { addPhoneNumbers.map(this.getAddPhoneNumbers) }
            </Col>
          </Fragment>
        )}
        <Col xs={12}>
          <div className={css.subHeadings}>Primary Email</div>
        </Col>
        <Col xs={4}>
          <KeyValue label="Email" value={`${_.get(val, 'contact_person.primary_email.email.value', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Description" value={`${_.get(val, 'contact_person.primary_email.email.description', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Category" value={`${_.get(val, 'contact_person.primary_email.categories', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Language" value={`${_.get(val, 'contact_person.primary_email.language', '')}`} />
        </Col>
        { addEmails.length > 0 && (
          <Fragment>
            <Col xs={12}>
              <div className={css.sub2Headings}>Additional Email</div>
            </Col>
            <Col xs={12}>
              <p>This is email section</p>
              { addEmails.map(this.getAddEmails) }
            </Col>
          </Fragment>
        )}

        <Col xs={12}>
          <div className={css.subHeadings}>Primary URL</div>
        </Col>
        <Col xs={4}>
          <KeyValue label="URL" value={`${_.get(val, 'contact_person.primary_url.url.value', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Description" value={`${_.get(val, 'contact_person.primary_url.url.description', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Category" value={`${_.get(val, 'contact_person.primary_url.categories', '')}`} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Language" value={`${_.get(val, 'contact_person.primary_url.language', '')}`} />
        </Col>
        { addURLS.length > 0 && (
          <Fragment>
            <Col xs={12}>
              <div className={css.sub2Headings}>Additional URL</div>
            </Col>
            <Col xs={12}>
              <p>This is email section</p>
              { addURLS.map(this.getAddUrls) }
            </Col>
          </Fragment>
        )}
        {rowCount &&
          <div style={{ width: '100%' }}>
            <hr />
          </div>
        }
      </Row>
    );
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.contacts.length >= 1 ? initialValues.contacts : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }} className={css.horizontalLine}>
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
