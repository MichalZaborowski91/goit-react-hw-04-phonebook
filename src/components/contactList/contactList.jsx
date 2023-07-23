import React, { Component } from 'react';
import css from './contactList.module.css';
import PropTypes from 'prop-types';

class ContactsList extends Component {
  state = {
    filter: '',
  };
  handleChange = e => {
    const { value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      filter: value.toLowerCase(),
    }));
  };
  viewContacts = () => {
    const filter = this.state.filter;
    const contacts = this.props.contacts;
    if (filter.length === 0) {
      return contacts;
    }
    return contacts.filter(
      contact => contact.name.toLowerCase().indexOf(filter) >= 0
    );
  };
  render() {
    return (
      <div>
        <div>
          <form className={css.searchNameBox}>
            <label className={css.labelInput}>
              Find contacts by name
              <input
                className={css.input}
                type="text"
                name="filter"
                placeholder="Search by name"
                title="Search contacts by name, only small letters by default"
                value={this.state.filter}
                onChange={this.handleChange}
              />
            </label>
          </form>
        </div>
        <ol>
          {this.viewContacts().map(({ id, name, number }, index) => (
            <li key={id} className={css.listItem}>
              {name}: {number}
              <button
                onClick={() => this.props.deleteContact(index)}
                className={css.deleteBtn}
              >
                Delete
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
ContactsList.propTypes = {
  filter: PropTypes.string,
};
export default ContactsList;
