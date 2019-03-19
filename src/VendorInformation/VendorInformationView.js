import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import BoolToCheckbox from '../Utils/BoolToCheckbox';
import css from './VendorInformationView.css';

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
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.paymentMethod" />} value={_.get(dataVal, ['payment_method'], '')} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.accessProvider" />} value={_.toString(_.get(dataVal, ['access_provider']))}>
              <BoolToCheckbox name="Access Provider" value={_.get(dataVal, ['access_provider'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.governmental" />} value={_.toString(_.get(dataVal, ['governmental']))}>
              <BoolToCheckbox name="Governmental" value={_.get(dataVal, ['governmental'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.licensor" />} value={_.toString(_.get(dataVal, ['licensor']))}>
              <BoolToCheckbox name="Licensor" value={_.get(dataVal, ['licensor'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.materialSupplier" />}>
              <BoolToCheckbox name="Material Supplier" value={_.get(dataVal, ['material_supplier'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.vendorCurrencies" />} value={vendorCurrencies} />
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.claimingInterval" />} value={_.toString(_.get(dataVal, ['claiming_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.discountPercent" />} value={_.toString(_.get(dataVal, ['discount_percent']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.expectedActivationInterval" />} value={_.toString(_.get(dataVal, ['expected_activation_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.expectedInvoiceInterval" />} value={_.toString(_.get(dataVal, ['expected_invoice_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.expectedReceiptInterval" />} value={_.toString(_.get(dataVal, ['expected_receipt_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.renewalActivationInterval" />} value={_.toString(_.get(dataVal, ['renewal_activation_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.subscriptionInterval" />} value={_.toString(_.get(dataVal, ['subscription_interval']))} />
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.vendorInfo.tax" />}</div>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.taxID" />} value={_.get(dataVal, ['tax_id'], '')} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.taxPercentage" />} value={_.toString(_.get(dataVal, ['tax_percentage']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-vendors.vendorInfo.liableForVAT" />} value={_.toString(_.get(dataVal, ['liable_for_vat']))} />
          </Col>
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
