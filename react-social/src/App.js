/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/messenger/Messenger';
import RequireAuth from './components/ReqAuth/RequireAuth';
// import AuthPage from './components/Auth/Auth';

function App() {
  const { user } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={
            <Login />
        } />
        <Route path='register' element={
            <Register />
        } />

        <Route path='/' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path='profile/:username' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
        <Route path='messenger' element={
          <RequireAuth>
            <Messenger />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
