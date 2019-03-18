import React from 'react';
import PropTypes from 'prop-types';
import { get, find, isNull, toString } from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import BoolToCheckbox from '../Utils/BoolToCheckbox';
import css from './EdiInformationView.css';
import { FormattedMessage } from 'react-intl';

class EdiInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        paymentMethodDD: PropTypes.array.isRequired,
        vendorEdiCodeTypeDD: PropTypes.object,
        libraryEdiCodeTypeDD: PropTypes.object
      })
    })
  }

  constructor(props) {
    super(props);
    this.getVendorCodeTypeItem = this.getVendorCodeTypeItem.bind(this);
    this.getLibraryEdiCodeTypeDD = this.getLibraryEdiCodeTypeDD.bind(this);
  }

  getVendorCodeTypeItem(item) {
    const { parentResources: { dropdown: { vendorEdiCodeTypeDD } } } = this.props;
    if (isNull(item)) return '';
    const obj = find(vendorEdiCodeTypeDD, { value: item });
    return obj.label;
  }

  getLibraryEdiCodeTypeDD(item) {
    const { parentResources: { dropdown: { libraryEdiCodeTypeDD } } } = this.props;
    if (isNull(item)) return '';
    const obj = find(libraryEdiCodeTypeDD, { value: item });
    return obj.label;
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues || false;
    const ediFtp = initialValues.edi ? initialValues.edi.edi_ftp : null;
    const ediScheduling = initialValues.edi ? initialValues.edi.edi_job : null;

    if (dataVal) {
      return (
        <div className={css.horizontalLine}>
          {dataVal &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.ediBasic" />}</div>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.vendorEDICode" />} value={get(dataVal, 'edi.vendor_edi_code', '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.vendorEDIType" />} value={this.getVendorCodeTypeItem(get(dataVal, 'edi.vendor_edi_type', ''))} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.libraryEDICode" />} value={get(dataVal, 'edi.lib_edi_code', '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.libraryEDIType" />} value={this.getLibraryEdiCodeTypeDD(get(dataVal, 'edi.lib_edi_type', ''))} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.prorateTax" />}>
                  <BoolToCheckbox name="Prorate Tax" value={get(dataVal, 'edi.prorate_tax')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.prorateFees" />}>
                  <BoolToCheckbox name="Prorate Fees" value={get(dataVal, 'edi.prorate_fees')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.ediNamingConvention" />}>
                  <BoolToCheckbox name="EDI Naming Convention" value={get(dataVal, 'edi.edi_naming_convention')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.sendAccountNumber" />}>
                  <BoolToCheckbox name="Send Account Number" value={get(dataVal, 'edi.send_acct_num')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.supportOrder" />}>
                  <BoolToCheckbox name="Support Order" value={get(dataVal, 'edi.support_order')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.supportInvoice" />}>
                  <BoolToCheckbox name="Support Invoice" value={get(dataVal, 'edi.support_invoice')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.notes" />} value={get(dataVal, 'edi.notes', '')} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {ediFtp &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.ftpDetails" />}</div>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.editFTP" />} value={get(ediFtp, ['ftp_format'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.serverAddress" />} value={get(ediFtp, ['server_address'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.username" />} value={get(ediFtp, ['username'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.password" />} value={get(ediFtp, ['password'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.ftpMode" />} value={get(ediFtp, ['ftp_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.ftpConnectionMode" />} value={get(ediFtp, ['ftp_conn_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.ftpPort" />} value={toString(get(ediFtp, ['ftp_port']))} />
              </Col>
              <Col xs={6}>
                <KeyValue label={<FormattedMessage id="ui-vendors.orderDirectory" />} value={get(ediFtp, ['order_directory'])} />
              </Col>
              <Col xs={6}>
                <KeyValue label={<FormattedMessage id="ui-vendors.invoiceDirectory" />} value={get(ediFtp, ['invoice_directory'])} />
              </Col>
              <Col xs={12}>
                <KeyValue label={<FormattedMessage id="ui-vendors.notes" />} value={get(ediFtp, ['notes'])} />
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
                  <BoolToCheckbox name="Schedule EDI" value={toString(get(ediScheduling, ['schedule_edi']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Date" value={get(ediScheduling, ['date'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Time" value={get(ediScheduling, ['time'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Send to Emails" value={get(ediScheduling, ['send_to_emails'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify All EDI" value={toString(get(ediScheduling, ['notify_all_edi']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label="Notify Invoice Only">
                  <BoolToCheckbox name="Notify Invoice Only" value={toString(get(ediScheduling, ['notify_invoice_only']))} />
                </KeyValue>
              </Col>
              <Col xs={6}>
                <KeyValue label="Notify Error Only">
                  <BoolToCheckbox name="Notify Error Only" value={toString(get(ediScheduling, ['notify_error_only']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Monday">
                  <BoolToCheckbox name="Monday" value={toString(get(ediScheduling, ['is_monday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Tuesday">
                  <BoolToCheckbox name="Tuesday" value={toString(get(ediScheduling, ['is_tuesday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Wednesday">
                  <BoolToCheckbox name="Wednesday" value={toString(get(ediScheduling, ['is_wednesday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Thursday">
                  <BoolToCheckbox name="Thursday" value={toString(get(ediScheduling, ['is_thursday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Friday">
                  <BoolToCheckbox name="Friday" value={toString(get(ediScheduling, ['is_friday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Saturday">
                  <BoolToCheckbox name="Saturday" value={toString(get(ediScheduling, ['is_saturday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label="Sunday">
                  <BoolToCheckbox name="Sunday" value={toString(get(ediScheduling, ['is_sunday']))} />
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
