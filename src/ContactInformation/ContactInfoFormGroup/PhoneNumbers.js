import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { MultiSelection, Row, Col, Button, TextField, Select } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import { Required } from '../../Utils/Validate';
import PhoneNumbersCP from '../../Utils/PhoneNumbersCP';

class PhoneNumbers extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  renderSubPhoneNumbers = (elem, index, fields) => {
    const { contactPeopleForm } = this.props;

    return (
      <Row key={index} className={!contactPeopleForm ? css.panels : css.panelsChild}>
        <PhoneNumbersCP
          name={`${elem}`}
          id={`${elem}`}
          isOpen={this.state.isOpen}
          // phoneFilteredCollection={this.state.phoneFilteredCollection}
          // onPhoneInputChange={this.onPhoneInputChange}
          // onPhoneInputClear={this.onPhoneInputClear}
          // onPhoneClickItem={this.onPhoneClickItem}
          // phoneRenderItem={this.phoneRenderItem}
          {...this.props}
        />
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
