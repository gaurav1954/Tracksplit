import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; // useLocation hook to track current route
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    // Get the current route location
    const location = useLocation();

    return (
        <AppBar position="fixed" className="bottom-navbar" style={{ top: 'auto', bottom: 0 }}>
            <Toolbar className="nav-links">
                <Button
                    color="inherit"
                    component={Link}
                    to="/friends"
                    className="nav-button"
                    style={{
                        color: location.pathname === '/friends' ? 'black' : 'inherit',
                    }}
                >
                    <EmojiPeopleIcon />
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/group"
                    className="nav-button"
                    style={{
                        color: location.pathname === '/group' ? 'black' : 'inherit',
                    }}
                >
                    <GroupIcon />
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/add-expense"
                    className="nav-button"
                    style={{
                        color: location.pathname === '/add-expense' ? 'black' : 'inherit',
                    }}
                >
                    <AddIcon /> {/* "+" Icon for Adding Expenses */}
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/activity"
                    className="nav-button"
                    style={{
                        color: location.pathname === '/activity' ? 'black' : 'inherit',
                    }}
                >
                    <ListAltIcon />
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/profile"
                    className="nav-button"
                    style={{
                        color: location.pathname === '/profile' ? 'black' : 'inherit',
                    }}
                >
                    <AccountCircleIcon />
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
