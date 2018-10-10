import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from './AccountsView.css';

class AccountsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.getAccounts = this.getAccounts.bind(this);
  }

  getAccounts(val, key) {
    const rowCount = (this.props.initialValues.accounts.length - 1) !== key;
    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Name" value={_.get(val, 'name')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Account Number" value={_.get(val, 'account_no', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Description" value={_.get(val, 'description', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Acct. payable sys. no." value={_.get(val, 'app_system_no', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Payment  Method" value={_.get(val, 'payment_method', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Account Status" value={_.get(val, 'account_status', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Contact Info" value={_.get(val, 'contact_info', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Library Code" value={_.get(val, 'library_code', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Library EDI Code" value={_.get(val, 'library_edi_code', '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Notes" value={_.get(val, 'notes', '')} />
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
          <p>-- No accounts available --</p>
        </div>
      );
    }
  }
}

export default AccountsView;
