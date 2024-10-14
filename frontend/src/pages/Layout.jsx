import React from 'react';
import { Container } from '@mui/material';
import Navbar from '../components/Navbar'; // Import the Navbar component

const Layout = ({ children }) => {
    return (
        <div style={{ paddingBottom: '80px' }}> {/* Add bottom padding for fixed Navbar */}
            <Container maxWidth="lg">
                {children} {/* This will render the content of the current page */}
            </Container>
            <Navbar /> {/* Fixed navbar will always be rendered at the bottom */}
        </div>
    );
};

export default Layout;
