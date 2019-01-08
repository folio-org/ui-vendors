import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import { MultiSelection, Row, Col, Button, TextField, Select } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import EmailsMF from '../../MultiForms/EmailsMF';


class EmailAddresses extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func, 
    change: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.renderSubEmailAddresses = this.renderSubEmailAddresses.bind(this);
  }

  renderSubEmailAddresses = (elem, index, fields) => {
    const { dropdownCategories, dropdownLanguages } = this.props;
    return (
      <Row key={index} className={css.panels}>
        <EmailsMF
          index={index}
          fields={fields}
          name={`${elem}`}
          id={`${elem}`}
          isOpen={this.state.isOpen}
          {...this.props}
        />
        <Col xs={12} md={3} mdOf fset={9} style={{ textAlign: 'right' }}>
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
        <Col xs={12}>
          <div className={css.subHeadings}>Email Address</div>
        </Col>
        {fields.length === 0 &&
          <Col xs={12}>
            <div><em>- Please add email -</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSubEmailAddresses)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add Email</Button>
        </Col>
      </Row>
    );
  }
}

export default EmailAddresses;
