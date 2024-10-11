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
  const [category, setCategory] = useState(''); // New state for category
  const [createdBy, setCreatedBy] = useState(''); // New state for created by
  const [description, setDescription] = useState(''); // New state for description
  const [date, setDate] = useState(''); // New state for date
  const [expenses, setExpenses] = useState([]); // State for storing expenses

  // Set the document title when this component is mounted
  useEffect(() => {
    document.title = "TrackSplit - Add Expense";
  }, []);

  const handleAddExpense = () => {
    // Create a new expense object
    const newExpense = {
      expenseName,
      amount,
      category,
      createdBy,
      description,
      date,
    };

    // Add the new expense to the list of expenses
    setExpenses([...expenses, newExpense]);

    // Clear input fields after adding the expense
    setExpenseName('');
    setAmount('');
    setCategory('');
    setCreatedBy('');
    setDescription('');
    setDate('');
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
          <TextField
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Created By"
            fullWidth
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline // Allows for multiple lines in the description field
            rows={3} // Set the number of visible rows
          />
          <TextField
            label="Date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            margin="normal"
            type="date" // Set input type to date
            InputLabelProps={{
              shrink: true, // Keeps the label shrunk when a date is selected
            }}
          />
          <Button variant="contained" color="primary" onClick={handleAddExpense} fullWidth>
            Add Expense
          </Button>
        </Box>
        
        {/* Display the list of expenses */}
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Expense List
          </Typography>
          {expenses.length === 0 ? (
            <Typography variant="body1">No expenses added yet.</Typography>
          ) : (
            <ul>
              {expenses.map((expense, index) => (
                <li key={index}>
                  <Typography variant="body1">
                    {expense.expenseName} - ${expense.amount} | Category: {expense.category} | Created By: {expense.createdBy} | Description: {expense.description} | Date: {expense.date}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Container>
      
      <AppBar position="fixed" className="bottom-navbar" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar className="nav-links">
          <Button
            color="inherit"
            component={Link}
            to="/friends"
            className="nav-button"
            style={{
              color: location.pathname === '/friends' ? 'yellow' : 'inherit',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <EmojiPeopleIcon />
            <Typography variant="caption">Friends</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/group"
            className="nav-button"
            style={{
              color: location.pathname === '/group' ? 'yellow' : 'inherit',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <GroupIcon />
            <Typography variant="caption">Group</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/add-expense"
            className="nav-button"
            style={{
              color: location.pathname === '/add-expense' ? 'yellow' : 'inherit',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AddIcon />
            <Typography variant="caption">Add Expense</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/activity"
            className="nav-button"
            style={{
              color: location.pathname === '/activity' ? 'yellow' : 'inherit',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ListAltIcon />
            <Typography variant="caption">Activity</Typography>
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/profile"
            className="nav-button"
            style={{
              color: location.pathname === '/profile' ? 'yellow' : 'inherit',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AccountCircleIcon />
            <Typography variant="caption">Profile</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AddExpense;
