import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlledVocab } from '@folio/stripes/smart-components';

class CategorySettings extends Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.connectedControlledVocab = props.stripes.connect(ControlledVocab);
  }

  render() {
    const { stripes } = this.props;

    return (
      <this.connectedControlledVocab
        stripes={stripes}
        baseUrl="vendor-storage/categories"
        records="categories"
        label="Categories"
        labelSingular="Category"
        objectLabel="Categories"
        visibleFields={['value']}
        columnMapping={{ value: 'Name' }}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        nameKey="categories"
        id="categories"
        sortby="value"
      />
    );
  }
}

export default CategorySettings;
