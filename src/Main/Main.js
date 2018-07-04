import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment-timezone';
import FormatTime from '../Utils/FormatTime';
// Folio
import SearchAndSort from '@folio/stripes-smart-components/lib/SearchAndSort';
import { filters2cql } from '@folio/stripes-components/lib/FilterGroups';
import packageInfo from '../../package';
// Components and Pages
import PaneDetails from '../PaneDetails';
import { ViewVendor } from '../VendorViews';
import { Filters, SearchableIndexes } from '../Utils/FilterConfig';
import css from './Main.css';
import LanguageList from '../Utils/Languages';
import CountryList from '../Utils/Country';

const INITIAL_RESULT_COUNT = 30;
const RESULT_COUNT_INCREMENT = 30;
const filterConfig = Filters();
const searchableIndexes = SearchableIndexes;

class Main extends Component {
  static propTypes = {
    mutator: PropTypes.object.isRequired,
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.object
  }

  static manifest = Object.freeze({
    initializedFilterConfig: { initialValue: false },
    query: {
      initialValue: {
        query: '',
        filters: '',
        sort: 'Name'
      },
    },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
    records: {
      type: 'okapi',
      clear: true,
      records: 'vendors',
      recordsRequired: '%{resultCount}',
      path: 'vendor',
      perRequest: RESULT_COUNT_INCREMENT,
      GET: {
        params: {
          query: (...args) => {
            /*
              This code is not DRY as it is copied from makeQueryFunction in stripes-components.
              This is necessary, as makeQueryFunction only referneces query paramaters as a data source.
              STRIPES-480 is intended to correct this and allow this query function to be replace with a call
              to makeQueryFunction.
              https://issues.folio.org/browse/STRIPES-480
            */
            const resourceData = args[2];
            const sortMap = {
              Name: 'name',
              Code: 'code',
              Description: 'description',
              endor_status: 'vendor_status',
            };

            const index = resourceData.query.qindex ? resourceData.query.qindex : 'all';
            const searchableIndex = searchableIndexes.find(idx => idx.value === index);

            let cql = searchableIndex.makeQuery(resourceData.query.query);
            const filterCql = filters2cql(filterConfig, resourceData.query.filters);
            if (filterCql) {
              if (cql) {
                cql = `(${cql}) and ${filterCql}`;
              } else {
                cql = filterCql;
              }
            }

            const { sort } = resourceData.query;
            if (sort) {
              const sortIndexes = sort.split(',').map((sort1) => {
                let reverse = false;
                if (sort1.startsWith('-')) {
                  // eslint-disable-next-line no-param-reassign
                  sort1 = sort1.substr(1);
                  reverse = true;
                }
                let sortIndex = sortMap[sort1] || sort1;
                if (reverse) {
                  sortIndex = `${sortIndex.replace(' ', '/sort.descending ')}/sort.descending`;
                }
                return sortIndex;
              });

              cql += ` sortby ${sortIndexes.join(' ')}`;
            }
            return cql;
          },
        },
        staticFallback: { params: {} },
      },
    },
    vendorCategory: {
      type: 'okapi',
      records: 'categories',
      path: 'vendor_category'
    },
    vendorContactCategory: {
      type: 'okapi',
      records: 'categories',
      path: 'contact_category'
    },
    dropdown: {
      initialValue: {
        paymentMethodDD: [
          { label: '-- Select --', value: '' },
          { label: 'Cash', value: 'Cash' },
          { label: 'Credit Card/P-Card', value: 'Credit Card P Card' },
          { label: 'EFT', value: 'EFT' },
          { label: 'Deposit Account', value: 'Deposit Account' },
          { label: 'Physical Check', value: 'Physical_check' },
          { label: 'Bank Draft', value: 'Bank Draft' },
          { label: 'Internal Transfer', value: 'Internal Transfer' },
          { label: 'Other', value: 'other' },
        ],
        vendorEdiCodeDD: [
          {
            'label': '-- Select --',
            'value': ''
          },
          { label: 'Code', value: 'code' },
        ],
        vendorEdiCodeTypeDD: [
          { 'label': '-- Select --', 'value': '' },
          { label: '31B', value: '31b' },
          { label: '014', value: '014' },
          { label: '091', value: '091' },
          { label: '092', value: '092' },
        ],
        libraryEDICodeDD: [
          { label: '-- Select --', value: '' },
          { label: 'Code', value: 'code' },
        ],
        libraryEdiCodeTypeDD: [
          { label: '-- Select --', value: '' },
          { label: '31B', value: '31b' },
          { label: '014', value: '014' },
          { label: '091', value: '091' },
          { label: '092', value: '092' },
        ],
        ftpDD: [
          { label: '-- Select --', value: '' },
          { label: 'SFTP', value: 'sftp' },
          { label: 'FTP', value: 'ftp' },
        ],
        transmissionModeDD: [
          { label: '-- Select --', value: '' },
          { label: 'ASCII', value: 'ascii' },
          { label: 'Binary', value: 'binary' },
        ],
        connectionModeDD: [
          { label: '-- Select --', value: '' },
          { label: 'Active', value: 'active' },
          { label: 'Passive', value: 'passive' },
        ],
        deliveryMethodDD: [
          { label: '-- Select --', value: '' },
          { label: 'Online', value: 'online' },
          { label: 'FTP', value: 'ftp' },
          { label: 'Email', value: 'email' },
          { label: 'Other', value: 'other' },
        ],
        formatDD: [
          { label: '-- Select --', value: '' },
          { label: 'Counter', value: 'Counter' },
          { label: 'Delimited', value: 'delimited' },
          { label: 'Excel', value: 'excel' },
          { label: 'PDF', value: 'pdf' },
          { label: 'ASCII', value: 'ascii' },
          { label: 'HTML', value: 'html' },
          { label: 'Other', value: 'other' },
        ],
        statusDD: [
          { label: '-- Select --', value: '' },
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' },
          { label: 'Pending', value: 'Pending' },
        ],
        categoriesDD: [
          { label: 'Accounting', value: 'Accounting' },
          { label: 'Books', value: 'Books' },
          { label: 'Customer Service', value: 'Customer Service' },
          { label: 'Databases', value: 'Databases' },
          { label: 'Ebooks', value: 'Ebooks' },
          { label: 'Econtent', value: 'Econtent' },
          { label: 'General', value: 'General' },
          { label: 'Journals', value: 'Journals' },
          { label: 'Licenses', value: 'Licenses' },
          { label: 'Primary', value: 'Primary' },
          { label: 'Sales', value: 'Sales' },
          { label: 'Serials', value: 'Serials' },
          { label: 'Returns', value: 'Returns' },
          { label: 'Shipments', value: 'Shipments' },
          { label: 'Payments', value: 'Payments' },
          { label: 'Other', value: 'Other' },
        ],
      }
    },
    CountryList: { initialValue: CountryList },
    LanguageList: { initialValue: LanguageList }
  });

