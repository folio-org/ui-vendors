import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from './AgreementsView.css';

class AgreementsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.getAgreements = this.getAgreements.bind(this);
  }

  getAgreements(val, key) {
    const rowCount = this.props.initialValues.contacts.length - 1 !== key;
    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Name" value={_.get(val, 'name')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Discount" value={_.get(val, 'discount')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Reference URL" value={_.get(val, 'reference_url')} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Notes" value={_.get(val, 'notes')} />
        </Col>
        {rowCount &&
          <div style={{ width: '100%' }}>
            <hr />
          </div>
        }
      </Row>
    );
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.agreements.length >= 1 ? initialValues.agreements : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }} className={css.horizontalLine}>
          {dataVal.map(this.getAgreements)}
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No agreements available --</p>
        </div>
      );
    }
  }
}

export default AgreementsView;
