import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Row, Col, Button, TextField, TextArea, Select } from '@folio/stripes/components';
import { Pluggable } from '@folio/stripes/core';
import { Required } from '../Utils/Validate';
import css from './SummaryForm.css';

class SummaryForm extends React.Component {
  static propTypes = {
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderSubFields = this.renderSubFields.bind(this);
  }

  userVendor() {
    const columnMapping = {
      name: "vendor_name",
      vendor_status: "vendor_status",
    };
    const { stripes } = this.props;

    return (
      <Pluggable
        aria-haspopup="true"
        type="find-vendor"
        dataKey="vendor"
        searchLabel="+"
        searchButtonStyle="default"
        selectVendor={vendor => this.onAddVendor(vendor)}
        visibleColumns={['name', 'vendor_status']}
        columnMapping={columnMapping}
        disableRecordCreation
        stripes={stripes}
      >
        <span>[no vendor-selection plugin]</span>
      </Pluggable>
    );
  }

  renderList = ({ fields }) => {
    return (
      <Row>
        <Col xs={6}>
          <div className={css.subHeadings}>Alternative Names</div>
        </Col>
        <Col xs={12}>
          {fields.length === 0 &&
            <div><em>- Please add alternative names -</em></div>
          }
          {fields.map(this.renderSubFields)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add</Button>
        </Col>
      </Row>
    );
  }

  renderSubFields = (elem, index, fields) => {
    return (
      <div key={index} className={css.panels}>
        <Row>
          <Col xs={5}>
            <Field label="Alias*" name={`${elem}.value`} id={`${elem}.value`} validate={[Required]} component={TextField} fullWidth />
          </Col>
          <Col xs={5}>
            <Field label="description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
          </Col>
          <Col xs={1}>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger" style={{ marginTop: '23px' }}>Remove</Button>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const statusOptions = [
      { label: 'Select Status', value: '' },
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ];

    return (
      <Row>
        <Col xs={12}>
          <div style={{ marginLeft: '10px', top: '0', position: 'relative' }}>
            {this.userVendor()}
          </div>
        </Col>
        <Col xs={12}>
          <Field label="Name*" name="name" id="name" validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={6}>
          <Field label="Code*" name="code" id="code" validate={[Required]} component={TextField} fullWidth />
          <Field label="Accounting Code" name="erp_code" id="erp_code" component={TextField} fullWidth />
          <Field label="Status*" name="vendor_status" id="vendor_status" validate={[Required]} component={Select} fullWidth dataOptions={statusOptions} />
          <Field label="Default Language" name="language" id="language" component={Select} fullWidth dataOptions={this.props.dropdownLanguages} />
          <Field label="San Code" name="san_code" id="san_code" component={TextField} fullWidth disabled />
        </Col>
        <Col xs={12} md={6}>
          <Field label="Vendor Description" name="description" id="description" component={TextArea} style={{ width: '100%', height: '139px' }} />
        </Col>
        <Col xs={12}>
          <FieldArray label="Vendor Names" name="aliases" id="aliases" component={this.renderList} />
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;
