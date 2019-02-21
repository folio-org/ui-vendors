import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';
// Folio
import { IfPermission } from '@folio/stripes/core';
import { Pane, PaneMenu, Row, Col, Icon, IconButton, Layer, AccordionSet, Accordion, ExpandAllButton } from '@folio/stripes/components';
import { withTags } from '@folio/stripes/smart-components';
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
import CatIDToObject from '../Utils/CatIDToObject';

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
        contactInformationSection: true,
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

  static getDerivedStateFromProps(props, state) {
    const { parentMutator, parentResources, match: { params: { id } } } = props;
    const vendorID = (parentResources.vendorID || {}).records || [];
    if (!_.isEqual(vendorID, state.vendorData)) {
      parentMutator.queryCustom.update({ vendorIDQuery: `query=(id=${id})` });
      return { vendorData: vendorID };
    }
    return null;
  }

  getData() {
    const { parentResources, match: { params: { id } } } = this.props;
    const resourceData = ((parentResources.records || {}).records || []);
    const selectData = resourceData.length > 0 ? resourceData : this.state.vendorData;
    const vendorData = !_.isEmpty(selectData) ? selectData : [];
    //  If no ID return nulPl
    if (!id) return null;
    // Else check if data matches id
    const data = vendorData.find(u => u.id === id);
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
    // // Update Categories for Contact Information
    // const urlsCat = this.getCategoryID(data, 'urls');
    // const phoneNumbersCat = this.getCategoryID(data, 'phone_numbers');
    // const emailsCat = this.getCategoryID(data, 'emails');
    // const addressCatInfo = this.getCategoryID(data, 'addresses');
    // if (!_.isEmpty(urlsCat)) data.urls = urlsCat;
    // if (!_.isEmpty(phoneNumbersCat)) data.phone_numbers = phoneNumbersCat;
    // if (!_.isEmpty(emailsCat)) data.emails = emailsCat;
    // if (!_.isEmpty(addressCatInfo)) data.addresses = addressCatInfo;
    // // Update Categories for Contact People
    // const contactPeople = this.getCategoryIDContactPeople(data);
    // if (!_.isEmpty(contactPeople)) data.contact = contactPeople;
    // // Mutate
    this.props.parentMutator.records.PUT(data).then(() => {
      this.props.onCloseEdit();
    });
  }

  getCategoryID(data, objName) {
    if (_.isEmpty(data[objName])) return [];
    const obj = data[objName];
    const newObj = obj.map((item) => {
      if (_.isEmpty(item.categories)) return item;
      const carArray = item.categories.map((cat) => cat.value);
      item.categories = carArray;
      return item;
    });
    return newObj;
  }

  getCategoryIDContactPeople(data) {
    if (_.isEmpty(data.contacts)) return []; // return if contact if empty;
    const objData = data.contacts.map((contactItem) => {
      const urlsCat = this.getCategoryID(contactItem, 'urls');
      const phoneNumbersCat = this.getCategoryID(contactItem, 'phone_numbers');
      const emailsCat = this.getCategoryID(contactItem, 'emails');
      const addressCatInfo = this.getCategoryID(contactItem, 'addresses');
      if (!_.isEmpty(urlsCat)) contactItem.urls = urlsCat;
      if (!_.isEmpty(phoneNumbersCat)) contactItem.phone_numbers = phoneNumbersCat;
      if (!_.isEmpty(emailsCat)) contactItem.emails = emailsCat;
      if (!_.isEmpty(addressCatInfo)) contactItem.addresses = addressCatInfo;
      console.log(contactItem);
      return contactItem;
    });
    console.log(objData);
    return objData;
  }

  render() {
    const { location } = this.props;
    const initialValues = this.getData();
    const query = location.search ? queryString.parse(location.search) : {};
    const lastMenu = (
      <PaneMenu>
        <IfPermission perm="vendor-storage.vendors.item.put">
          <IconButton
            icon="edit"
            id="clickable-editvendor"
            style={{ visibility: !initialValues ? 'hidden' : 'visible' }}
            onClick={this.props.onEdit}
            href={this.props.editLink}
            title="Edit Vendor"
          />
        </IfPermission>
      </PaneMenu>
    );

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
          </Accordion>
          <Accordion label="Contact Information" id="contactInformationSection">
            <ContactInformationView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="Contact People" id="contactPeopleSection">
            <ContactPeopleView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="Agreements" id="agreementsSection">
            <AgreementsView initialValues={initialValues} {...this.props} />
          </Accordion>
          <Accordion label="Vendor Information" id="vendorInformationSection">
            <VendorInformationView initialValues={initialValues} {...this.props} />
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

export default withTags(ViewVendor);
