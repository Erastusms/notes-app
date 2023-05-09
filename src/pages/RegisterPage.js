import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { register } from '../utils/data';
import { inputEmail, inputName, inputPassword } from '../helpers';

const RegisterPage = () => {
  const navigate = useNavigate();
  const onRegisterHandler = async ({ name, email, password }) => {
    const { error } = await register({ name, email, password });
    if (!error) navigate('/notes-app');
  };

  const registerMapping = {
    formClassname: 'input-register',
    formInput: [inputName, inputEmail, inputPassword],
    btnLabel: 'Daftar'
  };

  return (
    <section className="register-page">
      <h2>Isi data diri anda</h2>
      <FormInput
        handler={onRegisterHandler}
        data={registerMapping}
        key={registerMapping.className}
      />
      <p>
        Kembali ke <Link to="/notes-app">Masuk</Link>
      </p>
    </section>
  );
};

export default RegisterPage;
