import { Component } from 'react';

class HandleErrors extends Component {
  static getDerivedStateFromProps(props, state) {
    const { names, updateSectionErrors, data } = props;
    const isAllFalse = item => item === false;

    if (names && names.length > 0) {
      // Declase error arrays
      const summaryArr = [];
      const addressArr = [];
      // Loop
      Object.keys(names).map(key => {
        const indexName = names[key];
        const input = props[`${indexName}`].input;
        const meta = props[`${indexName}`].meta;

        // Summary Error
        if (input.name === 'name' || input.name === 'code' || input.name === 'status') {
          summaryArr[key] = (meta.touched && meta.error) || false;
          data.summaryErr = !summaryArr.every(isAllFalse);
        }
        // Contact Info Error, loop throught each section
        const isContactSection = input.name === 'addresses' || input.name === 'phone_numbers' || input.name === 'email' || input.name === 'urls';
        if (isContactSection) {
          if ((meta.error) && meta.error.length > 0) {
            const addMetaErr = meta.error;
            Object.keys(addMetaErr).map(chkey => {
              addressArr[chkey] = addMetaErr[chkey] || false;
              return addressArr;
            });
          }
          data.contactInfoErr = !addressArr.every(isAllFalse) || addressArr.length > 0;
        }
        // Contact People, Agreements, Accounts Error
        if (input.name === 'contacts') data.contactPeopleErr = ((meta.error) && meta.error.length > 0) || false;
        if (input.name === 'agreements') data.agreementsErr = ((meta.error) && meta.error.length > 0) || false;
        if (input.name === 'accounts') data.accountsErr = ((meta.error) && meta.error.length > 0) || false;
        // Return data
        return data;
      });
    }
    // Update state
    if (data !== state) {
      updateSectionErrors(data);
      return { ...data };
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return false;
  }
}

export default HandleErrors;