  componentWillUpdate() {
    const langFilter = filterConfig.find(group => group.name === 'language');
    const countryFilter = filterConfig.find(group => group.name === 'country');
    if (langFilter.values.length === 0 && countryFilter.values.length === 0) {
      langFilter.values = LanguageList.map(rec => ({ name: rec.label, cql: rec.value }));
      countryFilter.values = CountryList.map(rec => ({ name: rec.label, cql: rec.value }));
      this.props.mutator.initializedFilterConfig.replace(true);
    }
  }

  create = (data) => {
    const { mutator } = this.props;
    // Convert time
    const time = FormatTime(data, 'post');
    if (time) { data.edi.edi_job.time = time; }

    mutator.records.POST(data).then(newLedger => {
      mutator.query.update({
        _path: `/vendors/view/${newLedger.id}`,
        layer: null
      });
    });
  }

  onChangeIndex = (e) => {
    const qindex = e.target.value;
    this.props.mutator.query.update({ qindex });
  }

  render() {
    const resultsFormatter = {
      'Name': data => _.get(data, ['name'], ''),
      'Code': data => _.get(data, ['code'], ''),
      'Description': data => _.get(data, ['description'], ''),
      'Vendor Status': data => _.toString(_.get(data, ['vendor_status'], ''))
    };
    const getRecords = (this.props.resources || {}).records || [];
    return (
      <div style={{ width: '100%' }} className={css.panepadding}>
        {
          getRecords &&
          <SearchAndSort
            packageInfo={packageInfo}
            objectName="vendors"
            baseRoute={packageInfo.stripes.route}
            filterConfig={filterConfig}
            visibleColumns={['Name', 'Code', 'Description', 'Vendor Status']}
            resultsFormatter={resultsFormatter}
            viewRecordComponent={ViewVendor}
            onCreate={this.create}
            editRecordComponent={PaneDetails}
            newRecordInitialValues={{}}
            initialResultCount={INITIAL_RESULT_COUNT}
            resultCountIncrement={RESULT_COUNT_INCREMENT}
            finishedResourceName="perms"
            viewRecordPerms="vendor.item.get"
            newRecordPerms="vendor.item.post,login.item.post"
            parentResources={this.props.resources}
            parentMutator={this.props.mutator}
            detailProps={this.props.stripes}
            stripes={this.stripes}
            // searchableIndexes={searchableIndexes}
            // selectedIndex={_.get(this.props.resources.query, 'qindex')}
            // searchableIndexesPlaceholder={null}
            // onChangeIndex={this.onChangeIndex}
          />
        }
      </div>
    );
  }
}

export default Main;
