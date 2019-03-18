import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from '../ContactInformationView.css';
import LanguageLookup from '../../Utils/LanguageLookup';
import CatIDToLabel from '../../Utils/CatIDToLabel';
import { FormattedMessage } from 'react-intl';

class ContactInformationView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.getEmail = this.getEmail.bind(this);
  }

  getEmail(val, key) {
    const { dropdownVendorCategories } = this.props;
    const rowCount = (this.props.dataVal.length - 1) !== key;
    const categories = CatIDToLabel(val.categories, dropdownVendorCategories) || '';
    const getLanguage = LanguageLookup(get(val, 'language', ''));

    return (
      <Row key={key}>
        <Col xs={5}>
          <KeyValue label={<FormattedMessage id="ui-vendors.contactInfo.email" />} value={`${get(val, 'value', '')}`} />
        </Col>
        <Col xs={3}>
          <KeyValue label={<FormattedMessage id="ui-vendors.contactInfo.language" />} value={getLanguage} />
        </Col>
        <Col xs={4}>
          <KeyValue label={<FormattedMessage id="ui-vendors.contactInfo.categories" />} value={categories} />
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
        <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactInfo.emailAddress" />}</div>
        {dataVal.map(this.getEmail)}
      </Col>
    );
  }
}

export default ContactInformationView;
