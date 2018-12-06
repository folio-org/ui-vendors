import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { MultiSelection, Row, Col, Button, TextField, Select } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';

class PhoneNumbers extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.string),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
    contactPeopleForm: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.renderSubPhoneNumbers = this.renderSubPhoneNumbers.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
  }

  onChangeSelect = (e, elem, propertyName) => {
    const { dispatch, change } = this.props;
    dispatch(change(`${elem}.${propertyName}`, e));
  }

  // For Multi dropdown
  toString = (option) => option;
  formatter = ({ option }) => <div>{option}</div>;
  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
    return { renderedItems };
  };

  renderSubPhoneNumbers = (elem, index, fields) => {
    const { dropdownCategories, dropdownLanguages, dropdownPhoneType, contactPeopleForm } = this.props;

    return (
      <Row key={index} className={!contactPeopleForm ? css.panels : css.panelsChild}>
        <Col xs={12} md={3}>
          <Field label="Phone Number*" name={`${elem}.phone_number.phone_number`} id={`${elem}.phone_number.phone_number`} component={TextField} placeholder="ex." fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Type" name={`${elem}.phone_number.type`} id={`${elem}.phone_number.type`} component={Select} fullWidth dataOptions={dropdownPhoneType} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${elem}.language`} id={`${elem}.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
        </Col>
        <Col xs={12} md={3}>
          <Field
            component={MultiSelection}
            filter={this.filterItems}
            label="Categories"
            name={`${elem}.categories`}
            dataOptions={dropdownCategories}
            onChange={(e) => this.onChangeSelect(e, elem, 'categories')}
            style={{ height: '80px' }}
            itemToString={this.toString}
            formatter={this.formatter}
          />
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
    const { fields, contactPeopleForm } = this.props;
    return (
      <Row>
        { !contactPeopleForm &&
          <Col xs={12}>
            <div className={css.subHeadings}>Phone Number</div>
          </Col>
        }
        {fields.length === 0 &&
          <Col xs={6}>
            <div><em>- Please add phone number -</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSubPhoneNumbers)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add Phone Number</Button>
        </Col>
      </Row>
    );
  }
}

export default PhoneNumbers;
