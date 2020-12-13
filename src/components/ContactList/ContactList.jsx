import PropTypes from "prop-types";
import s from "./ContactList.module.css";

const ContactList = ({ contacts, handleClick }) => (
  <ul className={s.contactList}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={s.contact}>
        <h3 className={name}>Name: {name}</h3>
        <p className={number}>Number: {number}</p>
        <button
          type="button"
          id={id}
          onClick={handleClick}
          className={s.button}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;

ContactList.propTypes = {
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
  handleClick: PropTypes.func.isRequired,
};
