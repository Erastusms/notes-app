import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { login } from '../utils/data';
import { inputEmail, inputPassword } from '../helpers';

const LoginPage = ({ loginSuccess }) => {
  const onLoginHandler = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) loginSuccess(data);
  };

  const loginMapping = {
    formClassname: 'input-login',
    formInput: [inputEmail, inputPassword],
    btnLabel: 'Masuk',
  };

  return (
    <section className="login-page">
      <h2>Login terlebih dahulu</h2>
      <FormInput handler={onLoginHandler} data={loginMapping} />
      <p>
        Belum punya akun? <Link to="/notes-app/register">Daftar di sini.</Link>
      </p>
    </section>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
