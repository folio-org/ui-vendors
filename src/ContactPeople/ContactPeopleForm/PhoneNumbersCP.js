import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TetherComponent from 'react-tether';
import { Field } from 'redux-form';
import { MultiSelection, Row, Col, Select, TextField } from '@folio/stripes/components';
import { Required } from '../../Utils/Validate';

class PhoneNumbersCP extends Component {
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
    isOpen: PropTypes.bool.isRequired,
    onPhoneInputChange: PropTypes.func.isRequired,
    onPhoneInputClear: PropTypes.func.isRequired,
    onPhoneClickItem: PropTypes.func.isRequired,
    phoneFilteredCollection: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  constructor(props) {
    super(props);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  onChangeSelect = (e, elem, propertyName) => {
    const { dispatch, change } = this.props;
    dispatch(change(`${elem}.${propertyName}`, e));
  }

  renderItems = () => {
    const { phoneFilteredCollection, name, onPhoneClickItem } = this.props;
    const listItems = phoneFilteredCollection.map((item, i) => {
      return (
        <div key={i}>
          <div style={styles.inlineButton} onClick={(e) => onPhoneClickItem(name, item)}>
            {item.phone_number.phone_number}
          </div>
        </div>
      );
    });

    return (
      <div>
        {listItems}
        <hr />
      </div>
    );
  }

  // For Multi dropdown
  toString = (option) => option;
  formatter = ({ option }) => <div>{option}</div>;
  filterItems = (filterText, list) => {
    const filterRegExp = new RegExp(`^${filterText}`, 'i');
    const renderedItems = filterText ? list.filter(item => item.search(filterRegExp) !== -1) : list;
    return { renderedItems };
  };

  render() {
    const { name, dropdownCategories, dropdownLanguages, dropdownPhoneType, onPhoneInputChange, onPhoneInputClear, isOpen } = this.props;
    const constraints = [{
      to: 'window',
      attachment: 'together',
    },
    {
      to: 'scrollParent',
      pin: false
    }];

    return (
      <Row>
        <Col xs={12} md={3}>
          <TetherComponent
            attachment="top left"
            targetAttachment="bottom left"
            constraints={constraints}
          >
            <div>
              <Field onChange={onPhoneInputChange} onClearField={onPhoneInputClear} label="Phone Number*" name={`${name}.phone_number.phone_number`} id={`${name}.phone_number.phone_number`} component={TextField} fullWidth />
            </div>
            {
              isOpen && (
              <div style={styles.dropdown}>
                <span>
                  {this.renderItems()}
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
      </Row>
    );
  }
}

const styles = {
  dropdown: {
    background: 'white',
    border: '1px solid lightGrey',
    padding: '2px',
    width: '200px'
  },
  inlineButton: {
    cursor: 'pointer'
  }
};

export default PhoneNumbersCP;
