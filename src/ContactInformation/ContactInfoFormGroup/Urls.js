import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { isEmpty } from 'lodash';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import { UrlsMF } from '../../MultiForms';
import CatIDToObject from '../../Utils/CatIDToObject';

class Url extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  componentDidMount() {
    const { stripes: { store }, dispatch, change, dropdownVendorCategories } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    if (formValues && !isEmpty(formValues.urls)) {
      const categories = CatIDToObject(formValues.urls, dropdownVendorCategories);
      dispatch(change('urls', categories));
    }
  }

  renderSubUrl = (elem, index, fields) => {
    return (
      <Row key={index} className={css.panels}>
        <UrlsMF
          index={index}
          fields={fields}
          name={`${elem}`}
          id={`${elem}`}
          {...this.props}
        />
        <Col xs={12} md={3} mdOffset={9} style={{ textAlign: 'right' }}>
          <Button onClick={() => fields.remove(index)} buttonStyle="danger">
            Remove
          </Button>
        </Col>
      </Row>
    );
  }

  render() {
    const { fields, stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    console.log(formValues);
    return (
      <Row>
        <Col xs={12}>
          <div className={css.subHeadings}>URLs</div>
          {fields.length === 0 &&
            <div><em>- Please add URL -</em></div>
          }
        </Col>
        <Col xs={12}>
          {fields.map(this.renderSubUrl)}
        </Col>
        <Col xs={12} style={{ paddingTop: '10px' }}>
          <Button onClick={() => fields.push({})}>+ Add URL</Button>
        </Col>
      </Row>
    );
  }
}

export default Url;
