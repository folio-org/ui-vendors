import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Field, FieldArray } from 'redux-form';
import uuid from 'uuid';

import Route from 'react-router-dom/Route';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import Button from '@folio/stripes-components/lib/Button';

import LanguageList from "../Utils/Languages";
import css from "./InterfaceView.css";

class AgreementsView extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    onCloseDetails: PropTypes.func.isRequired,
    parentMutator: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.getInterface = this.getInterface.bind(this);
  }

  render() {
    const { initialValues } = this.props;
    const dataVal = initialValues.interfaces.length >= 1 ? initialValues.interfaces : false;
    if (dataVal) {
      return (
        <div style={{ width: '100%' }} className={css.horizontalLine}>
          {dataVal.map(this.getInterface)}
        </div>
      );
    } else {
      return (
        <div>
          <p>-- No interface data available --</p>
        </div>
      )
    }
  }

  getInterface(val, key) {
    const rowCount = (this.props.initialValues.interfaces.length - 1) !== key ? true : false;
    return (
      <Row key={key}>
        <Col xs={3}>
          <KeyValue label="Name" value={_.get(val, ['name'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="URI" value={_.get(val, ['uri'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Username" value={_.get(val, ['username'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Password" value={_.get(val, ['password'], '')} />
        </Col>
        <Col xs={9}>
          <KeyValue label="Notes" value={_.get(val, ['notes'], '')} />
        </Col>
        <Col xs={12}>
          <h4 className={css.title}>Statistics</h4>
        </Col>          
        <Col xs={3}>
          <KeyValue label="Available" value={_.toString(_.get(val, ['available']))} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Delivery Method" value={_.get(val, ['delivery_method'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Statistics Format" value={_.get(val, ['statistics_format'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Locally Stored" value={_.get(val, ['locally_stored'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Online Location" value={_.get(val, ['online_location'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Statistics Notes" value={_.get(val, ['online_location'], '')} />
        </Col>
        {rowCount &&
          <div style={{ width: '100%' }}>
            <hr />
          </div>
        }
      </Row>
    )
  }
}

export default AgreementsView;