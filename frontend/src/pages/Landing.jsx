import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Snackbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './landing.css';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const [open, setOpen] = useState(true); // State for Snackbar visibility
  const location = useLocation(); // Get the current URL location

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Automatically close the Snackbar after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 10000); // 10 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="landing-page">

      {/* Top Navbar for Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={10000} // Auto hide after 10 seconds
        onClose={handleClose}
        message="Hi, welcome to TrackSplit"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning
      />

      {/* Main Content (Centered Add Friends Message) */}
      <div className="welcome-section">
        <Typography variant="h4" gutterBottom>
          You have not added any friends yet!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Start by inviting friends to share your expenses and balances.
        </Typography>

        {/* Add Friends button now links to /friends */}
        <Button variant="contained" color="primary" component={Link} to="/friends">
          Add Friends
        </Button>
      </div>

      <Navbar></Navbar>
    </div>
  );
};

export default LandingPage;
