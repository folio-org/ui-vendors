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

  printKeyValue(label, val, isRequire) {
    return (
      <KeyValue label={<FormattedMessage id={`ui-vendors.contactInfo.${label}`} />} value={val} required={isRequire} />
    );
  }

  getUrls(val, key) {
    const { dropdownVendorCategories } = this.props;
    const rowCount = this.props.dataVal.length - 1 !== key;
    const categories = CatIDToLabel(val.categories, dropdownVendorCategories) || '';
    const getLanguage = LanguageLookup(get(val, 'language', ''));

    return (
      <Row key={key}>
        <Col xs={5}>
          {this.printKeyValue('url', get(val, 'value', ''), false)}
        </Col>
        <Col xs={3}>
          {this.printKeyValue('language', getLanguage, false)}
        </Col>
        <Col xs={4}>
          {this.printKeyValue('categories', categories, false)}
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
        <div className={css.subHeadings}>{<FormattedMessage id="ui-vendors.contactInfo.urls" />}</div>
        {dataVal.map(this.getUrls)}
      </Col>
    );
  }
}

export default ContactInformationView;
