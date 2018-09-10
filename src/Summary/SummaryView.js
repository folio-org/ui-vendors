import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MultiColumnList, Row, Col, KeyValue } from '@folio/stripes-components';
import css from './SummaryView.css';

class SummaryView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues || [];
    const columnWidths = { 'value': '50%', 'description': '50%' };
    const columnMapping = {
      'value': 'Alias',
      'description': 'description'
    };

    return (
      <Row>
        <Col xs={4}>
          <KeyValue label="Name" value={_.get(dataVal, 'name', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Code" value={_.get(dataVal, 'code', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label="ERP Code" value={_.get(dataVal, ['erp_code'], '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Vendor Status" value={_.get(dataVal, 'vendor_status', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Default Language" value={_.get(dataVal, 'language', '')} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Description" value={_.get(dataVal, 'description', '')} />
        </Col>
        <Col xs={12} className={css.rowHeader}>
          <h4>Alternative Names</h4>
          <MultiColumnList contentData={initialValues.aliases} columnWidths={columnWidths} columnMapping={columnMapping} />
        </Col>
      </Row>
    );
  }
}

export default SummaryView;
