import { useState } from 'react';
import Button from '@mui/material/Button';

type LoginButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const LoginButton: React.FC<LoginButtonProps> = ({onClick}) => {
    return (
        <Button 
            variant='contained' 
            className='mt-3 bg-lime-700 w-full mr-5 mb-3 justify-center'
            onClick={onClick}>
            Zaloguj
        </Button>
    );
};

export default LoginButton;