import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import './index.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const handleLogin = (login: string, password: string) => {
    if (login === password) {
      setLoginError('');
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setLoginError('Nieprawidłowy login i/lub hasło');
    }
  };
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      {loginError !== '' && <Alert  severity="error">{loginError}</Alert>}
      {!isLoggedIn ? <LoginForm onLogin={handleLogin} /> :
      <Outlet />
    }
    </div>
  )
}

export default App
