import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, Checkbox, TextField, AccordionSet, Accordion, Row, Col } from '@folio/stripes/components';
import css from './VendorInformationForm.css';

class VendorInformationForm extends Component {
  static propTypes = {
    dropdownCurrencies: PropTypes.arrayOf(PropTypes.object),
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      subSections: {
        taxSection: true,
      }
    };
  }

  render() {
    const { parentResources, dropdownCurrencies } = this.props;
    const paymentMethodDD = (parentResources.dropdown || {}).paymentMethodDD || [];

    return (
      <Row className={css.vendorInfo}>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="Payment Method" name="payment_method" id="payment_method" component={Select} dataOptions={paymentMethodDD} fullWidth />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label="Access Provider" name="access_provider" id="access_provider" component={Checkbox} />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label="Governmental" name="governmental" id="governmental" component={Checkbox} />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label="Licensor" name="licensor" id="licensor" component={Checkbox} />
            </Col>
            <Col xs={12} className={css.vendorInfoCheckbox}>
              <Field label="Material Supplier" name="material_supplier" id="material_supplier" component={Checkbox} />
            </Col>
            <Col xs={12}>
              <Field label="Vendor Currencies" name="vendor_currencies" id="vendor_currencies" component={Select} dataOptions={dropdownCurrencies} style={{ height: '80px' }} fullWidth multiple />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="Claiming Interval" name="claiming_interval" id="claiming_interval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Discount Percent" name="discount_percent" id="discount_percent" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Expected Activation Interval" name="expected_activation_interval" id="expected_activation_interval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Expected Invoice Interval" name="expected_invoice_interval" id="expected_invoice_interval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Renewal Activation Interval" name="renewal_activation_interval" id="renewal_activation_interval" type="number" component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="Subscription Interval" name="subscription_interval" id="subscription_interval" type="number" component={TextField} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Col xs={12}>
            <br />
            <AccordionSet accordionStatus={this.state.subSections} onToggle={this.onToggleSection}>
              <Accordion label="Tax" id="taxSection">
                <Row>
                  <Col xs={12} md={4}>
                    <Field label="Tax ID" name="tax_id" id="tax_id" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12} md={4}>
                    <Field label="Tax Percentage" name="tax_percentage" id="tax_percentage" type="number" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12} md={4} style={{ paddingTop: '20px' }}>
                    <Field label="Liable for VAT" name="liable_for_vat" id="liable_for_vat" component={Checkbox} inline={false} />
                  </Col>
                </Row>
              </Accordion>
            </AccordionSet>
          </Col>
        </Col>
      </Row>
    );
  }
}

export default VendorInformationForm;
