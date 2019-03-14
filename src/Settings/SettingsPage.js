import React, { Component } from 'react';
import { Settings } from '@folio/stripes/smart-components';
import CategorySettings from './CategorySettings';

class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.pages = [
      {
        route: 'category',
        label: 'Categories',
        component: CategorySettings,
        perm: 'settings.vendors.enabled'
      }
    ];
  }

  render() {
    return (
      <Settings {...this.props} pages={this.pages} paneTitle="Vendor Settings" />
    );
  }
}

export default SettingsPage;
