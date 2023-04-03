import { useState } from "react";
import { Button } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logo from "./Logo";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsOffOutlinedIcon from "@mui/icons-material/NotificationsOffOutlined";

type NavbarProps = {
  isLoggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const NavbarMenu = () => {
    const open = Boolean(anchorEl);
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link to="/terminy">
            <MenuItem onClick={handleClose}>Terminy</MenuItem>
          </Link>
          <Link to="/podrecznik">
            <MenuItem onClick={handleClose}>Podręcznik</MenuItem>
          </Link>
          <Link to="/planogramy">
            <MenuItem onClick={handleClose}>Planogramy</MenuItem>
          </Link>
          <Link to="/wiadomosci">
            <MenuItem onClick={handleClose}>Wiadomości</MenuItem>
          </Link>
          <Link to="/zadania">
            <MenuItem onClick={handleClose}>Zadania</MenuItem>
          </Link>
          <Link to="/grafik">
            <MenuItem onClick={handleClose}>Grafik</MenuItem>
          </Link>
          <Link to="/admin">
            <MenuItem onClick={handleClose}>Admin</MenuItem>
          </Link>
          <Link to="/logout">
            <MenuItem onClick={handleClose}>Wyloguj</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  };

  return (
    <div className="left-0 top-0 w-screen m-0 flex">
      <div className="flex justify-between items-center bg-gray-800 w-full py-2">
        <Logo />
        {isLoggedIn && (
          <div className="flex items-center">
            <Button>
              <NotificationsOffOutlinedIcon className="h-8 w-8 text-gray-100 mr-1" />
            </Button>
            <NavbarMenu />
            <Button className="mr-5" onClick={handleClick}>
              <MenuOutlinedIcon className="h-8 w-8 text-gray-100" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
