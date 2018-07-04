import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import { Required } from '../Utils/Validate';

class SummaryForm extends React.Component {
  static propTypes = {
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderSubFields = this.renderSubFields.bind(this);
  }

  renderList = ({ fields }) => {
    return (
      <Row>
        <Col xs={6}>
          <h6>Alternative Names</h6>
        </Col>
        <Col xs={12}>
          {fields.length === 0 &&
            <div><em>- Please add vendors -</em></div>
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
      <Row key={index}>
        <Col xs={5}>
          <Field label="AKA" name={`${elem}.value`} id={`${elem}.value`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={5}>
          <Field label="description" name={`${elem}.description`} id={`${elem}.description`} component={TextField} fullWidth />
        </Col>
        <Col xs={1}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger" style={{ marginTop: '23px' }}>Remove</Button>
        </Col>
      </Row>
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
          <Field label="Name" name="name" id="name" validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={6}>
          <Field label="Code" name="code" id="code" component={TextField} fullWidth />
          <Field label="Accounting Code" name="erp_code" id="erp_code" component={TextField} fullWidth />
          <Field label="Status" name="vendor_status" id="vendor_status" component={Select} fullWidth dataOptions={statusOptions} />
          <Field label="Default Language" name="language" id="language" component={Select} fullWidth dataOptions={this.props.dropdownLanguages} />
        </Col>
        <Col xs={12} md={6}>
          <Field label="Vendor Description" name="description" id="description" component={TextArea} style={{ width: '100%', height: '139px' }} />
        </Col>
        <Col xs={12}>
          <FieldArray label="Vendor Names" name="aliases" id="aliases" component={this.renderList} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default SummaryForm;

