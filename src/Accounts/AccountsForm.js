import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Row, Col, Button, TextField, TextArea, Select } from '@folio/stripes/components';
import { Required } from '../Utils/Validate';
import css from './AccountsForm.css';

class AccountsForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        paymentMethodDD: PropTypes.array.isRequired,
        statusDD: PropTypes.array.isRequired
      })
    })
  }

  constructor(props) {
    super(props);
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <div><em>- Please add account -</em></div>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add</Button>
        </Col>
      </Row>
    );
  }

  renderSubForm = (elem, index, fields) => {
    const { parentResources } = this.props;
    const paymentMethodDD = (parentResources.dropdown || {}).paymentMethodDD || [];
    const statusDD = (parentResources.dropdown || {}).statusDD || [];
    return (
      <div key={index} className={css.panels}>
        <Row key={index}>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <Field label="name*" name={`${elem}.name`} id={`${elem}.name`} validate={[Required]} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field label="Vendor Account Number*" name={`${elem}.account_no`} id={`${elem}.account_no`} validate={[Required]} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field label="Description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field label="Acct. Payable Sys. No" name={`${elem}.app_system_no`} id={`${elem}.app_system_no`} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field label="Payment Method*" name={`${elem}.payment_method`} id={`${elem}.payment_method`} dataOptions={paymentMethodDD} validate={[Required]} component={Select} fullWidth />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <Field label="Account Status*" name={`${elem}.account_status`} id={`${elem}.account_status`} dataOptions={statusDD} validate={[Required]} component={Select} fullWidth />
              </Col>
              <Col xs={12}>
                <Field label="Contact Info" name={`${elem}.contact_info`} id={`${elem}.contact_info`} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field label="Library Code*" name={`${elem}.library_code`} id={`${elem}.library_code`} validate={[Required]} component={TextField} fullWidth />
              </Col>
              <Col xs={12}>
                <Field label="Library EDI Code*" name={`${elem}.library_edi_code`} id={`${elem}.library_edi_code`} validate={[Required]} component={TextField} fullWidth />
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Field label="notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
          </Col>
          <Col xs={12} style={{ textAlign: 'right' }}>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger">
              Remove
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Accounts" name="accounts" id="accounts" component={this.renderForm} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default AccountsForm;
