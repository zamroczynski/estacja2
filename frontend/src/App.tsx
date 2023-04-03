import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const handleLogin = (login: string, password: string) => {
    if (login === password) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setLoginError('Błąd logowania!');
    }
    
  };
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      {!isLoggedIn && <LoginForm onLogin={handleLogin} />}
    </div>
  )
}

export default App
