import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navigation = ({ logout, name }) => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/archives">Arsip</Link>
        </li>
        <li>
          <button onClick={logout} className="button-logout">
            {name} <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
