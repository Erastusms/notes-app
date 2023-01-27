import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import { getUserLogged, putAccessToken } from '../utils/data';
import Navigation from './Navigation';
import { ThemeProvider } from '../contexts/ThemeContext';
import ToggleTheme from './ToggleTheme';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme,
          };
        });
      },
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken('');
  }

  render() {
    if (this.state.initializing) return null;

    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <div className="app-container">
            <header className="notes-app__header">
              <h1>Notes</h1>
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <ToggleTheme />
          </div>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider value={this.state}>
        <div className="app-container">
          <header className="notes-app__header">
            <h1>
              <Link to="/">Notes</Link>
            </h1>
            <Navigation
              logout={this.onLogout}
              name={this.state.authedUser.name}
            />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<MainPage isActiveNotes />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/notes/new" element={<AddPage />} />
              <Route path="/archives" element={<MainPage />} />
              <Route path="/note/:id" element={<DetailPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <ToggleTheme />
        </div>
      </ThemeProvider>
    );
  }
}

export default NotesApp;
