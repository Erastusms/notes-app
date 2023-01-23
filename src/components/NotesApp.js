import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import Navigation from './Navigation';

function NotesApp() {
  return (
    <div className="app-container">
      <header className="notes-app__header">
        <h1>
          <Link to="/">Notes</Link>
        </h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage pages={'active'} />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/archives" element={<MainPage pages={'archived'} />} />
          <Route path="/note/:id" element={<DetailPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default NotesApp;
