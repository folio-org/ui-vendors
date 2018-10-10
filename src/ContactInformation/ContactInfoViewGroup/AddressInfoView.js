import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import { AddressView } from '@folio/stripes/smart-components';
import css from '../ContactInformationView.css';
import parseCategories from '../../Utils/Category';

class AddressInfoView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownCategories: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.getAddress = this.getAddress.bind(this);
  }

  getAddress(val, key) {
    const rowCount = (this.props.dataVal.length - 1) !== key;
    const categories = val.categories && this.props.dropdownCategories ? parseCategories(val.categories, this.props.dropdownCategories) : null;
    const addresses = () => {
      if (key >= 1) return val.address;
      val.address.primaryAddress = true;
      return val.address;
    };

    const visibleFields = [
      'addressLine1',
      'addressLine2',
      'city',
      'stateRegion',
      'zipCode',
      'country',
    ];

    return (
      <Row key={key}>
        <Col xs={12}>
          <AddressView addressObject={addresses()} visibleFields={visibleFields} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        {rowCount &&
          <div style={{ width: '100%' }}>
            <hr />
          </div>
        }
      </Row>
    );
  }

  render() {
    const { dataVal } = this.props;
    return (
      <Col xs={12} className={css.rowHeader}>
        <div className={css.subHeadings}>Address</div>
        {dataVal.map(this.getAddress)}
      </Col>
    );
  }
}

export default AddressInfoView;
