import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { MultiSelection, Row, Col, TextField, Select } from '@folio/stripes/components';

class PhoneNumbersCP extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.string),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
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

  render() {
    const { name, dropdownCategories, dropdownLanguages, dropdownPhoneType } = this.props;

    return (
      <Row>
        <Col xs={12} md={3}>
          <Field label="Phone Number*" name={`${name}.phone_number.phone_number`} id={`${name}.phone_number.phone_number`} component={TextField} placeholder="ex." fullWidth />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Type" name={`${name}.phone_number.type`} id={`${name}.phone_number.type`} component={Select} fullWidth dataOptions={dropdownPhoneType} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${name}.language`} id={`${name}.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
        </Col>
        <Col xs={12} md={3}>
          <Field
            component={MultiSelection}
            filter={this.filterItems}
            label="Categories"
            name={`${name}.categories`}
            dataOptions={dropdownCategories}
            onChange={(e) => this.onChangeSelect(e, name, 'categories')}
            style={{ height: '80px' }}
            itemToString={this.toString}
            formatter={this.formatter}
          />
        </Col>
      </Row>
    );
  }
}

export default PhoneNumbersCP;
