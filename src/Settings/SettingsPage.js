import React, { Component } from 'react';
import { Settings } from '@folio/stripes/smart-components';
import CategorySettings from './CategorySettings';

class SettingsPage extends Component{
  constructor(props) {
    super(props);

    this.pages = [
      {
        component: CategorySettings,
        label: 'Categories',
        route: 'category',
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