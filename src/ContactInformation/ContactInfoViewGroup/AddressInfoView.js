import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@folio/stripes/components';
import { AddressView } from '@folio/stripes/smart-components';
import css from '../ContactInformationView.css';

class AddressInfoView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.getAddress = this.getAddress.bind(this);
  }

  getAddress(val, key) {
    const rowCount = (this.props.dataVal.length - 1) !== key;
    const categories = val.categories.join(', ') || null;
    const addresses = () => {
      if (key >= 1) return val.address;
      val.address.primaryAddress = true;
      val.address.categories = categories;
      return val.address;
    };

    const visibleFields = [
      'addressLine1',
      'addressLine2',
      'city',
      'stateRegion',
      'zipCode',
      'country',
      'categories'
    ];

    return (
      <Row key={key}>
        <Col xs={12}>
          <AddressView addressObject={addresses()} visibleFields={visibleFields} />
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
