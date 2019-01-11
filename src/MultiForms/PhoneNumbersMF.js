import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TetherComponent from 'react-tether';
import { Field, getFormValues } from 'redux-form';
import { MultiSelection, Col, Select, TextField } from '@folio/stripes/components';
import css from './css/MultiForms.css';
import { Required } from '../Utils/Validate';

class PhoneNumbersMF extends Component {
  static propTypes = {
    dropdownCategories: PropTypes.arrayOf(PropTypes.string),
    dropdownLanguages: PropTypes.arrayOf(PropTypes.object),
    dropdownPhoneType: PropTypes.arrayOf(PropTypes.object),
    stripes: PropTypes.shape({
      store: PropTypes.object
    }),
    dispatch: PropTypes.func,
    change: PropTypes.func,
    name: PropTypes.string,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { stripes: { store } } = nextProps;
    const arrPhones = [];
    const formValues = getFormValues('FormVendor')(store.getState());
    // Get Phone Number
    const getPhoneNum = () => {
      const num = formValues.phone_numbers;
      if (!num) return false;
      return num.map((val) => arrPhones.push(val));
    };
    getPhoneNum();
    // Get Primary Phone Number
    const getPrimary = () => {
      const num = formValues.contacts;
      if (!num) return false;
      num.map((val) => {
        const primaryPhoneNumber = ((val.contact_person || {}).primary_phone_number || {});
        if (!_.isEmpty(primaryPhoneNumber)) return false;
        return arrPhones.push(primaryPhoneNumber);
      });
      return false;
    };
    getPrimary();
    // Get Additional Phone Number
    const getAdditional = () => {
      const num = formValues.contacts;
      if (!num) return false;
      num.map((val) => {
        const contactPerson = val.contact_person;
        if (!contactPerson || contactPerson <= 0) return false;
        const phoneNums = contactPerson.phone_numbers;
        if (!phoneNums || phoneNums <= 0) return false;
        contactPerson.phone_numbers.map((item) => arrPhones.push(item));
        return false;
      });
      return false;
    };
    getAdditional();
    // Update state
    if (!_.isEqual(arrPhones, prevState.itemCollection)) {
      return { itemCollection: arrPhones };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currWidth: 100,
      filteredCollection: []
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputClear = this.onInputClear.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.fieldRef = React.createRef();
    return false;
  }

  componentDidMount() {
    const { currWidth } = this.state;
    const { clientWidth } = this.fieldRef.current;
    if (clientWidth !== currWidth) {
      return this.setState({ currWidth: clientWidth });
    }
    return false;
  }

  // Multi dropdown
  onChangeSelect = (e, elem, propertyName) => {
    const { dispatch, change } = this.props;
    return dispatch(change(`${elem}.${propertyName}`, e));
  }

  selectedValues = (index, fields, propertyName) => {
    const { stripes: { store } } = this.props;
    const formValues = getFormValues('FormVendor')(store.getState());
    const currValues = formValues[fields.name][index][propertyName] || null;
    return currValues;
  }

  toString = (option) => option;
  formatter = ({ option }) => <div>{option}</div>;
  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;

    return { renderedItems };
  };
  // End Multi dropdown

  // Input Actions
  // variables and prop names needs to be change for other use
  onInputChange(obj, e) {
    const { isOpen, itemCollection } = this.state;
    if (!_.isEmpty(itemCollection) && (e.trim().length >= 1)) {
      const num = itemCollection;
      const objFiltered = _.filter(num, (o) => {
        const phoneNumber = ((o.phone_number || []).phone_number || []);
        if (!_.includes(phoneNumber, e)) return false;
        return o;
      });

      if (!_.isEmpty(objFiltered) && !isOpen) {
        return this.setState({ isOpen: true, filteredCollection: objFiltered });
      } else if (_.isEmpty(objFiltered) && isOpen) {
        return this.setState({ isOpen: false, filteredCollection: [] });
      }
      return false;
    }

    if (isOpen) this.setState({ isOpen: false, filteredCollection: [] });
    return false;
  }

  onInputClear() {
    const { isOpen } = this.state;
    if (isOpen) this.setState({ isOpen: false, filteredCollection: [] });
  }

  onClickItem(name, item) {
    const { isOpen } = this.state;
    const { dispatch, change } = this.props;
    dispatch(change(`${name}`, item));
    if (isOpen) this.setState({ isOpen: false, filteredCollection: [] });
    return false;
  }

  onKeyPressed = () => {
    return false;
  }

  renderItem = (name) => {
    const { filteredCollection } = this.state;
    const listItems = filteredCollection.map((item, i) => {
      return (
        <div key={i}>
          <div className={css.inlineButton} onClick={() => this.onClickItem(name, item)} onKeyPress={(e) => this.onKeyPressed(e)} role="presentation">
            {item.phone_number.phone_number}
          </div>
        </div>
      );
    });
    return (<div>{listItems}</div>);
  }
  // End Input Actions

  render() {
    const { isOpen, currWidth } = this.state;
    const {
      name,
      dropdownCategories,
      dropdownLanguages,
      dropdownPhoneType,
    } = this.props;
    const constraints = [{
      to: 'window',
      attachment: 'together',
    },
    {
      to: 'scrollParent',
      pin: false
    }];

    return (
      <Fragment>
        <Col xs={12} md={3}>
          <TetherComponent
            attachment="top left"
            targetAttachment="bottom left"
            constraints={constraints}
          >
            <div ref={this.fieldRef}>
              <Field
                onChange={this.onInputChange}
                onClearField={this.onInputClear}
                label="Phone Number*"
                name={`${name}.phone_number.phone_number`}
                id={`${name}.phone_number.phone_number`}
                component={TextField}
                validate={[Required]}
                fullWidth
              />
            </div>
            {
              isOpen && (
              <div className={css.dropdown} style={{ width:`${currWidth}px` }}>
                <span className={css.dropDownItem}>
                  {this.renderItem(name)}
                </span>
              </div>
              )
            }
          </TetherComponent>
        </Col>
        <Col xs={12} md={3}>
          <Field label="Type" name={`${name}.phone_number.type`} id={`${name}.phone_number.type`} component={Select} fullWidth dataOptions={dropdownPhoneType} />
        </Col>
        <Col xs={12} md={3}>
          <Field label="Default Language" name={`${name}.language`} id={`${name}.language`} component={Select} fullWidth dataOptions={dropdownLanguages} />
        </Col>
        <Col xs={12} md={3}>
          <Field
            component={MultiSelection}
            filter={this.filterItems}
            label="Categories"
            name={`${name}.categories`}
            dataOptions={dropdownCategories}
            onChange={(e) => this.onChangeSelect(e, name, 'categories')}
            style={{ height: '80px' }}
            itemToString={this.toString}
            formatter={this.formatter}
          />
        </Col>
      </Fragment>
    );
  }
}

export default PhoneNumbersMF;