import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';
import moment from 'moment-timezone';
// Folio
import { AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes-components/lib/Accordion';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Icon from '@folio/stripes-components/lib/Icon';
import IconButton from '@folio/stripes-components/lib/IconButton';
import IfPermission from '@folio/stripes-components/lib/IfPermission';
import Layer from '@folio/stripes-components/lib/Layer';
// Local Components
import { SummaryView } from '../Summary';
import { ContactInformationView } from '../ContactInformation';
import { ContactPeopleView } from '../ContactPeople';
import { AgreementsView } from '../Agreements';
import { VendorInformationView } from '../VendorInformation';
import { EdiInformationView } from '../EdiInformation';
import { InterfaceView } from '../Interface';
import { AccountsView } from '../Accounts';
import PaneDetails from '../PaneDetails';
import FormatTime from '../Utils/FormatTime';

class ViewVendor extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    dropdown: PropTypes.object,
    stripes: PropTypes.object.isRequired,
    onCloseEdit: PropTypes.func,
    onClose: PropTypes.func,
    onEdit: PropTypes.func,
    parentResources: PropTypes.object.isRequired,
    parentMutator: PropTypes.object.isRequired,
    editLink: PropTypes.string,
    paneWidth: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sections: {
        summarySection: true,
        contactInformationSection: false,
        contactPeopleSection: false,
        agreementsSection: false,
        vendorInformationSection: false,
        EDIInformationSection: false,
        interfaceSection: false,
        accountsSection: false,
      }
    };
    this.connectedPaneDetails = this.props.stripes.connect(PaneDetails);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.onToggleSection = this.onToggleSection.bind(this);
  }

  getData() {
    const { parentResources, match: { params: { id } } } = this.props;
    const vendors = (parentResources.records || {}).records || [];
    if (!vendors || vendors.length === 0 || !id) return null;
    const data = vendors.find(u => u.id === id);

    const time = FormatTime(data, 'get');
    if (time) { data.edi.edi_job.time = time; }

    return data;
  }

  onToggleSection({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !curState.sections[id];
      return newState;
    });
  }

  handleExpandAll(obj) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = obj;
      return newState;
    });
  }

  update(data) {
    data.addresses.map((item) => {
      delete item.address.primaryAddress;
      return item;
    });
    // Update time
    const time = FormatTime(data, 'post');
    if (time) { data.edi.edi_job.time = time; }
    // Mutate
    this.props.parentMutator.records.PUT(data).then(() => {
      this.props.onCloseEdit();
    });
  }

  render() {
    const { location } = this.props;
    const initialValues = this.getData();
    const query = location.search ? queryString.parse(location.search) : {};
    const lastMenu = (<PaneMenu>
      <IfPermission perm="vendor.item.put">
        <IconButton
          icon="edit"
          id="clickable-editvendor"
          style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
          onClick={this.props.onEdit}
          href={this.props.editLink}
          title="Edit Vendor"
        />
      </IfPermission> </PaneMenu>);

    if (!initialValues) {
      return (
        <Pane id="pane-vendordetails" defaultWidth={this.props.paneWidth} paneTitle="Details" lastMenu={lastMenu} dismissible onClose={this.props.onClose}>
          <div style={{ paddingTop: '1rem' }}><Icon icon="spinner-ellipsis" width="100px" /></div>
        </Pane>
      );
    }

    return (
      <Pane id="pane-vendordetails" defaultWidth={this.props.paneWidth} paneTitle={_.get(initialValues, ['name'], '')} lastMenu={lastMenu} dismissible onClose={this.props.onClose}>
        <Row end="xs"><Col xs><ExpandAllButton accordionStatus={this.state.sections} onToggle={this.handleExpandAll} /></Col></Row>
        <AccordionSet accordionStatus={this.state.sections} onToggle={this.onToggleSection}>
          <Accordion label="Summary" id="summarySection">
            <SummaryView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="Contact Information" id="contactInformationSection">
            <ContactInformationView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="Contact People" id="contactPeopleSection">
            <ContactPeopleView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="Agreements" id="agreementsSection">
            <AgreementsView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="Vendor Information" id="vendorInformationSection">
            <VendorInformationView initialValues={initialValues} {...this.props} />
            <br />
          </Accordion>
          <Accordion label="EDI Information" id="EDIInformationSection">
            <EdiInformationView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="Interface" id="interfaceSection">
            <InterfaceView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="Accounts" id="accountsSection">
            <AccountsView initialValues={initialValues} {...this.props} />
          </Accordion>
        </AccordionSet>
        <Layer isOpen={query.layer ? query.layer === 'edit' : false} label="Edit Vendor Dialog">
          <this.connectedPaneDetails
            stripes={this.props.stripes}
            initialValues={initialValues}
            onSubmit={(record) => { this.update(record); }}
            onCancel={this.props.onCloseEdit}
            parentResources={this.props.parentResources}
            parentMutator={this.props.parentMutator}
          />
        </Layer>
      </Pane>
    );
  }
}

export default ViewVendor;
