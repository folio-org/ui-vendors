import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Row, Col, KeyValue } from '@folio/stripes/components';
import css from '../ContactInformationView.css';
import LanguageLookup from '../../Utils/LanguageLookup';
import parseCategories from '../../Utils/Category';

class ContactInformationView extends React.Component {
  static propTypes = {
    dataVal: PropTypes.arrayOf(PropTypes.object),
    dropdownCategories: PropTypes.arrayOf(PropTypes.object)
  };

  constructor(props) {
    super(props);
    this.getUrls = this.getUrls.bind(this);
  }

  getUrls(val, key) {
    const rowCount = this.props.dataVal.length - 1 !== key;
    const categories = val.categories && this.props.dropdownCategories ? parseCategories(val.categories, this.props.dropdownCategories) : null;
    const url = () => {
      const urlDescription = `${_.get(val, 'url.description', '')}`;
      if (urlDescription.trim().length >= 1) {
        return `${_.get(val, 'url.value', '')} - ${urlDescription}`;
      } else {
        return `${_.get(val, 'url.value', '')}`;
      }
    };
    const getLanguage = LanguageLookup(_.get(val, 'language', ''));

    return (
      <Row key={key}>
        <Col xs={5}>
          <KeyValue label="Url" value={url()} />
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
        <div className={css.subHeadings}>Url(s)</div>
        {dataVal.map(this.getUrls)}
      </Col>
    );
  }
}

export default ContactInformationView;
