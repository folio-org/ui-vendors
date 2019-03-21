import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import { UrlsMF } from '../../MultiForms';

class Url extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.removeButton = this.removeButton.bind(this);
  }

  removeButton(fields, index, id, label) {
    return (
      <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
        <Button id={id} onClick={() => fields.remove(index)} buttonStyle="danger">
          {<FormattedMessage id={label} />}
        </Button>
      </Col>
    );
  }

  renderSubUrl = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <UrlsMF index={index} fields={fields} name={`${elem}`} id={`${elem}`} {...this.props} />
        {this.removeButton(fields, index, 'btn-remove-url', 'ui-vendors.contactInfo.remove')}
      </Row>
    );
  }

  render() {
    const { fields } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactInfo.urls" />}</div>
          {fields.length === 0 &&
            <div><em>{<FormattedMessage id="ui-vendors.contactInfo.pleaseAddURL" />}</em></div>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubUrl)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>{<FormattedMessage id="ui-vendors.contactInfo.addURL" />}</Button>
        </Col>
      </Row>
    );
  }
}

export default Url;
