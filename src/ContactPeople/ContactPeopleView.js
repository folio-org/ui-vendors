import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import parseCategories from '../Utils/Category';
import css from './ContactPeopleView.css';

class ContactPeopleView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object.isRequired,
      dropdownCategories: PropTypes.arrayOf(PropTypes.object)
    })
  }

  constructor(props) {
    super(props);
    this.getContacts = this.getContacts.bind(this);
  }

  getContacts(val, key) {
    const rowCount = (this.props.initialValues.contacts.length - 1) !== key;
    const dropdownCategories = (this.props.parentResources.dropdown || {}).categoriesDD || [];
    const categories = val.categories && dropdownCategories ? parseCategories(val.categories, dropdownCategories) : null;
    const fullName = `${_.get(val, 'contact_person.prefix', '')} ${_.get(val, 'contact_person.first_name', '')} ${_.get(val, 'contact_person.last_name', '')}`;
    const phoneNumber = `${_.get(val, 'contact_person.phone_number.country_code', '')} ${_.get(val, 'contact_person.phone_number.area_code', '')} ${_.get(val, 'contact_person.phone_number.phone_number', '')}`;
    const language = `${_.get(val, 'contact_person.language', '')}`;
    const address = `${_.get(val, 'contact_person.address.addressLine1', '')} ${_.get(val, 'contact_person.address.city', '')} ${_.get(val, 'contact_person.address.stateRegion', '')} ${_.get(val, 'contact_person.address.country', '')} ${_.get(val, 'contact_person.address.zipCode', '')}`;
    const email = () => {
      const emailDescription = `${_.get(val, 'contact_person.email.description', '')}`;
      if (emailDescription.trim().length >= 1) {
        return `${_.get(val, 'contact_person.email.value', '')} - ${emailDescription}`;
      } else {
        return `${_.get(val, 'contact_person.email.value', '')}`;
      }
    };
    const url = () => {
      const urlDescription = `${_.get(val, 'contact_person.url.description', '')}`;
      if (urlDescription.trim().length >= 1) {
        return `${_.get(val, 'contact_person.url.value', '')} - ${urlDescription}`;
      } else {
        return `${_.get(val, 'contact_person.url.value', '')}`;
      }
    };

    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Name" value={fullName} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Phone Number" value={phoneNumber} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={language} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Address" value={address} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Address 2" value={_.get(val, 'contact_person.address.addressLine2', '')} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Email" value={email()} />
        </Col>
        <Col xs={6}>
          <KeyValue label="Url" value={url()} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Notes" value={_.get(val, 'contact_person.notes')} />
        </Col>
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
