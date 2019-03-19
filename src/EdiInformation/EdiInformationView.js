import React from 'react';
import PropTypes from 'prop-types';
import { get, find, isNull, toString } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import BoolToCheckbox from '../Utils/BoolToCheckbox';
import css from './EdiInformationView.css';

class EdiInformationView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    parentResources: PropTypes.shape({
      dropdown: PropTypes.shape({
        paymentMethodDD: PropTypes.array.isRequired,
        ediCodeTypeDD: PropTypes.object
      })
    })
  }

  constructor(props) {
    super(props);
    this.getVendorCodeTypeItem = this.getVendorCodeTypeItem.bind(this);
    this.getLibraryEdiCodeTypeDD = this.getLibraryEdiCodeTypeDD.bind(this);
  }

  getVendorCodeTypeItem(item) {
    const { parentResources: { dropdown: { ediCodeTypeDD } } } = this.props;
    if (isNull(item)) return '';
    const obj = find(ediCodeTypeDD, { value: item });
    if (obj.value === '') return '';
    return obj.label;
  }

  getLibraryEdiCodeTypeDD(item) {
    const { parentResources: { dropdown: { ediCodeTypeDD } } } = this.props;
    if (isNull(item)) return '';
    const obj = find(ediCodeTypeDD, { value: item });
    if (obj.value === '') return '';
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
                <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.edi.ediBasic" />}</div>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.vendorEDICode" />} value={get(dataVal, 'edi.vendor_edi_code', '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.vendorEDIType" />} value={this.getVendorCodeTypeItem(get(dataVal, 'edi.vendor_edi_type', ''))} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.libraryEDICode" />} value={get(dataVal, 'edi.lib_edi_code', '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.libraryEDIType" />} value={this.getLibraryEdiCodeTypeDD(get(dataVal, 'edi.lib_edi_type', ''))} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.prorateTax" />}>
                  <BoolToCheckbox name="Prorate Tax" value={get(dataVal, 'edi.prorate_tax')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.prorateFees" />}>
                  <BoolToCheckbox name="Prorate Fees" value={get(dataVal, 'edi.prorate_fees')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.ediNamingConvention" />}>
                  <BoolToCheckbox name="EDI Naming Convention" value={get(dataVal, 'edi.edi_naming_convention')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.sendAccountNumber" />}>
                  <BoolToCheckbox name="Send Account Number" value={get(dataVal, 'edi.send_acct_num')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.supportOrder" />}>
                  <BoolToCheckbox name="Support Order" value={get(dataVal, 'edi.support_order')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.supportInvoice" />}>
                  <BoolToCheckbox name="Support Invoice" value={get(dataVal, 'edi.support_invoice')} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.notes" />} value={get(dataVal, 'edi.notes', '')} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {ediFtp &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.edi.ftpDetails" />}</div>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.editFTP" />} value={get(ediFtp, ['ftp_format'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.serverAddress" />} value={get(ediFtp, ['server_address'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.username" />} value={get(ediFtp, ['username'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.password" />} value={get(ediFtp, ['password'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.ftpMode" />} value={get(ediFtp, ['ftp_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.ftpConnectionMode" />} value={get(ediFtp, ['ftp_conn_mode'])} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.ftpPort" />} value={toString(get(ediFtp, ['ftp_port']))} />
              </Col>
              <Col xs={6}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.orderDirectory" />} value={get(ediFtp, ['order_directory'])} />
              </Col>
              <Col xs={6}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.invoiceDirectory" />} value={get(ediFtp, ['invoice_directory'])} />
              </Col>
              <Col xs={12}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.notes" />} value={get(ediFtp, ['notes'])} />
              </Col>
              <Col xs={12}>
                <hr />
              </Col>
            </Row>
          }
          {ediScheduling &&
            <Row>
              <Col xs={12}>
                <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.edi.scheduling" />}</div>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.scheduleEDI" />}>
                  <BoolToCheckbox name="Schedule EDI" value={toString(get(ediScheduling, ['schedule_edi']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.date" />} value={get(ediScheduling, ['date'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.time" />} value={get(ediScheduling, ['time'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.sendToEmails" />} value={get(ediScheduling, ['send_to_emails'], '')} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.notifyAllEDI" />} value={toString(get(ediScheduling, ['notify_all_edi']))} />
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.notifyInvoiceOnly" />}>
                  <BoolToCheckbox name="Notify Invoice Only" value={toString(get(ediScheduling, ['notify_invoice_only']))} />
                </KeyValue>
              </Col>
              <Col xs={6}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.notifyErrorOnly" />}>
                  <BoolToCheckbox name="Notify Error Only" value={toString(get(ediScheduling, ['notify_error_only']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.monday" />}>
                  <BoolToCheckbox name="Monday" value={toString(get(ediScheduling, ['is_monday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.tuesday" />}>
                  <BoolToCheckbox name="Tuesday" value={toString(get(ediScheduling, ['is_tuesday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.wednesday" />}>
                  <BoolToCheckbox name="Wednesday" value={toString(get(ediScheduling, ['is_wednesday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.thursday" />}>
                  <BoolToCheckbox name="Thursday" value={toString(get(ediScheduling, ['is_thursday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.friday" />}>
                  <BoolToCheckbox name="Friday" value={toString(get(ediScheduling, ['is_friday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.saturday" />}>
                  <BoolToCheckbox name="Saturday" value={toString(get(ediScheduling, ['is_saturday']))} />
                </KeyValue>
              </Col>
              <Col xs={3}>
                <KeyValue label={<FormattedMessage id="ui-vendors.edi.sunday" />}>
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
          <p>{<FormattedMessage id="ui-vendors.edi.noEdiInfo" />}</p>
          <br />
        </div>
      );
    }
  }
}

export default EdiInformationView;
