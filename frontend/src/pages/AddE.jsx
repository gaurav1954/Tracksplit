import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, List, ListItem, ListItemAvatar, ListItemText, Avatar, Checkbox, FormControlLabel } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios'; // Import Axios for making the API request
import Navbar from '../components/Navbar';
import { stringAvatar } from '../utils/avatarUtil';
import { useNavigate } from 'react-router-dom'; // For navigation
import { toast, ToastContainer } from 'react-toastify'; // Import Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]); // State to store selected friends' phone numbers

  const friends = useSelector((state) => state.user.friends); // Access friends from Redux
  const navigate = useNavigate(); // Use navigate for redirecting

  // Automatically set the date to the current date when the component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10); // Format as YYYY-MM-DD
    setDate(currentDate);
    document.title = "TrackSplit - Add Expense";
  }, []);

  const handleAddExpense = async () => {
    const newExpense = {
      amount,
      category,
      description,
      date,
      phoneNumbers: selectedFriends, // Send selected friends' phone numbers
    };

    try {
      // Make the API request to split expenses among friends
      const response = await axios.post('/expense/split/friends', newExpense);
      console.log('Expense added:', response.data);

      // Show a success toast notification
      toast.success('Expense added successfully!', {
        position: toast.POSITION.TOP_CENTER
      });

      // Clear input fields after adding the expense
      setAmount('');
      setCategory('');
      setDescription('');
      setSelectedFriends([]);

      // Redirect to the /friends page after a short delay to allow the toast to show
      setTimeout(() => {
        navigate('/friends');
      }, 2000);
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense. Please try again.', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  // Handle selecting/deselecting friends
  const handleSelectFriend = (phoneNumber) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.includes(phoneNumber)
        ? prevSelectedFriends.filter((num) => num !== phoneNumber) // Deselect
        : [...prevSelectedFriends, phoneNumber] // Select
    );
  };

  return (
    <div className="add-expense-page">
      <Container maxWidth="sm" className="add-expense-container">
        <Typography variant="h6" gutterBottom>
          Add an Expense
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Amount"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            type="number"
          />

          {/* Dropdown for Category */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="drinks">Drinks</MenuItem>
              <MenuItem value="fuel">Fuel</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="groceries">Groceries</MenuItem>
              <MenuItem value="travel">Travel</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          {/* Friends List with Checkboxes */}
          {friends.length > 0 ? (
            <Box sx={{ marginTop: '16px', width: '100%' }}>
              <Typography variant="h6">Select Friends</Typography>
              <List>
                {friends.map(({ _id, username, phoneNumber }) => (
                  <ListItem key={_id} sx={{ paddingLeft: "0px" }}>
                    <ListItemAvatar>
                      <Avatar variant="rounded" {...stringAvatar(username)} />
                    </ListItemAvatar>
                    <ListItemText primary={username} />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedFriends.includes(phoneNumber)}
                          onChange={() => handleSelectFriend(phoneNumber)}
                        />
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Typography>No friends available to split the expense with.</Typography>
          )}

          <Button variant="outlined" color="primary" onClick={handleAddExpense} sx={{ marginTop: '16px' }}>
            Add Expense
          </Button>
        </Box>
      </Container>

      <ToastContainer /> {/* Add ToastContainer for toast notifications */}
      <Navbar />
    </div>
  );
};

export default AddExpense;
