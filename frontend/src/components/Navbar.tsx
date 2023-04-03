import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button } from "@mui/material";
import Logo from "./Logo";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import LoginButton from "./LoginButton";


type NavbarProps = {
    isLoggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = ({isLoggedIn}) => {
    const menuElements = [
        "Terminy", 
        "Podręcznik",
        "Planogramy",
        "Wiadomości",
        "Zadania",
        "Grafik",
        "Admin",
        "Wyloguj",
    ];

    return(
        <div className="left-0 top-0 w-screen m-0 flex">
            <div className="flex justify-between items-center bg-gray-800 w-full py-2">
                <Logo />
                {isLoggedIn && (
                    <div className="flex items-center">
                        <Button>
                            <NotificationsOffOutlinedIcon 
                                className="h-8 w-8 text-gray-100 mr-1" />
                        </Button>
                        <Button className="mr-5">
                            <MenuOutlinedIcon className="h-8 w-8 text-gray-100" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
        
    );
};

export default Navbar;