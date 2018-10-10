import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import BoolToCheckbox from '../Utils/BoolToCheckbox';
import css from './EdiInformationView.css';

class EdiInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.edi || false;
    const ediFtp = initialValues.edi ? initialValues.edi.edi_ftp : null;
    const ediScheduling = initialValues.edi ? initialValues.edi.edi_job : null;
    if (dataVal) {
      return (
        <div className={css.horizontalLine}>
          {dataVal &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>EDI Basic</div>
              </Col>
              <Col xs={3}>
                <KeyValue label="Vendor EDI Code" value={_.get(dataVal, ['vendor_edi_code'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Vendor EDI Type" value={_.get(dataVal, ['vendor_edi_type'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Library EDI Code" value={_.get(dataVal, ['lib_edi_code'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Library EDI Type" value={_.get(dataVal, ['lib_edi_type'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Prorate Tax">
                  <BoolToCheckbox name="Prorate Tax" value={_.get(dataVal, ['prorate_tax'])} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Prorate Fees">
                  <BoolToCheckbox name="Prorate Fees" value={_.get(dataVal, ['prorate_fees'])} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="EDI Naming Convention">
                  <BoolToCheckbox name="EDI Naming Convention" value={_.get(dataVal, ['edi_naming_convention'])} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Send Account Number">
                  <BoolToCheckbox name="Send Account Number" value={_.get(dataVal, ['send_acct_num'])} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Support Order">
                  <BoolToCheckbox name="Support Order" value={_.get(dataVal, ['support_order'])} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Support Invoice">
                  <BoolToCheckbox name="Support Invoice" value={_.get(dataVal, ['support_invoice'])} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Notes" value={_.get(dataVal, ['notes'], '')} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {ediFtp &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>FTP Details</div>
              </Col>
              <Col xs={3}>
                <KeyValue label="EDI FTP" value={_.get(ediFtp, ['ftp_format'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Server Address" value={_.get(ediFtp, ['server_address'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Username" value={_.get(ediFtp, ['username'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Password" value={_.get(ediFtp, ['password'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Mode" value={_.get(ediFtp, ['ftp_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Connection Mode" value={_.get(ediFtp, ['ftp_conn_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label="FTP Port" value={_.toString(_.get(ediFtp, ['ftp_port']))} />
              </Col>
              <Col xs={6}>
                <KeyValue label="Order Directory" value={_.get(ediFtp, ['order_directory'])} />
              </Col>
              <Col xs={6}>
                <KeyValue label="Invoice Directory" value={_.get(ediFtp, ['invoice_directory'])} />
              </Col>
              <Col xs={12}>
                <KeyValue label="Notes" value={_.get(ediFtp, ['notes'])} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {ediScheduling &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>Scheduling</div>
              </Col>
              <Col xs={3}>
                <KeyValue label="Schedule EDI">
                  <BoolToCheckbox name="Schedule EDI" value={_.toString(_.get(ediScheduling, ['schedule_edi']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Date" value={_.get(ediScheduling, ['date'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Time" value={_.get(ediScheduling, ['time'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Send to Emails" value={_.get(ediScheduling, ['send_to_emails'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify All EDI" value={_.toString(_.get(ediScheduling, ['notify_all_edi']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify Invoice Only">
                  <BoolToCheckbox name="Notify Invoice Only" value={_.toString(_.get(ediScheduling, ['notify_invoice_only']))} />
                </KeyValue>
              </Col>
              <Col xs={6}>
                <KeyValue label="Notify Error Only">
                  <BoolToCheckbox name="Notify Error Only" value={_.toString(_.get(ediScheduling, ['notify_error_only']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Monday">
                  <BoolToCheckbox name="Monday" value={_.toString(_.get(ediScheduling, ['is_monday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Tuesday">
                  <BoolToCheckbox name="Tuesday" value={_.toString(_.get(ediScheduling, ['is_tuesday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Wednesday">
                  <BoolToCheckbox name="Wednesday" value={_.toString(_.get(ediScheduling, ['is_wednesday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Thursday">
                  <BoolToCheckbox name="Thursday" value={_.toString(_.get(ediScheduling, ['is_thursday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Friday">
                  <BoolToCheckbox name="Friday" value={_.toString(_.get(ediScheduling, ['is_friday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Saturday">
                  <BoolToCheckbox name="Saturday" value={_.toString(_.get(ediScheduling, ['is_saturday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Sunday">
                  <BoolToCheckbox name="Sunday" value={_.toString(_.get(ediScheduling, ['is_sunday']))} />
                </KeyValue>
              </Col>
            </Row>
          }
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No Edi information available --</p>
          <br />
        </div>
      );
    }
  }
}

export default EdiInformationView;
