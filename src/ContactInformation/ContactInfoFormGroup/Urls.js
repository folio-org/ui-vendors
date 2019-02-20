import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';
import { Row, Col, Button } from '@folio/stripes/components';
import css from '../ContactInfoFormGroup.css';
import { UrlsMF } from '../../MultiForms';

class Url extends Component {
  static propTypes = {
    fields: PropTypes.object,
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    contactPeopleForm: PropTypes.string,
  };

  componentDidMount() {
    const { stripes: { store }, dispatch, change } = this.props;
    console.log(this.props);
    const formValues = getFormValues('FormVendor')(store.getState());
    const json = [{
      'categories': [],
      'description': 'testing',
      'isPrimary': true,
      'language': 'fr',
      'notes': 'this is replacing data inside redux',
      'value': 'https://www.test.com'
    }];
    dispatch(change('urls', json));
    // console.log(formValues.urls);
    // const resourceCategories = ((parentResources.vendorCategory || {}).records || []);
    // // Updated Categories
    // if (data && !_.isEmpty(data.urls)) {
    //   // Delete
    //   const urlsCat = CatIDToObject(data.urls, resourceCategories);
    //   data = urlsCat;
    // }
    // concdsole.log(data);
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
    console.log(formValues.urls);

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
