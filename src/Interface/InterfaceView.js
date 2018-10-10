import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from './InterfaceView.css';
import BoolToCheckbox from '../Utils/BoolToCheckbox';

class AgreementsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.getInterface = this.getInterface.bind(this);
  }

  getInterface(val, key) {
    const rowCount = (this.props.initialValues.interfaces.length - 1) !== key;
    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Name" value={_.get(val, ['name'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="URI" value={_.get(val, ['uri'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Username" value={_.get(val, ['username'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Password" value={_.get(val, ['password'], '')} />
        </Col>
        <Col xs={9}>
          <KeyValue label="Notes" value={_.get(val, ['notes'], '')} />
        </Col>
        <Col xs={12}>
          <div className={css.subHeadings}>Statistics</div>
        </Col>
        <Col xs={3}>
          {/* label="Available"  */}
          <KeyValue label="Available">
            <BoolToCheckbox name="Available" value={_.get(val, ['available'])} />
          </KeyValue>
        </Col>
        <Col xs={3}>
          <KeyValue label="Delivery Method" value={_.get(val, ['delivery_method'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Statistics Format" value={_.get(val, ['statistics_format'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Locally Stored" value={_.get(val, ['locally_stored'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Online Location" value={_.get(val, ['online_location'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Statistics Notes" value={_.get(val, ['online_location'], '')} />
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
    const dataVal = initialValues.interfaces.length >= 1 ? initialValues.interfaces : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }} className={css.horizontalLine}>
          {dataVal.map(this.getInterface)}
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No interface data available --</p>
        </div>
      );
    }
  }
}

export default AgreementsView;
