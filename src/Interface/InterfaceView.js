import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from './InterfaceView.css';
import BoolToCheckbox from '../Utils/BoolToCheckbox';

class InterfaceView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.getInterface = this.getInterface.bind(this);
  }

  printLabelValue(label, val) {
    return (
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id={`ui-vendors.interface.${label}`} />} value={_.get(val, [`${val}`], '')} />
      </Col>
    );
  }

  getInterface(val, key) {
    const rowCount = (this.props.initialValues.interfaces.length - 1) !== key;
    return (
      <Row key={key}>
        {this.printLabelValue('name', 'name')}
        {this.printLabelValue('uri', 'uri')}
        {this.printLabelValue('username', 'username')}
        {this.printLabelValue('password', 'password')}
        {this.printLabelValue('notes', 'notes')}
        <Col xs={12}>
          <div className={css.subHeadings}><b>{<FormattedMessage id="ui-vendors.interface.statistics" />}</b></div>
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-vendors.interface.available" />}>
            <BoolToCheckbox name="Available" value={_.get(val, ['available'])} />
          </KeyValue>
        </Col>
        {this.printLabelValue('deliveryMethod', 'delivery_method')}
        {this.printLabelValue('statisticsFormat', 'statistics_format')}
        {this.printLabelValue('locallyStored', 'locally_stored')}
        {this.printLabelValue('onlineLocation', 'online_location')}
        {this.printLabelValue('statisticsNotes', 'statistics_notes')}
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
          <p>{<FormattedMessage id="ui-vendors.interface.noInterfaceAvail" />}</p>
        </div>
      );
    }
  }
}

export default InterfaceView;
