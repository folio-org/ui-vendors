import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ControlledVocab } from '@folio/stripes/smart-components';
import { FormattedMessage } from 'react-intl';

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
    const columnMapping = { 
      value: <FormattedMessage id="ui-vendors.settings.name" />, 
      action: <FormattedMessage id="ui-vendors.settings.action" />
    }

    return (
      <this.connectedControlledVocab
        stripes={stripes}
        baseUrl="vendor-storage/categories"
        records="categories"
        label={<FormattedMessage id="ui-vendors.settings.categories" />}
        labelSingular="Category"
        objectLabel="Categories"
        visibleFields={['value']}
        columnMapping={columnMapping}
        hiddenFields={['lastUpdated', 'numberOfObjects']}
        nameKey="categories"
        id="categories"
        sortby="value"
      />
    );
  }
}

export default CategorySettings;
