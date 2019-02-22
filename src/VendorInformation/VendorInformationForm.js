import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import { MultiSelection, Select, Checkbox, TextField, AccordionSet, Accordion, Row, Col } from '@folio/stripes/components';
import css from './VendorInformationForm.css';

class VendorInformationForm extends Component {
  static propTypes = {
    dropdownCurrencies: PropTypes.arrayOf(PropTypes.string),
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    }),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      subSections: {
        taxSection: true,
      }
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.selectedValues = this.selectedValues.bind(this);
  }

  onChangeSelect = (e, propertyName) => {
    const { dispatch, change } = this.props;
    dispatch(change(`${propertyName}`, e));
  }

  selectedValues = (propertyName) => {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const currValues = formValues[propertyName];
    return currValues;
  }

  // For Multi dropdown
  toString = (option) => option;
  formatter = ({ option }) => <div>{option}</div>;
  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
    return { renderedItems };
  };

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
              <Field
                component={MultiSelection}
                label="Vendor Currencies"
                name="vendor_currencies"
                id="vendor_currencies"
                dataOptions={dropdownCurrencies}
                style={{ height: '80px' }}
                value={this.selectedValues('vendor_currencies')}
                itemToString={this.toString}
                formatter={this.formatter}
                filter={this.filterItems}
                onChange={(e) => this.onChangeSelect(e, 'vendor_currencies')}
                onBlur={(e) => { e.preventDefault(); }}
              />
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
              <Field label="Expected Receipt Interval" name="expected_receipt_interval" id="expected_receipt_interval" type="number" component={TextField} fullWidth />
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
