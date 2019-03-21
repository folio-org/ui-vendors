import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactPeopleForm.css';
import PhoneNumbersMF from '../../MultiForms/PhoneNumbersMF';

class AdditionalPhoneNumbers extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  removeButtonPh(fields, index, id, label) {
    return (
      <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
        <Button id={id} onClick={() => fields.remove(index)} buttonStyle="danger">
          {<FormattedMessage id={label} />}
        </Button>
      </Col>
    );
  }

  renderSubPhoneNumbers = (elem, index) => {
    const { fields } = this.props;
    return (
      <Row key={index}>
        <PhoneNumbersMF index={index} fields={fields} name={`${elem}`} id={`${elem}`} {...this.props} />
        {this.removeButtonEml(fields, index, 'btn-remove-phoneNumber', 'ui-vendors.contactPeople.remove')}
      </Row>
    );
  }

  render() {
    const { fields, contactPeopleForm } = this.props;
    return (
      <Row>
        { !contactPeopleForm &&
          <Col xs={12}>
            <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactPeople.phoneNumber" />}</div>
          </Col>
        }
        {fields.length === 0 &&
          <Col xs={6}>
            <div><em>{<FormattedMessage id="ui-vendors.contactPeople.pleaseAddPhoneNumbers" />}</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSubPhoneNumbers)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-vendors.contactPeople.addPhoneNumber" />}</Button>
        </Col>
      </Row>
    );
  }
}

export default AdditionalPhoneNumbers;
