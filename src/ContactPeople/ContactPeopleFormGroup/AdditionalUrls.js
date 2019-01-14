import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactPeopleForm.css';
import { UrlsMF } from '../../MultiForms';

class AdditionalUrls extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  renderSub = (elem, index) => {
    const { fields } = this.props;
    return (
      <Row key={index}>
        <UrlsMF
          index={index}
          fields={fields}
          name={`${elem}`}
          id={`${elem}`}
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
            <div className={css.subHeadings}>URL</div>
          </Col>
        }
        {fields.length === 0 &&
          <Col xs={6}>
            <div><em>- Please add url -</em></div>
          </Col>
        }
        <Col xs={12}>
          {fields.map(this.renderSub)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add URL</Button>
        </Col>
      </Row>
    );
  }
}

export default AdditionalUrls;
