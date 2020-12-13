import PropTypes from "prop-types";
import s from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <div className={s.container}>
    <label>
      Find contacts by name:
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={s.input}
      />
    </label>
  </div>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
