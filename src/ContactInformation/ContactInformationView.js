import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Icon } from '@folio/stripes/components';
import { AddressInfoView, PhoneNumbersView, EmailView, UrlsView } from './ContactInfoViewGroup';

class ContactInformationView extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object.isRequired
    })
  };

  render() {
    const { initialValues } = this.props;
    if (!initialValues) {
      return (
        <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
      );
    }

    return (
      <div style={{ width: '100%' }}>
        <Row>
          <div style={{ width: '100%' }}>
            <AddressInfoView dataVal={initialValues.addresses} />
            <PhoneNumbersView dataVal={initialValues.phone_numbers} />
            <EmailView dataVal={initialValues.emails} />
            <UrlsView dataVal={initialValues.urls} />
          </div>
        </Row>
      </div>
    );
  }
}

export default ContactInformationView;
