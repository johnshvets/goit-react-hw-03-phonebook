import { Component } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";
import s from "./App.module.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, { contacts }) {
    const newContacts = this.state.contacts;

    if (newContacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(newContacts));
    }
  }

  onContactFormSubmit = (contact) => {
    const { contacts } = this.state;

    this.setState({ contacts: [...contacts, contact] });
  };

  filterContactsByKeyWord = () => {
    const { contacts, filter } = this.state;
    const keyWord = filter.toLowerCase();

    return contacts.filter(({ name }) => name.toLowerCase().includes(keyWord));
  };

  onFilterContactsChange = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  deleteContact = ({ target }) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== target.id),
    }));
  };

  render() {
    const { filter } = this.state;
    const contacts = this.filterContactsByKeyWord();

    return (
      <div className={s.app}>
        <h1 className={s.logo}>Phonebook</h1>
        <div className={s.container}>
          <ContactForm
            contacts={contacts}
            onSubmit={this.onContactFormSubmit}
          />
          <div className={s.contactsContainer}>
            <h2 className={s.title}>Contacts</h2>
            <Filter value={filter} onChange={this.onFilterContactsChange} />
            <ContactList contacts={contacts} handleClick={this.deleteContact} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
