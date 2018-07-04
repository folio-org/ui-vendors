import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field } from 'redux-form';
import { AccordionSet, Accordion } from '@folio/stripes-components/lib/Accordion';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import Timepicker from '@folio/stripes-components/lib/Timepicker';
import moment from 'moment-timezone';
import Select from '@folio/stripes-components/lib/Select';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import Datepicker from '@folio/stripes-components/lib/Datepicker';
import css from './EdiInformationForm.css';
import TogglePassword from '../Utils/TogglePassword';

class EdiInformationForm extends Component {
  static propTypes = {
    parentResources: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      subSections: {
        ediBasicSection: false,
        ftpDetailsSection: false,
        schedulingSection: true
      }
    };
    this.onToggleSubSection = this.onToggleSubSection.bind(this);
  }

  onToggleSubSection(newAccordionStatus) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.subSections = newAccordionStatus;
      return newState;
    });
  }

  render() {
    const { parentResources, initialValues } = this.props;
    const vendorEdiCodeDD = (parentResources.dropdown || {}).vendorEdiCodeDD || [];
    const vendorEdiCodeTypeDD = (parentResources.dropdown || {}).vendorEdiCodeTypeDD || [];
    const libraryEDICodeDD = (parentResources.dropdown || {}).libraryEDICodeDD || [];
    const libraryEdiCodeTypeDD = (parentResources.dropdown || {}).libraryEdiCodeTypeDD || [];
    const ftpDD = (parentResources.dropdown || {}).ftpDD || [];
    const transmissionModeDD = (parentResources.dropdown || {}).transmissionModeDD || [];
    const connectionModeDD = (parentResources.dropdown || {}).connectionModeDD || [];

    return (
      <Col xs={12}>
        <AccordionSet accordionStatus={this.state.subSections} onToggle={this.onToggleSubSection}>
          <Accordion label="EDI Basic" id="ediBasicSection">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label="Vendor EDI Code" name="edi.vendor_edi_code" id="vendor_edi_code" component={Select} dataOptions={vendorEdiCodeDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Vendor EDI Code Type" name="edi.vendor_edi_type" id="vendor_edi_type" component={Select} dataOptions={vendorEdiCodeTypeDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Library EDI Code" name="edi.lib_edi_code" id="lib_edi_code" component={Select} dataOptions={libraryEDICodeDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Library EDI Type" name="edi.lib_edi_type" id="lib_edi_type" component={Select} dataOptions={libraryEdiCodeTypeDD} fullWidth />
                  </Col>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label="Prorate Tax" name="edi.prorate_tax" id="prorate_tax" component={Checkbox} />
                  </Col>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label="Prorate Service Fees/Shipping" name="edi.prorate_fees" id="prorate_fees" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label="EDI Naming Convention" name="edi.edi_naming_convention" id="edi_naming_convention" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Send Account Number" name="edi.send_acct_num" id="send_acct_num" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <p>What Messages are expected for this Vendor?</p>
                    <Field label="Order" name="edi.support_order" id="support_order" component={Checkbox} />
                    <Field label="Invoice" name="edi.support_invoice" id="support_invoice" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Field label="Notes" name="edi.notes" id="edi_notes" component={TextArea} fullWidth />
              </Col>
            </Row>
            <br />
          </Accordion>
          <Accordion label="FTP Details" id="ftpDetailsSection">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label="FTP Format" name="edi.edi_ftp.ftp_format" id="edi_edit_ftp_format" component={Select} dataOptions={ftpDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Server Address" name="edi.edi_ftp.server_address" id="edi_server_address" type="text" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Username" name="edi.edi_ftp.username" id="edi_username" type="text" component={TextField} autoComplete="nope" fullWidth />
                  </Col>
                  <Col xs={12}>
                    <TogglePassword name="edi.edi_ftp.password" id="edi_password" buttonID="edi_password.button" />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <Field label="FTP Transmission Mode" name="edi.edi_ftp.ftp_mode" id="edi_edi_ftp__mode" component={Select} dataOptions={transmissionModeDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="FTP Connection Mode" name="edi.edi_ftp.ftp_conn_mode" id="edi_edi_ftp_conn_mode" component={Select} dataOptions={connectionModeDD} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="FTP Port" name="edi.edi_ftp.ftp_port" id="edi_edit_ftp_ftp_port" type="text" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Order Directory" name="edi.edi_ftp.order_directory" id="edi_order_directory" type="text" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="Invoice Directory" name="edi.edi_ftp.invoice_directory" id="edi_invoice_directory" type="text" component={TextField} fullWidth />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Field label="Notes" name="edi.edi_ftp.notes" id="edi_edi_ftp.notes" component={TextArea} fullWidth />
              </Col>
            </Row>
          </Accordion>
          <Accordion label="Scheduling" id="schedulingSection">
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12} className={css.EDIInfoCheckbox}>
                    <Field label="Schedule" name="edi.edi_job.schedule_edi" id="schedule_edi" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field label="Date" name="edi.edi_job.date" id="edi_edi_job.date" component={Datepicker} />
                  </Col>
                  <Col xs={12}>
                    <Field label="Time" name="edi.edi_job.time" id="edi_edi_job.time" placeholder="Select Time" component={Timepicker} timeZone="UTC" />
                  </Col>
                  <Col xs={12}>
                    <p style={{ fontSize: '.8rem', fontWeight: 'bold' }}>Weekly:</p>
                    <Row>
                      <Col xs={12} md={6} className={css.EDIInfoCheckbox}>
                        <Field label="Monday" name="edi.edi_job.is_monday" id="is_monday" component={Checkbox} inline={false} />
                        <Field label="Tuesday" name="edi.edi_job.is_tuesday" id="is_tuesday" component={Checkbox} inline={false} />
                        <Field label="Wednesday" name="edi.edi_job.is_wednesday" id="is_wednesday" component={Checkbox} inline={false} />
                        <Field label="Thursday" name="edi.edi_job.is_thursday" id="is_thursday" component={Checkbox} inline={false} />
                      </Col>
                      <Col xs={12} md={6} className={css.EDIInfoCheckbox}>
                        <Field label="Friday" name="edi.edi_job.is_friday" id="is_friday" component={Checkbox} inline={false} />
                        <Field label="Saturday" name="edi.edi_job.is_saturday" id="is_saturday" component={Checkbox} inline={false} />
                        <Field label="Sunday" name="edi.edi_job.is_sunday" id="is_sunday" component={Checkbox} inline={false} />
                      </Col>
                    </Row>
                    <br />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12}>
                    <p style={{ fontSize: '.8rem', fontWeight: 'bold' }}>NotificationOptions:</p>
                  </Col>
                  <Col xs={12}>
                    <Field label="Send To" name="edi.edi_job.send_to_emails" id="send_to_emails" component={TextField} fullWidth />
                  </Col>
                  <Col xs={12}>
                    <Field label="All EDI Transactions" name="edi.edi_job.notify_all_edi" id="notify_all_edi" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field label="Invoice Only" name="edi.edi_job.notify_invoice_only" id="notify_invoice_only" component={Checkbox} />
                  </Col>
                  <Col xs={12}>
                    <Field label="Errors Only" name="edi.edi_job.notify_error_only" id="notify_error_only" component={Checkbox} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Button>Check Now!</Button>
              </Col>
              <Col xs={12}>
                <Field label="Notes" name="edi.edi_job.scheduling_notes" id="edi_job.scheduling_notes" component={TextArea} fullWidth />
              </Col>
            </Row>
          </Accordion>
        </AccordionSet>
      </Col>
    );
  }
}

export default EdiInformationForm;
