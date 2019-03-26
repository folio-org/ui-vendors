import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray, getFormValues } from 'redux-form';
import { Row, Col, List, Button, Icon, TextField } from '@folio/stripes/components';
import css from './ContactPeopleForm.css';

class ContactPeopleForm extends Component {
  static propTypes = {
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownCountry: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
    phoneCollection: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    // this.renderSubCreateContact = this.renderSubCreateContact.bind(this);
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

  onPhoneStateUpdate(obj) {
    if (!obj) return false;
    return this.setState(obj);
  }

  removeItem(index) {
    this.fields.remove(index);
  }

  renderItem(item, index) {
    const valueID = this.fields.get(index);
    return(
      <div>
        <li key={index}>
          {valueID}
          <Button
            buttonStyle="fieldControl"
            align="end"
            type="button"
            id={`clickable-remove-button-${index}`}
            onClick={() => this.removeItem(index)}
          >
            <Icon icon="times-circle" />
          </Button>
        </li>
        
      </div>
    );
  }

  renderList = ({ fields }) => {
    this.fields = fields;
    const items = ['Apples', 'Bananas', 'Strawberries', 'Oranges'];
    const itemFormatter = (item, index) => (this.renderItem(item, index));
    const isEmptyMessage = 'No items to show';
    return (
      <List
        items={fields}
        itemFormatter={itemFormatter}
        isEmptyMessage={isEmptyMessage}
      />
    );
  }


  render() {
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Contacts" name="contacts" id="contacts" component={this.renderList} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default ContactPeopleForm;
