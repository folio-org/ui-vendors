import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from '../ContactInformationView.css';
import parseCategories from '../../Utils/Category';
import LanguageLookup from '../../Utils/LanguageLookup';

class ContactInformationView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownCategories: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.getPhoneNumbers = this.getPhoneNumbers.bind(this);
  }

  getPhoneNumbers(val, key) {
    const rowCount = (this.props.dataVal.length - 1) !== key;
    const categories = val.categories && this.props.dropdownCategories ? parseCategories(val.categories, this.props.dropdownCategories) : null;
    const phonenumber = `${_.get(val, 'phone_number.country_code', '')} ${_.get(val, 'phone_number.area_code', '')} ${_.get(val, 'phone_number.phone_number', '')}`;
    const getLanguage = LanguageLookup(_.get(val, 'language', ''));

    return (
      <Row key={key}>
        <Col xs={5}>
          <KeyValue label="Phone Number" value={phonenumber} />
        </Col>
        <Col xs={4}>
          <KeyValue label="Categories" value={categories} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Language" value={getLanguage} />
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
        <div className={css.subHeadings}>Phone Numbers</div>
        { dataVal.map(this.getPhoneNumbers) }
      </Col>
    );
  }
}

export default ContactInformationView;
