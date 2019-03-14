import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

const Filters = () => {
  return [
    {
      label: <FormattedMessage id="ui-vendors.filterConfig.vendorStatus" />,
      name: 'vendor_status',
      cql: 'vendor_status',
      values: [
        <FormattedMessage id="ui-vendors.filterConfig.vendorStatus.active" />,
        <FormattedMessage id="ui-vendors.filterConfig.vendorStatus.inactive" />,
        <FormattedMessage id="ui-vendors.filterConfig.vendorStatus.pending" />
      ]
    },
    {
      label: 'Address category',
      name: 'category',
      cql: 'addresses',
      values: ['Accounting', 'Books', 'Customer Service', 'Databases', 'Ebooks', 'Econtent', 'General', 'Journals', 'Licenses', 'Primary', 'Sales', 'Serials', 'Returns', 'Shipments', 'Payments', 'Technical Support', 'Other']
    },
    {
      label: 'Contact people category',
      name: 'category',
      cql: 'contacts',
      values: ['Accounting', 'Books', 'Customer Service', 'Databases', 'Ebooks', 'Econtent', 'General', 'Journals', 'Licenses', 'Primary', 'Sales', 'Serials', 'Returns', 'Shipments', 'Payments', 'Technical Support', 'Other']
    },
    {
      label: 'Country',
      name: 'country',
      cql: 'addresses',
      values: []
    },
    {
      label: 'Languages',
      name: 'language',
      cql: 'language',
      values: []
    },
    {
      label: 'Payment method',
      name: 'payment_method',
      cql: 'payment_method',
      values: ['Cash', 'Credit Card/P-Card', 'EFT', 'Deposit Account']
    },
    {
      label: 'Stats available',
      name: 'available',
      cql: 'interfaces',
      values: [
        { name: 'Yes', cql: 'true' },
        { name: 'No', cql: 'false' }
      ]
    }
  ];
};

const SearchableIndexes = [
  { label: 'All', value: 'all', makeQuery: term => `(name="${term}*" or code="${term}*" or language="${term}*" or aliases="${term}*" or erp_code="${term}*" or tax_id="${term}*" or interfaces="${term}*" or contacts="${term}*")` },
  { label: 'Name', value: 'name', makeQuery: term => `(name="${term}*")` },
  { label: 'Contacts', value: 'contacts', makeQuery: term => `(contacts="${term}*")` },
  { label: 'Code', value: 'code', makeQuery: term => `(code="${term}*")` },
  { label: 'Language', value: 'language', makeQuery: term => `(language="${term}*")` },
  { label: 'Alias', value: 'aliases', makeQuery: term => `(aliases="${term}*")` },
  { label: 'Accounting code', value: 'erp_code', makeQuery: term => `(erp_code="${term}*")` },
  { label: 'Tax ID', value: 'tax_id', makeQuery: term => `(tax_id="${term}*")` },
  { label: 'Interfaces', value: 'interfaces', makeQuery: term => `(interfaces="${term}*")` }
];

export { Filters, SearchableIndexes };
