import { Component } from "react";
import { v4 as makeUniqId } from "uuid";
import PropTypes from "prop-types";
import s from "./ContactForm.module.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const isNotUniqContactName = this.matchContact(name);

    if (isNotUniqContactName) {
      return alert(`${name} is alredy in contacts!`);
    } else if (name.trim() && number.trim()) {
      const id = makeUniqId();
      const contact = { name, number, id };

      this.props.onSubmit(contact);
      this.reset();
    }
  };

  matchContact = (contact) => {
    const { contacts } = this.props;
    const contactNames = contacts.reduce((acc, { name }) => [...acc, name], []);

    return contactNames.includes(contact);
  };

  reset = () => this.setState({ name: "", number: "" });

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label htmlFor="name" className={s.label}>
          Name
        </label>
        <input
          type="text"
          placeholder="Type name!"
          name="name"
          value={name}
          onChange={this.handleChange}
          className={s.input}
          id="name"
        />

        <label htmlFor="number" className={s.label}>
          Number
        </label>
        <input
          type="tel"
          placeholder="Type number!"
          name="number"
          value={number}
          onChange={this.handleChange}
          className={s.input}
          id="number"
        />

        <button type="submit" className={s.button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  contact: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ),
  ]),
  onSubmit: PropTypes.func.isRequired,
};
