import React, { Component } from 'react';
import css from './contactAdd.module.css';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  contacts: [],
  name: '',
  number: '',
};
class ContactAdd extends Component {
  state = {
    id: '',
    name: '',
    number: '',
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addContact(this.state);
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={css.sectionInput}>
          <label className={css.labelInput}>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              placeholder="Name"
              pattern="^[a-zA-Za]+(([' \-][a-zA-Za])?[a-zA-Za]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              value={this.state.name}
              required
              onChange={this.handleChange}
            />
          </label>
          <label className={css.labelInput}>
            Number
            <input
              className={css.input}
              type="tel"
              name="number"
              placeholder="Number"
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              value={this.state.number}
              required
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" className={css.submitBtn}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
ContactAdd.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.number,
};
export default ContactAdd;
