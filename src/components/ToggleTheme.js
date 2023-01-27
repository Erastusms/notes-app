import { ThemeConsumer } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleTheme = () => {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => {
        return (
          <div className="toogle__action">
            <button
              type="button"
              className="toggle-theme"
              onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        );
      }}
    </ThemeConsumer>
  );
};

export default ToggleTheme;
