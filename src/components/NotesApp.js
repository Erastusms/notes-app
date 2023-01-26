import React, { useState, useMemo, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegisterPage from '../pages/RegisterPage';
import { getUserLogged, putAccessToken } from '../utils/data';
import Navigation from './Navigation';
import ThemeContext, { ThemeProvider } from '../contexts/ThemeContext';
import useTheme from '../hooks/useTheme';
import Loading from './Loading';
import ToggleTheme from './ToggleTheme';

// function NotesApp() {
//   return (
//     <div className="app-container">
//       <header className="notes-app__header">
//         <h1>
//           <Link to="/">Notes</Link>
//         </h1>
//         <Navigation />
//       </header>
//       <main>
//         <Routes>
//           <Route path="/" element={<MainPage pages={'active'} />} />
//           <Route path="/notes/new" element={<AddPage />} />
//           <Route path="/archives" element={<MainPage pages={'archived'} />} />
//           <Route path="/note/:id" element={<DetailPage />} />
//           <Route path="/*" element={<NotFoundPage />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          // mendapatkan nilai tema baru berdasarkan state sebelumnya
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          // menyimpan nilai tema baru ke local storage
          localStorage.setItem('theme', newTheme);
          // mengembalikan state dengan nilai theme terbaru.
          return {
            theme: newTheme,
          };
        });
      },
      // localeContext: {
      //   locale: localStorage.getItem('locale') || 'id',
      //   toggleLocale: () => {
      //     this.setState((prevState) => {
      //       const newLocale =
      //         prevState.localeContext.locale === 'id' ? 'en' : 'id';
      //       localStorage.setItem('locale', newLocale);
      //       return {
      //         localeContext: {
      //           ...prevState.localeContext,
      //           locale: newLocale,
      //         },
      //       };
      //     });
      //   },
      // },
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    // this.onContextValue = this.onContextValue.bind(this);
  }

  // const [locale, setLocale] = React.useState('id');

  // const toggleLocale = () => {
  //   setLocale((prevLocale) => {
  //     return prevLocale === 'id' ? 'en' : 'id';
  //   });
  // };

  // onContextValue() {
  //   useMemo(() => {
  //     return {
  //       this.state.theme,
  //       this.state.toggleTheme,
  //     };
  //   }, [locale]);
  // }

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
        // <>
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
          {/* </> */}
        </ThemeProvider>
      );
    }

    return (
      // <>
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
          {/* <header className="contact-app__header">
            <h1>
              {this.state.localeContext.locale === 'id'
                ? 'Aplikasi Kontak'
                : 'Contacts App'}
            </h1>
            <Navigation
              logout={this.onLogout}
              name={this.state.authedUser.name}
            />
          </header> */}
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
        {/* </> */}
      </ThemeProvider>
    );
  }
}

// const NotesApp = () => {
//   const [auth, setAuth] = useState(null);
//   // const [locale, setLocale] = useState('id');
//   // const [theme, changeTheme] = useTheme();
//   const [theme, setTheme] = useState('dark');
//   const [loading, setLoading] = useState(false);
//   // const [locale, setLocale] = React.useState('id');

//   // theme: localStorage.getItem('theme') || 'light',
//   const toggleTheme = () => {
//     setTheme((prevState) => {
//       // mendapatkan nilai tema baru berdasarkan state sebelumnya
//       const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
//       // menyimpan nilai tema baru ke local storage
//       localStorage.setItem('theme', newTheme);
//       // mengembalikan state dengan nilai theme terbaru.
//       return {
//         theme: newTheme,
//       };
//     });
//   };
//   // const toggleTheme = () => {
//   //   setTheme((prevTheme) => {
//   //     return prevTheme === 'dark' ? 'light' : 'dark';
//   //   });
//   // };

//   // const themeContextValue = useMemo(() => {
//   //   return {
//   //     theme,
//   //     toggleTheme
//   //   };
//   // }, [theme]);

//   const themeContextValue = useMemo(
//     () => ({
//       theme,
//       toggleTheme,
//     }),
//     [toggleTheme, theme]
//   );

//   useEffect(() => {
//     setLoading(true);
//     const getAuthUser = async () => {
//       const authUser = await getUserLogged();
//       if (authUser) setAuth(authUser.data);
//       setLoading(false);
//     };
//     getAuthUser();
//     toggleTheme()
//     // console.log('localStorage.theme before change');
//     // console.log(localStorage.theme);
//     // localStorage.getItem('theme');
//     // if (localStorage.theme) {
//     //   localStorage.setItem('theme', localStorage.theme)
//     //   changeTheme(localStorage.theme);
//     // }
//     // console.log('localStorage.theme after change');
//     // console.log(localStorage.theme);
//     // else {
//     //   localStorage.setItem('theme', 'dark');
//     //   changeTheme('dark');
//     // }
//   }, []);

//   const onLoginSuccess = async ({ accessToken }) => {
//     putAccessToken(accessToken);
//     const { data } = await getUserLogged();
//     setAuth(data);
//   };

//   const onLogout = () => {
//     setAuth(null);
//     putAccessToken('');
//   };

//   if (loading) return null;

//   if (auth === null) {
//     return (
//       <ThemeContext.Provider value={themeContextValue}>
//         {/* {loading && <Loading />} */}
//         <div className="app-container">
//           <header className="notes-app__header">
//             <h1>
//               <Link to="/">Notes App</Link>
//             </h1>
//           </header>
//           <main>
//             <Routes>
//               <Route
//                 path="/*"
//                 element={<LoginPage loginSuccess={onLoginSuccess} />}
//               />
//               <Route path="/register" element={<RegisterPage />} />
//             </Routes>
//           </main>
//           <ToggleTheme />
//         </div>
//       </ThemeContext.Provider>
//     );
//   }

//   return (
//     <ThemeContext.Provider value={themeContextValue}>
//       {/* {loading && <Loading />} */}
//       <div className="app-container">
//         <header className="notes-app__header">
//           <h1>
//             <Link to="/">Notes App</Link>
//           </h1>
//           <Navigation logout={onLogout} name={auth.name} />
//         </header>
//         <main>
//           <Routes>
//             <Route path="/" element={<MainPage isActiveNotes />} />
//             <Route path="/notes/new" element={<AddPage />} />
//             <Route path="/archives" element={<MainPage />} />
//             <Route path="/note/:id" element={<DetailPage />} />
//             <Route path="/*" element={<NotFoundPage />} />
//           </Routes>
//         </main>
//         <ToggleTheme />
//       </div>
//     </ThemeContext.Provider>
//   );
// };

export default NotesApp;
