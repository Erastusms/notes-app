// import React from 'react';
// import { GrSun } from 'react-icons/gr';
// import { IoMdMoon } from 'react-icons/io';
// import useTheme from '../hooks/useTheme';

import { ThemeConsumer } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

// const ToggleTheme = () => {
//   const [theme, changeTheme] = useTheme();

//   return (
//     <div className="toogle__action">
//       <button
//         type="button"
//         className="toggle-theme"
//         onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
//       >
//         {theme === 'dark' ? <IoMdMoon /> : <GrSun />}
//       </button>
//     </div>
//   );
// };

const ToggleTheme = () => {
  //   const [theme, changeTheme] = useTheme();

  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <div className="toogle__action">
            {/* return ( */}
            <button
              type="button"
              className="toggle-theme"
              onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <FaMoon /> : <FaSun />}
            </button>
            {/* ); */}
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

// export default ToggleTheme;

// import { ThemeConsumer } from '../contexts/ThemeContext';
// import { FaMoon, FaSun } from 'react-icons/fa';

// function ToggleTheme() {
//   return (
//     <ThemeConsumer>
//       {({ theme, toggleTheme }) => {
//         return <button onClick={toggleTheme}>{theme === 'dark' ? <FaMoon /> : <FaSun />}</button>;
//       }}
//     </ThemeConsumer>
//   );
// }

export default ToggleTheme;
