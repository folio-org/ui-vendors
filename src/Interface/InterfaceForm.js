
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import { Row, Col, Button, TextField, TextArea, Select, Checkbox } from '@folio/stripes/components';
import { isURLValid } from '../Utils/Validate';
import TogglePassword from '../Utils/TogglePassword';
import css from './InterfaceForm.css';

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
    this.renderForm = this.renderForm.bind(this);
    this.renderSubForm = this.renderSubForm.bind(this);
  }

  renderForm = ({ fields }) => {
    return (
      <Row>
        <Col xs={12}>
          {fields.length === 0 &&
            <Col xs={6}>
              <div><em>{<FormattedMessage id="ui-vendors.interface.pleaseAddInterface" />}</em></div>
            </Col>
          }
          {fields.map(this.renderSubForm)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-vendors.interface.add" />}</Button>
        </Col>
      </Row>
    );
  }

  renderSubForm = (elem, index, fields) => {
    const { parentResources } = this.props;
    const formatDD = (parentResources.dropdown || {}).formatDD || [];
    const deliveryMethodDD = (parentResources.dropdown || {}).deliveryMethodDD || [];

    return (
      <div key={index} className={css.panels}>
        <Row>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.name" />} name={`${elem}.name`} id={`${elem}.name`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.uri" />} name={`${elem}.uri`} id={`${elem}.uri`} type="url" validate={[isURLValid]} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.username" />} name={`${elem}.username`} id={`${elem}.username`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <TogglePassword name={`${elem}.password`} id={`${elem}.password`} buttonID={`${elem}.button`} />
          </Col>
          <Col xs={12}>
            <Field label={<FormattedMessage id="ui-vendors.interface.notes" />} name={`${elem}.notes`} id={`${elem}.notes`} component={TextArea} fullWidth />
          </Col>
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.interface.statistics" />}</div>
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.available" />} name={`${elem}.available`} id={`${elem}.available`} component={Checkbox} />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.deliveryMethod" />} name={`${elem}.delivery_method`} id={`${elem}.delivery_method`} component={Select} fullWidth dataOptions={deliveryMethodDD} />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.statisticsFormat" />} name={`${elem}.statistics_format`} id={`${elem}.statistics_format`} component={Select} fullWidth dataOptions={formatDD} />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.locallyStored" />} name={`${elem}.locally_stored`} id={`${elem}.locally_stored`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.onlineLocation" />} name={`${elem}.online_location`} id={`${elem}.online_location`} component={TextField} fullWidth />
          </Col>
          <Col xs={12} md={6}>
            <Field label={<FormattedMessage id="ui-vendors.interface.statisticsNotes" />} name={`${elem}.statistics_notes`} id={`${elem}.statistics_notes`} component={TextArea} fullWidth />
          </Col>
          <Col xs={12} style={{ textAlign: 'right' }}>
            <Button onClick={() => fields.remove(index)} buttonStyle="danger">
              {<FormattedMessage id="ui-vendors.interface.remove" />}
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
          <FieldArray label="Interface" name="interfaces" id="interfaces" component={this.renderForm} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default InterfaceForm;
