import React, { useState, useEffect } from 'react';
import ContactAdd from 'components/contactAdd/contactAdd';
import ContactsList from 'components/contactList/contactList';
import { nanoid } from 'nanoid';
import css from './phonebook.module.css';
import Notiflix from 'notiflix';

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    let existingContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (existingContact) {
      return Notiflix.Notify.failure(
        `${newContact.name} is already in contacts`
      );
    }
    newContact.id = nanoid();
    setContacts(prevState => [...prevState, newContact]);
  };
  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div>
      <div className={css.phonebook}>
        <h1 className={css.header}>Phonebook</h1>
        <ContactAdd addContact={addContact} />
      </div>
      <div className={css.contacts}>
        <h2 className={css.header}>Contacts</h2>
        <ContactsList contacts={contacts} deleteContact={deleteContact} />
      </div>
    </div>
  );
};
export default Phonebook;
