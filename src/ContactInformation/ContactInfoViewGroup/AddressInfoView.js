import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@folio/stripes/components';
import { AddressView } from '@folio/stripes/smart-components';
import css from '../ContactInformationView.css';
import CatIDToLabel from '../../Utils/CatIDToLabel';
import { FormattedMessage } from 'react-intl';

class AddressInfoView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.getAddress = this.getAddress.bind(this);
  }

  getAddress(val, key) {
    const { dropdownVendorCategories } = this.props;
    const newVal = Object.assign({}, val);
    newVal.categories = CatIDToLabel(val.categories, dropdownVendorCategories) || '';

    const visibleFields = [
      'addressLine1',
      'addressLine2',
      'city',
      'stateRegion',
      'zipCode',
      'country',
      'categories'
    ];

    const labelMap = {
      addressLine1: <FormattedMessage id="ui-vendors.data.contactTypes.addressLine1" />,
      addressLine2: <FormattedMessage id="ui-vendors.data.contactTypes.addressLine2" />,
      stateRegion: <FormattedMessage id="ui-vendors.data.contactTypes.stateProviceOrRegion" />,
      zipCode: <FormattedMessage id="ui-vendors.data.contactTypes.zipOrPostalCode" />,
      country: <FormattedMessage id="ui-vendors.data.contactTypes.country" />,
      categories: <FormattedMessage id="ui-vendors.data.contactTypes.categories" />
    }

    return (
      <Row key={key}>
        <Col xs={12}>
          <AddressView addressObject={newVal} visibleFields={visibleFields} labelMap={labelMap} />
        </Col>
      </Row>
    );
  }

  render() {
    const { dataVal } = this.props;
    return (
      <Col xs={12} className={css.rowHeader}>
        <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.data.contactTypes.address" />}</div>
        {dataVal.map(this.getAddress)}
      </Col>
    );
  }
}

export default AddressInfoView;
