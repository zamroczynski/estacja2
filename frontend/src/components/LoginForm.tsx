import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


type LoginFormProps = {
    onLogin: (login: string, password: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        onLogin(login, password);
    };

    return (
        <Box
            component='form'
            noValidate
            autoComplete='off'
            className='mt-5 mx-5'>
            <TextField 
                id='login' 
                label='Login' 
                variant='standard' 
                value={login}
                onChange={(e) => setLogin(e.target.value)} 
                fullWidth />
            <TextField 
                id='password' 
                label='Hasło' 
                variant='standard' 
                type='password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth />
            <Button 
                variant='contained' 
                className='mt-3 bg-lime-700 w-full'
                onClick={() => handleLogin()}>
                Zaloguj
            </Button>
        </Box>
    );
};

export default LoginForm;