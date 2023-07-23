import React, { Component } from 'react';
import ContactAdd from 'components/contactAdd/contactAdd';
import ContactsList from 'components/contactList/contactList';
import { nanoid } from 'nanoid';
import css from './phonebook.module.css';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

class Phonebook extends Component {
  state = {
    contacts: [],
  };

  addContact = newContact => {
    let existingContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existingContact) {
      return Notiflix.Notify.failure(
        `${newContact.name} is already in contacts`
      );
    }
    newContact.id = nanoid();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  deleteContact = index => {
    this.setState(prevState => {
      const updatedContacts = [...prevState.contacts];
      updatedContacts.splice(index, 1);
      return { contacts: updatedContacts };
    });
  };
  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }
  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
  render() {
    return (
      <div>
        <div className={css.phonebook}>
          <h1 className={css.header}>Phonebook</h1>
          <ContactAdd addContact={this.addContact} />
        </div>
        <div className={css.contacts}>
          <h2 className={css.header}>Contacts</h2>
          <ContactsList
            contacts={this.state.contacts}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
Phonebook.propTypes = {
  contacts: PropTypes.array,
};
export default Phonebook;
