import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import { FormattedMessage } from 'react-intl';
import css from './AccountsView.css';

class AccountsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.getAccounts = this.getAccounts.bind(this);
  }

  printKeyValue(label, val, isRequire) {
    return (
      <Col xs={3}>
        <KeyValue label={<FormattedMessage id={`ui-vendors.accounts.${label}`} />} value={val} required={isRequire} />
      </Col>
    );
  }

  getAccounts(val, key) {
    const rowCount = (this.props.initialValues.accounts.length - 1) !== key;
    return (
      <Row key={key}>
        {this.printKeyValue('name', get(val, ['name'], ''), false)}
        {this.printKeyValue('accountNumber', get(val, ['account_no'], ''), false)}
        {this.printKeyValue('description', get(val, ['description'], ''), false)}
        {this.printKeyValue('payable', get(val, ['app_system_no'], ''), false)}
        {this.printKeyValue('paymentMethod', get(val, ['payment_method'], ''), false)}
        {this.printKeyValue('contactInfo', get(val, ['contact_info'], ''), false)}
        {this.printKeyValue('libraryCode', get(val, ['library_code'], ''), false)}
        {this.printKeyValue('libraryEDICode', get(val, ['library_edi_code'], ''), false)}
        {this.printKeyValue('notes', get(val, ['notes'], ''), false)}
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
    const dataVal = initialValues.accounts.length >= 1 ? initialValues.accounts : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }} className={css.horizontalLine}>
          {dataVal.map(this.getAccounts)}
        </div>
      );
    } else {
      return (
        <div>
          <p>{<FormattedMessage id="ui-vendors.accounts.noAccountsAvail" />}</p>
        </div>
      );
    }
  }
}

export default AccountsView;
