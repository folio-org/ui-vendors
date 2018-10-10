import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes/components';
import { AddressInfo, PhoneNumbers, EmailAddresses, Urls } from './ContactInfoFormGroup';

class ContactInformationForm extends React.Component {
  static propTypes = {
    dropdownCurrencies: PropTypes.arrayOf(PropTypes.object),
    dropdownCategories: PropTypes.arrayOf(PropTypes.object),
    dropdownContactCategories: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Addess" name="addresses" id="addresses_address" component={AddressInfo} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="Phone Numbers" name="phone_numbers" id="phone_numbers" component={PhoneNumbers} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="Email Addresses" name="emails" id="emails" component={EmailAddresses} {...this.props} />
          <br />
        </Col>
        <Col xs={12}>
          <FieldArray label="urls" name="urls" id="urls" component={Urls} {...this.props} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default ContactInformationForm;
