import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Select from '@folio/stripes-components/lib/Select';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import TogglePassword from '../Utils/TogglePassword';

class InterfaceForm extends Component {
  static propTypes = {
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <Col xs={6}>
              <div><em>- Please add interface -</em></div>
            </Col>
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
    const rowCount = (fields.length - 1) !== index;
    const formatDD = (parentResources.dropdown || {}).formatDD || [];
    const deliveryMethodDD = (parentResources.dropdown || {}).deliveryMethodDD || [];

    return (
      <Row key={index}>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="Name" name={`${elem}.name`} id={`${elem}.name`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <Field label="URL" name={`${elem}.uri`} id={`${elem}.uri`} type="url" component={TextArea} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={6}>
          <Row>
            <Col xs={12}>
              <Field label="Username" name={`${elem}.username`} id={`${elem}.username`} component={TextField} fullWidth />
            </Col>
            <Col xs={12}>
              <TogglePassword name={`${elem}.password`} id={`${elem}.password`} buttonID={`${elem}.button`} />
            </Col>
            <Col xs={12}>
              <Field label="Notes" name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Col xs={12}>
            <Accordion label="Statistics" open={this.state.open}>
              <Row>
                <Col xs={12}>
                  <Row>
                    <Col xs={12}>
                      <Field label="Available" name={`${elem}.available`} id={`${elem}.available`} component={Checkbox} />
                    </Col>
                    <Col xs={12}>
                      <Field label="Delivery Method" name={`${elem}.delivery_method`} id={`${elem}.delivery_method`} component={Select} fullWidth dataOptions={deliveryMethodDD} />
                    </Col>
                    <Col xs={12}>
                      <Field label="Stattictics Format" name={`${elem}.statistics_format`} id={`${elem}.statistics_format`} component={Select} fullWidth dataOptions={formatDD} />
                    </Col>
                    <Col xs={12}>
                      <Field label="Locally Stored" name={`${elem}.locally_stored`} id={`${elem}.locally_stored`} component={TextField} fullWidth />
                    </Col>
                    <Col xs={12}>
                      <Field label="Online Location" name={`${elem}.online_location`} id={`${elem}.online_location`} component={TextField} fullWidth />
                    </Col>
                    <Col xs={12}>
                      <Field label="Statistics Notes" name={`${elem}.statistics_notes`} id={`${elem}.statistics_notes`} component={TextArea} fullWidth />
                    </Col>
                    <Col xs={12} style={{ textAlign: 'right' }}>
                      <Button onClick={() => fields.remove(index)} buttonStyle="danger">
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Accordion>
          </Col>
        </Col>
        {
          rowCount &&
          <div style={{ width: '100%' }}>
            <br />
            <hr />
            <br />
          </div>
        }
      </Row>
    );
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Interface" name="interfaces" id="interfaces" component={this.renderForm} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default InterfaceForm;
