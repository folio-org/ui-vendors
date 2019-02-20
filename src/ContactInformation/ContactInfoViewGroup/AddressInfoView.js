import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
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
    const newVal = Object.assign({}, val);
    newVal.categories = !isEmpty(val.categories) ? val.categories.map((e) => e.label) : [];

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
          <AddressView addressObject={newVal} visibleFields={visibleFields} />
        </Col>
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
