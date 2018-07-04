import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import Button from '@folio/stripes-components/lib/Button';
import stripesForm from '@folio/stripes-form';
import { FormVendor } from '../VendorViews';

class PaneDetails extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onRemove: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    parentResources: PropTypes.shape({
      vendorCategory: PropTypes.object,
      vendorContactCategory: PropTypes.object,
      dropdown: PropTypes.object.isRequired
    }),
    parentMutator: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.deleteVendor = this.deleteVendor.bind(this);
    this.getContactCategory = this.getContactCategory.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
    this.getLanguageList = this.getLanguageList.bind(this);
  }
  getAddFirstMenu() {
    const { onCancel } = this.props;
    return (
      <PaneMenu>
        <button id="clickable-closenewvendordialog" onClick={onCancel} title="close" aria-label="Close New Vendor Dialog">
          <span style={{ fontSize: '30px', color: '#999', lineHeight: '18px' }} >&times;</span>
        </button>
      </PaneMenu>
    );
  }

  getLastMenu(id, label) {
    const { pristine, submitting, handleSubmit } = this.props;
    return (
      <PaneMenu>
        <Button
          id={id}
          type="submit"
          title={label}
          disabled={pristine || submitting}
          onClick={handleSubmit}
          style={{ marginBottom: '0' }}
        >
          {label}
        </Button>
      </PaneMenu>
    );
  }

  getCategory() {
    const { parentResources } = this.props;
    // const data = (parentResources.vendorCategory || {}).records || [];
    const data = (parentResources.dropdown || {}).categoriesDD || [];
    if (!data || data.length === 0) return null;
    return data;
  }

  getContactCategory() {
    const { parentResources } = this.props;
    // const data = (parentResources.vendorContactCategory || {}).records || [];
    const data = (parentResources.dropdown || {}).categoriesDD || [];
    if (!data || data.length === 0) return null;
    return data;
  }

  getCountryList() {
    const { parentResources } = this.props;
    const data = parentResources.CountryList || [];
    if (!data || data.length === 0) return null;
    return Object.values(data);
  }

  getLanguageList() {
    const { parentResources } = this.props;
    const data = parentResources.LanguageList || [];
    if (!data || data.length === 0) return null;
    return Object.values(data);
  }

  getCurrencies() {
    const objCur = [];
    const arr = ['USD', 'CAD', 'GBP', 'EUR'];
    for (let i = 0; i < arr.length; ++i) {
      objCur.push({ label: arr[i], value: arr[i] });
      if ((arr.length - 1) === i) {
        return objCur;
      }
    }
    return objCur;
  }

  convertValueToLabel(resourcesPath) {
    const newArray = [];
    const resCat = resourcesPath;
    const arrLength = resCat.records.length - 1;
    if (arrLength >= 1) {
      const arr = resCat.records;
      // Convert value to label & id to value
      Object.keys(arr).map((key) => {
        const obj = {
          label: arr[key].value,
          value: arr[key].id
        };
        newArray.push(obj);
        return newArray;
      });
    }
    return newArray;
  }

  deleteVendor(ID) {
    const { parentMutator } = this.props;
    parentMutator.records.DELETE({ id: ID }).then(() => {
      parentMutator.query.update({
        _path: '/vendor',
        layer: null
      });
    });
  }

  render() {
    const { initialValues } = this.props;
    const firstMenu = this.getAddFirstMenu();
    const paneTitle = initialValues.id ? <span>Edit: {_.get(initialValues, ['name'], '')} </span> : 'Create Vendor';
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-updatevendor', 'Update vendor') :
      this.getLastMenu('clickable-createnewvendor', 'Create vendor');

    return (
      <form id="form-vendor">
        <Pane defaultWidth="100%" firstMenu={firstMenu} lastMenu={lastMenu} paneTitle={paneTitle}>
          <FormVendor
            dropdownCurrencies={this.getCurrencies()}
            // dropdownCategories={this.getCategory()} //Data from database
            dropdownCategories={this.getCategory()} // Hard coded value
            dropdownContactCategories={this.getContactCategory()}
            dropdownCountry={this.getCountryList()}
            dropdownLanguages={this.getLanguageList()}
            deleteVendor={this.deleteVendor}
            {...this.props}
          />
        </Pane>
      </form>
    );
  }
}

export default stripesForm({
  form: 'FormVendor',
  navigationCheck: true,
  enableReinitialize: true,
})(PaneDetails);
