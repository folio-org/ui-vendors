import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Icon } from '@folio/stripes/components';
import { AddressInfoView, PhoneNumbersView, EmailView, UrlsView } from './ContactInfoViewGroup';

class ContactInformationView extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.object.isRequired,
      dropdownCategories: PropTypes.arrayOf(PropTypes.object)
    })
  };

  render() {
    const { initialValues, parentResources } = this.props;
    const dropdownCategories = (parentResources.dropdown || {}).categoriesDD || [];

    if (!initialValues) {
      return (
        <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
      );
    }

    return (
      <div style={{ width: '100%' }}>
        <Row>
          <div style={{ width: '100%' }}>
            <AddressInfoView dataVal={initialValues.addresses} dropdownCategories={dropdownCategories} />
            <PhoneNumbersView dataVal={initialValues.phone_numbers} dropdownCategories={dropdownCategories} />
            <EmailView dataVal={initialValues.emails} dropdownCategories={dropdownCategories} />
            <UrlsView dataVal={initialValues.urls} dropdownCategories={dropdownCategories} />
          </div>
        </Row>
      </div>
    );
  }
}

export default ContactInformationView;
