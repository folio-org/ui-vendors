import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
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
    this.state = {
      contactArr: []
    }
    this.renderList = this.renderList.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { parentMutator, stripes: { store } } = props; 
    const formValues = getFormValues('FormVendor')(store.getState());
    const contactArr = formValues.contacts;
    const queryContacts = (arr) => {
      let newQuery = 'query=(id=null)';
      debugger;
      if(arr.length >= 1) {
        const items = arr.map(item => {
          return `id="${item}"`;
        });
        const biuldQuery = items.join(" or ");
        newQuery = `query=(${biuldQuery})`;
      }
      parentMutator.queryCustom.update({ contactIDs: newQuery });
    }

    if (!isEqual(contactArr, state.contactArr)) {
      debugger;
      queryContacts(contactArr);
      return { contactArr };
    }
    return null;
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
    // console.log(this.queryContacts);
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
