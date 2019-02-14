import React from 'react';
import PropTypes from 'prop-types';
import mapKeys from 'lodash/mapKeys';
import { Pane, PaneMenu, Button } from '@folio/stripes/components';
import stripesForm from '@folio/stripes/form';
import css from './PaneDetails.css';
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
    this.getVendorCategory = this.getVendorCategory.bind(this);
    this.getCurrencies = this.getCurrencies.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
    this.getLanguageList = this.getLanguageList.bind(this);
  }

  getAddFirstMenu() {
    const { onCancel } = this.props;
    return (
      <PaneMenu>
        <button type="button" id="clickable-closenewvendordialog" onClick={onCancel} title="close" aria-label="Close New Vendor Dialog">
          <span className={css.closeButton}>&times;</span>
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

  getVendorCategory() {
    const { parentResources } = this.props;
    const records = (parentResources.vendorCategory || {}).records || [];
    if (!records || records.length === 0) return null;
    const data = records.map((o) => {
      return Object.assign({
        label: o.value,
        value: o.id
      });
    });
    return data;
  }

  getContactCategory() {
    const { parentResources } = this.props;
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
    const { parentResources } = this.props;
    const data = (parentResources.dropdown || {}).currencyDD || [];
    if (!data || data.length === 0) return null;
    return data;
  }

  getPhoneType() {
    const { parentResources } = this.props;
    const data = (parentResources.dropdown || {}).phoneTypeDD || [];
    // if (!data || data.length === 0) return null;
    return data;
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
    const paneTitle = initialValues.id ? (
      <span>
        {`Edit: ${_.get(initialValues, ['name'], '')}`}
      </span>
    ) : 'Create Vendor';
    const lastMenu = initialValues.id ?
      this.getLastMenu('clickable-updatevendor', 'Update vendor') :
      this.getLastMenu('clickable-createnewvendor', 'Create vendor');

    return (
      <form id="form-vendor">
        <Pane defaultWidth="100%" firstMenu={firstMenu} lastMenu={lastMenu} paneTitle={paneTitle}>
          <FormVendor
            dropdownCurrencies={this.getCurrencies()}
            dropdownVendorCategories={this.getVendorCategory()}
            dropdownContactCategories={this.getContactCategory()}
            dropdownLanguages={this.getLanguageList()}
            dropdownPhoneType={this.getPhoneType()}
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
