import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import { MultiSelection, Row, Col, Button, TextField, Select } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import { Required } from '../../Utils/Validate';

class Url extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.object),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.func
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.renderSubUrl = this.renderSubUrl.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.selectedValues = this.selectedValues.bind(this);
  }

  onChangeSelect = (e, elem, propertyName) => {
    const { dispatch, change } = this.props;
    dispatch(change(`${elem}.${propertyName}`, e));
  }

  selectedValues = (index, fields, propertyName) => {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const currValues = formValues[fields.name][index][propertyName];
    return currValues;
  }

  renderSubUrl = (elem, index, fields) => {
    const { dropdownCategories, dropdownLanguages } = this.props;
    return (
      <Row key={index} className={css.panels}>
        <Col xs={12} md={3}>
          <Field label="URL*" name={`${elem}.url.value`} id={`${elem}.url.value`} validate={[Required]} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Description" name={`${elem}.url.description`} id={`${elem}.url.description`} component={TextField} fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <MultiSelection label="Categories" name={`${elem}.categories`} dataOptions={dropdownCategories} onChange={(e) => this.onChangeSelect(e, elem, 'categories')} style={{ height: '80px' }} value={this.selectedValues(index, fields, 'categories')} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.language`} id={`${elem}.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
        </Col>
        <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={6}>
          {fields.length === 0 &&
            <div><em>- Please add URL -</em></div>
          }
          {fields.length !== 0 &&
            <div className={css.subHeadings}>URL(s)</div>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubUrl)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add URL</Button>
        </Col>
      </Row>
    );
  }
}

export default Url;
