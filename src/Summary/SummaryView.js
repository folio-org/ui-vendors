import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { MultiColumnList, Row, Col, KeyValue } from '@folio/stripes/components';
import css from './SummaryView.css';
import LanguageLookup from '../Utils/LanguageLookup';

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
    const getLanguage = LanguageLookup(_.get(dataVal, 'language', ''));

    return (
      <Row>
        <Col xs={4}>
          <KeyValue label="Name" value={_.get(dataVal, 'name', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Code" value={_.get(dataVal, 'code', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Accounting Code" value={_.get(dataVal, ['erp_code'], '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Vendor Status" value={_.get(dataVal, 'vendor_status', '')} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Default Language" value={getLanguage} />
        </Col>
        <Col xs={4}>
          <KeyValue label="San Code" value={_.get(dataVal, 'san_code', '')} />
        </Col>
        <Col xs={12}>
          <KeyValue label="Description" value={_.get(dataVal, 'description', '')} />
        </Col>
        <Col xs={12} className={css.rowHeader}>
          <div className={css.subHeadings}>Alternative Names</div>
          <MultiColumnList contentData={initialValues.aliases} columnWidths={columnWidths} columnMapping={columnMapping} />
          <br />
        </Col>
      </Row>
    );
  }
}

export default SummaryView;
