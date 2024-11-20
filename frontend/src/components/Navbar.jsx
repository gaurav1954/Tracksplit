import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    // Get the current route location
    const location = useLocation();

    return (
        <AppBar
            position="fixed"
            style={{
                top: 'auto',
                bottom: 0,
                width: '100vw',
                boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
            }}
        >
            <Toolbar
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: 0,
                }}
            >
                <Button
                    color="inherit"
                    component={Link}
                    to="/friends"
                    style={{
                        color: location.pathname === '/friends' ? 'black' : 'inherit',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <EmojiPeopleIcon />
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/group"
                    style={{
                        color: location.pathname === '/group' ? 'black' : 'inherit',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <GroupIcon />
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/add-expense"
                    style={{
                        color: location.pathname === '/add-expense' ? 'black' : 'inherit',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <AddIcon />
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/activity"
                    style={{
                        color: location.pathname === '/activity' ? 'black' : 'inherit',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <ListAltIcon />
                </Button>

                <Button
                    color="inherit"
                    component={Link}
                    to="/profile"
                    style={{
                        color: location.pathname === '/profile' ? 'black' : 'inherit',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <AccountCircleIcon />
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
