import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { isEqual, isEmpty, find, get } from 'lodash';
import { FieldArray, getFormValues } from 'redux-form';
import { Row, Col, List, Button, Icon, KeyValue } from '@folio/stripes/components';
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
    this.state = {
      contactArr: []
    }
    this.listComponent = this.listComponent.bind(this);
    this.listItem = this.listItem.bind(this);
    this.renderData = this.renderData.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { parentMutator, stripes: { store } } = props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const contactArr = formValues.contacts;
    const queryContacts = (arr) => {
      let newQuery = 'query=(id=null)';
      if(arr.length >= 1) {
        const items = arr.map(item => {
          return `id="${item}"`;
        });
        const biuldQuery = items.join(" or ");
        newQuery = `query=(${biuldQuery})`;
      }
      return parentMutator.queryCustom.update({ contactIDs: newQuery });
    };

    if (!isEqual(contactArr, state.contactArr)) {
      queryContacts(contactArr);
      return { contactArr };
    }
    return null;
  }

  removeItem(index) {
    this.fields.remove(index);
  }

  printKeyValue(label, val, colNum, isRequire) {
    return (
      <Col xs={colNum}>
        <KeyValue label={<FormattedMessage id={`ui-vendors.contactPeople.${label}`} />} value={val} required={isRequire} />
      </Col>
    );
  }

  renderData(valueID) {
    const { parentResources } = this.props;
    const contacts = ((parentResources || {}).contacts || {}).records || [];
    if (contacts.length === 0) return null;
    const item = find(contacts, { id: valueID });
    if (isEmpty(item)) return null;
    const fullName = `${get(item, 'prefix', '')} ${get(item, 'first_name', '')} ${get(item, 'last_name', '')}`;
    return (
      <Fragment>
        {fullName}
      </Fragment>
    );
  }

  listItem(item, index) {
    const valueID = this.fields.get(index);
    return(
      <div>
        <li key={index}>
          {this.renderData(valueID)}
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

  listComponent = ({ fields }) => {
    this.fields = fields;
    const itemFormatter = (item, index) => (this.listItem(item, index));
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
    // console.log(this.queryContacts);
    return (
      <Row>
        <Col xs={12}>
          <FieldArray label="Contacts" name="contacts" id="contacts" component={this.listComponent} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default ContactPeopleForm;
