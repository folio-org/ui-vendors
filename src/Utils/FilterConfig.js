const Filters = () => {
  return [
    {
      label: 'Vendor Status',
      name: 'vendor_status',
      cql: 'vendor_status',
      values: ['Active', 'Inactive', 'Pending']
    },
    {
      label: 'Address Category',
      name: 'category',
      cql: 'addresses',
      values: ['Accounting', 'Books', 'Customer Service', 'Databases', 'Ebooks', 'Econtent', 'General', 'Journals', 'Licenses', 'Primary', 'Sales', 'Serials', 'Returns', 'Shipments', 'Payments', 'Technical Support', 'Other']
    },
    {
      label: 'Contact People Category',
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
      label: 'Payment Method',
      name: 'payment_method',
      cql: 'payment_method',
      values: ['Cash', 'Credit Card/P-Card', 'EFT', 'Deposit Account']
    },
    {
      label: 'Stats Available',
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
  { label: 'Accounting Code', value: 'erp_code', makeQuery: term => `(erp_code="${term}*")` },
  { label: 'Tax ID', value: 'tax_id', makeQuery: term => `(tax_id="${term}*")` },
  { label: 'Interfaces', value: 'interfaces', makeQuery: term => `(interfaces="${term}*")` }
];

export { Filters, SearchableIndexes };
