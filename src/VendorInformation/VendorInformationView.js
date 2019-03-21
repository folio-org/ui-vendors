import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, toString } from 'lodash';
import { Row, Col } from '@folio/stripes/components';
import css from './VendorInformationView.css';
import { PrintKeyValue, PrintBoolToCheckbox } from '../Utils/PrintKeyValue';

class VendorInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues !== null ? initialValues : false;
    const vendorCurrencies = dataVal.vendor_currencies.join(', ') || null;

    if (dataVal) {
      return (
        <Row className={css.horizontalLine}>
          {PrintBoolToCheckbox('ui-vendors.vendorInfo.paymentMethod', get(dataVal, 'payment_method'), 3, false)}
          {PrintBoolToCheckbox('ui-vendors.vendorInfo.accessProvider', get(dataVal, 'access_provider'), 3, false)}
          {PrintBoolToCheckbox('ui-vendors.vendorInfo.governmental', toString(get(dataVal, ['governmental'])), 3, false)}
          {PrintBoolToCheckbox('ui-vendors.vendorInfo.licensor', toString(get(dataVal, ['licensor'])), 3, false)}
          {PrintBoolToCheckbox('ui-vendors.vendorInfo.materialSupplier', get(dataVal, ['material_supplier']), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.vendorCurrencies', vendorCurrencies, 3, false)}
          <Col xs={12}>
            <hr />
          </Col>
          {PrintKeyValue('ui-vendors.vendorInfo.claimingInterval', toString(get(dataVal, ['claiming_interval'])), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.discountPercent', toString(get(dataVal, ['discount_percent'])), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.expectedActivationInterval', toString(get(dataVal, ['expected_activation_interval'])), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.expectedInvoiceInterval', toString(get(dataVal, ['expectedInvoiceInterval'])), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.expectedReceiptInterval', toString(get(dataVal, ['expected_receipt_interval'])), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.renewalActivationInterval', toString(get(dataVal, ['renewal_activation_interval'])), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.subscriptionInterval', toString(get(dataVal, ['subscription_interval'])), 3, false)}
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.vendorInfo.tax" />}</div>
          </Col>
          {PrintKeyValue('ui-vendors.vendorInfo.taxID', toString(get(dataVal, ['tax_id'])), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.taxPercentage', toString(get(dataVal, ['tax_percentage'])), 3, false)}
          {PrintKeyValue('ui-vendors.vendorInfo.liableForVAT', toString(get(dataVal, ['liable_for_vat'])), 3, false)}
        </Row>
      );
    } else {
      return (
        <div>
          <p>{<FormattedMessage id="ui-vendors.vendorInfo.noInformationAvailable" />}</p>
        </div>
      );
    }
  }
}

export default VendorInformationView;
