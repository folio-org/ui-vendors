import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from '../ContactInformationView.css';
import LanguageLookup from '../../Utils/LanguageLookup';
import CatIDToLabel from '../../Utils/CatIDToLabel';

class ContactInformationView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownVendorCategories: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.getUrls = this.getUrls.bind(this);
  }

  printKeyValue(label, val, colNum, isRequire) {
    return (
      <Col xs={colNum}>
        <KeyValue label={<FormattedMessage id={`ui-vendors.contactInfo.${label}`} />} value={val} required={isRequire} />
      </Col>
    );
  }

  getUrls(val, key) {
    const { dropdownVendorCategories } = this.props;
    const rowCount = this.props.dataVal.length - 1 !== key;
    const categories = CatIDToLabel(val.categories, dropdownVendorCategories) || '';
    const getLanguage = LanguageLookup(get(val, 'language', ''));

    return (
      <Row key={key}>
        {this.printKeyValue('url', get(val, 'value', ''), 5, false)}
        {this.printKeyValue('language', getLanguage, 3, false)}
        {this.printKeyValue('categories', categories, 4, false)}
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
        <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactInfo.urls" />}</div>
        {dataVal.map(this.getUrls)}
      </Col>
    );
  }
}

export default ContactInformationView;
