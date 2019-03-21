import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get, find, isNull, toString } from 'lodash';
import { Row, Col } from '@folio/stripes/components';
import css from './EdiInformationView.css';
import { PrintKeyValue, PrintBoolToCheckbox } from '../Utils/PrintKeyValue';

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
              {PrintKeyValue('ui-vendors.edi.vendorEDICode', get(dataVal, 'edi.vendor_edi_code', ''), 3, false)}
              {PrintKeyValue('ui-vendors.edi.vendorEDIType', get(dataVal, 'edi.vendor_edi_type', ''), 3, false)}
              {PrintKeyValue('ui-vendors.edi.libraryEDICode', get(dataVal, 'edi.lib_edi_code', ''), 3, false)}
              {PrintKeyValue('ui-vendors.edi.libraryEDIType', this.getLibraryEdiCodeTypeDD(get(dataVal, 'edi.lib_edi_type', '')), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.prorateTax', get(dataVal, 'edi.prorate_tax'), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.prorateFees', get(dataVal, 'edi.prorate_fees'), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.ediNamingConvention', get(dataVal, 'edi.edi_naming_convention'), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.sendAccountNumber', get(dataVal, 'edi.send_acct_num'), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.supportOrder', get(dataVal, 'edi.support_order'), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.supportInvoice', get(dataVal, 'edi.support_invoice'), 3, false)}
              {PrintKeyValue('ui-vendors.edi.notes', get(dataVal, 'edi.notes', ''), 3, false)}
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
              {PrintKeyValue('ui-vendors.edi.editFTP', get(ediFtp, ['ftp_format']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.serverAddress', get(ediFtp, ['server_address']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.username', get(ediFtp, ['username']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.password', get(ediFtp, ['password']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.ftpMode', get(ediFtp, ['ftp_mode']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.ftpPort', get(ediFtp, ['ftp_port']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.orderDirectory', get(ediFtp, ['order_directory']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.invoiceDirectory', get(ediFtp, ['invoice_directory']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.notes', get(ediFtp, ['notes']), 3, false)}
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
              {PrintBoolToCheckbox('ui-vendors.edi.scheduleEDI', toString(get(ediScheduling, ['schedule_edi'])), 3, false)}
              {PrintKeyValue('ui-vendors.edi.date', get(ediScheduling, ['date']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.time', get(ediScheduling, ['time']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.sendToEmails', get(ediScheduling, ['send_to_emails']), 3, false)}
              {PrintKeyValue('ui-vendors.edi.notifyAllEDI', get(ediScheduling, ['notify_all_edi']), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.notifyInvoiceOnly', toString(get(ediScheduling, ['notify_invoice_only'])), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.notifyErrorOnly', toString(get(ediScheduling, ['notify_error_only'])), 6, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.monday', toString(get(ediScheduling, ['is_monday'])), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.tuesday', toString(get(ediScheduling, ['is_tuesday'])), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.wednesday', toString(get(ediScheduling, ['is_wednesday'])), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.thursday', toString(get(ediScheduling, ['is_thursday'])), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.friday', toString(get(ediScheduling, ['is_friday'])), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.saturday', toString(get(ediScheduling, ['is_saturday'])), 3, false)}
              {PrintBoolToCheckbox('ui-vendors.edi.sunday', toString(get(ediScheduling, ['is_sunday'])), 3, false)}
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
