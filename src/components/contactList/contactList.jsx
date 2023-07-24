import React, { useState } from 'react';
import css from './contactList.module.css';
import PropTypes from 'prop-types';

const ContactsList = ({ contacts, deleteContact }) => {
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };
  const viewContacts = () => {
    if (filter.length === 0) {
      return contacts;
    }
    return contacts.filter(
      contact => contact.name.toLowerCase().indexOf(filter) >= 0
    );
  };

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
              value={filter}
              onChange={handleChange}
            />
          </label>
        </form>
      </div>
      <ol>
        {viewContacts().map(({ id, name, number }) => (
          <li key={id} className={css.listItem}>
            {name}: {number}
            <button onClick={() => deleteContact(id)} className={css.deleteBtn}>
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};
ContactsList.propTypes = {
  filter: PropTypes.string,
};
export default ContactsList;
