import React from 'react';
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
    if (dataVal) {
      return (
        <Row className={css.horizontalLine}>
          <Col xs={3}>
            <KeyValue label="Payment Method" value={_.get(dataVal, ['payment_method'], '')} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Access Provider" value={_.toString(_.get(dataVal, ['access_provider']))}>
              <BoolToCheckbox name="Access Provider" value={_.get(dataVal, ['access_provider'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label="Governmental" value={_.toString(_.get(dataVal, ['governmental']))}>
              <BoolToCheckbox name="Governmental" value={_.get(dataVal, ['governmental'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label="Licensor" value={_.toString(_.get(dataVal, ['licensor']))}>
              <BoolToCheckbox name="Licensor" value={_.get(dataVal, ['licensor'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label="Material Supplier">
              <BoolToCheckbox name="Material Supplier" value={_.get(dataVal, ['material_supplier'])} />
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label="Vendor Currencies" value={_.toString(_.map(dataVal.vendor_currencies))} />
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={3}>
            <KeyValue label="Claiming Interval" value={_.toString(_.get(dataVal, ['claiming_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Discount Percent" value={_.toString(_.get(dataVal, ['discount_percent']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Expected Activation Interval" value={_.toString(_.get(dataVal, ['expected_activation_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Expected Invoice Interval" value={_.toString(_.get(dataVal, ['expected_invoice_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Renewal Activation Interval" value={_.toString(_.get(dataVal, ['renewal_activation_interval']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Subscription Interval" value={_.toString(_.get(dataVal, ['subscription_interval']))} />
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={12}>
            <div className={css.subHeadings}>Tax</div>
          </Col>
          <Col xs={3}>
            <KeyValue label="Tax ID" value={_.get(dataVal, ['tax_id'], '')} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Tax Percentage" value={_.toString(_.get(dataVal, ['tax_percentage']))} />
          </Col>
          <Col xs={3}>
            <KeyValue label="Liable for VAT" value={_.toString(_.get(dataVal, ['liable_for_vat']))} />
          </Col>
        </Row>
      );
    } else {
      return (
        <div>
          <p>-- No agreements available --</p>
        </div>
      );
    }
  }
}

export default VendorInformationView;
