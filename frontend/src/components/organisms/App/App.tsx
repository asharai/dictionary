import { Header } from '../../molecules/';
import './App.css';
import axios from '../../../axios';

import {
  MainPage,
  DictionaryPage,
  LoginPage,
  RegisterPage,
} from '../../pages/';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../../../core/store/auth-store';

function App() {
  const { logIn, isAuthorized } = useAuthStore();
  useEffect(() => {
    const fetchAuthMe = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: '/auth/me',
        });

        if (res.data !== undefined) {
          logIn();
        }
      } catch {
        console.error('Error');
      }
    };

    if (!isAuthorized) {
      fetchAuthMe();
    }
  }, [isAuthorized, logIn]);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
