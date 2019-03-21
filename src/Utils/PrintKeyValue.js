import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Col, KeyValue } from '@folio/stripes/components';

const PrintKeyValue = (label, val, colNum, isRequire) => {
  return (
    <Col xs={colNum}>
      <KeyValue label={<FormattedMessage id={label} />} value={val} required={isRequire} />
    </Col>
  );
};

export default PrintKeyValue;
