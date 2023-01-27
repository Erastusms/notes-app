import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ handler, data }) => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    handler(form);
  };

  return (
    <form onSubmit={onSubmitHandler} className={data.formClassname}>
      {data.formInput.map((input, index) => {
        const { inputLabel, inputName, inputType, inputPlaceHolder } = input;
        return (
          <div key={index}>
            <label>{inputLabel}</label>
            <input
              name={inputName}
              type={inputType}
              placeholder={inputPlaceHolder}
              onChange={(e) => handleChange(e)}
            />
          </div>
        );
      })}
      <button>{data.btnLabel}</button>
    </form>
  );
};

FormInput.propTypes = {
  handler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default FormInput;
