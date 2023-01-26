import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { login, register } from '../utils/data';

// const FormInput = ({ handler, isRegisterPage, data }) => {
const FormInput = ({ handler, data }) => {
  // const { formData, handler, isRegisterPage } = formInputProps;
  // const { data } = formData;
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // if (isRegisterPage) {
    //   const { error, data } = await login({ email: form.email, password: form.password });

    //   if (!error) {
    //     loginSuccess(data);
    //   }
    // } else {

    // }
    // handler(...form);
    handler(form);
    // isRegisterPage
    //   ? handler({
    //       name: form.name,
    //       email: form.email,
    //       password: form.password,
    //     })
    // : handler({ email: form.email, password: form.password });
    // : handler(form);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      // className={isRegisterPage ? 'input-register' : 'input-login'}
      className={data.formClassname}
    >
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
      {/* {isRegisterPage && (
        <>
          <label>Nama</label>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            // value={nama}
            onChange={(e) => handleChange(e)}
          />
        </>
      )}
      <label>Email</label>
      <input
        name="email"
        type="email"
        placeholder="Email"
        // value={email}
        onChange={(e) => handleChange(e)}
      />
      <label>Password</label>
      <input
        name="password"
        type="password"
        placeholder="Password"
        // value={password}
        onChange={(e) => handleChange(e)}
      /> */}
      <button>{data.btnLabel}</button>
    </form>
  );
};

FormInput.propTypes = {
  handler: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default FormInput;
