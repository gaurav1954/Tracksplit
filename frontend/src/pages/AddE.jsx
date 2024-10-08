import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, AppBar, Toolbar, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './adde.css'; // Custom CSS for styling

const AddExpense = () => {
  const location = useLocation(); // To detect the current route
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');

  // Set the document title when this component is mounted
  useEffect(() => {
    document.title = "TrackSplit - Add Expense";
  }, []);

  const handleAddExpense = () => {
    console.log(`Adding expense: ${expenseName}, Amount: ${amount}`);
    // Add logic for adding an expense, e.g., API call
  };

  return (
    <div className="add-expense-page">
      <Container maxWidth="sm" className="add-expense-container">
        <Typography variant="h4" gutterBottom>
          Add an Expense
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Expense Name"
            fullWidth
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Amount"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            type="number"
          />
          <Button variant="contained" color="primary" onClick={handleAddExpense} fullWidth>
            Add Expense
          </Button>
        </Box>
      </Container>

      {/* Bottom Navbar with Green Highlight for Add Expense */}
      <AppBar position="fixed" className="bottom-navbar" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar className="nav-links">
          <Button
            color="inherit"
            component={Link}
            to="/friends"
            className="nav-button"
            style={{
              color: location.pathname === '/friends' ? 'green' : 'inherit',
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
              color: location.pathname === '/group' ? 'green' : 'inherit',
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
              color: location.pathname === '/add-expense' ? 'green' : 'inherit',
            }}
          >
            <AddIcon />
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/activity"
            className="nav-button"
            style={{
              color: location.pathname === '/activity' ? 'green' : 'inherit',
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
              color: location.pathname === '/profile' ? 'green' : 'inherit',
            }}
          >
            <AccountCircleIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AddExpense;
