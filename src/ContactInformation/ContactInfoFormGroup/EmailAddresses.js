import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
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
    this.renderSubEmailAddresses = this.renderSubEmailAddresses.bind(this);
  }

  renderSubEmailAddresses = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <EmailsMF
          index={index}
          fields={fields}
          name={`${elem}`}
          id={`${elem}`}
          {...this.props}
        />
        <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            {<FormattedMessage id="ui-vendors.contactInfo.remove" />}
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
          <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactInfo.emailAddress" />}</div>
        </Col>
        {fields.length === 0 &&
          <Col xs={12}>
            <div><em>{<FormattedMessage id="ui-vendors.contactInfo.pleaseAddEmail" />}</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSubEmailAddresses)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-vendors.contactInfo.addEmail" />}</Button>
        </Col>
      </Row>
    );
  }
}

export default EmailAddresses;
