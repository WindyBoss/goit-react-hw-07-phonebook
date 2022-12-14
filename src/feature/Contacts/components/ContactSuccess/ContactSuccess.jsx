import { useState } from 'react';
import { useSelector } from 'react-redux';

import { useModal } from 'hooks/useModal';

import { Button } from '@mui/material';

import { MainHeaderContainer } from './ContactSuccess.styled';
import Modal from 'components/Modal';

import ContactFilter from '../ContactFilter';
import ContactList from '../ContactList';
import ContactForm from '../ContactForm';
import ContactProfile from '../ContactProfile';

export default function ContactSuccess({ contacts }) {
  const [chosenContact, setChosenContact] = useState(null);
  const [showModal, toggleModal] = useModal(false);

  const { filter } = useSelector(state => state.filter);

  function getContacts() {
    if (contacts.length === 0) {
      return [];
    }

    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  }

  function chooseContact(contactId) {
    setChosenContact(contacts.filter(contact => contact.id === contactId));
  }

  return (
    <>
      <MainHeaderContainer>
        <h2>Phonebook</h2>
        <Button variant="contained" onClick={toggleModal}>
          Add Contact
        </Button>
      </MainHeaderContainer>
      <div>
        {showModal && (
          <Modal onClose={toggleModal}>
            <ContactForm onClick={toggleModal} contacts={contacts}/>
          </Modal>
        )}

        <div style={{ maxWidth: '300px' }}>
          <ContactFilter />
          <ContactList onChoose={chooseContact} contacts={getContacts()} />
        </div>
        {chosenContact && <ContactProfile contact={chosenContact} />}
      </div>
    </>
  );
}
