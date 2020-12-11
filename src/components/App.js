import React, { Component } from 'react';
import shortid from 'shortid';
import { CSSTransition } from 'react-transition-group';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/Contactform';
import Filter from './Filter/Filter';
import styles from './App.module.css';
import pop from '../transitions/pop.module.css';
import slide from '../transitions/slide.module.css';
import Notification from './Notification/Notification';


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    isVisible: false,
    isNotification: false,
    isFilter: false,
  };

  componentDidMount() {
    this.setState({ isVisible: true, isFilter: true });
    const storage = localStorage.getItem('contacts');
    if (storage !== null) {
      this.setState({ contacts: JSON.parse(storage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  filterContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };
  

  setFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  addItem = ({ name, number }) => {
    const { contacts } = this.state;
    let contactExist = contacts.find(item => item.name === name);

    if (contacts.length > 0 && contactExist) {
      this.setState({ isNotification: true });
      this.showNotification();
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };
      
  showNotification = () =>
  setTimeout(() => this.setState({ isNotification: false }), 2000);

  deleteItem = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() { 
    const { contacts, filter, isVisible, isNotification, isFilter } = this.state;
    const filtratedContacts = this.filterContacts(contacts, filter);
    return (
      <div className={styles.container}>
       <CSSTransition
          in={isNotification}
          timeout={500}
          classNames={slide}
          unmountOnExit
        >
        <Notification />
        </CSSTransition>
        <CSSTransition
          in={isVisible}
          timeout={500}
          classNames={slide}
          unmountOnExit
        >
        <h1>Phonebook</h1>
        </CSSTransition>
      
        <ContactForm onAddItem={this.addItem} />
        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <CSSTransition
            in={isFilter}
            timeout={250}
            unmountOnExit
            classNames={pop}
          >
        <Filter onSetFilter={this.setFilter} value={this.state.filter} />
        </CSSTransition> )}
        <ContactList items={filtratedContacts} onDelete={this.deleteItem} />
      </div>
    );
  };
}

export default App;