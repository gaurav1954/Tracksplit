import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl, List, ListItem, ListItemAvatar, ListItemText, Avatar, Checkbox, FormControlLabel, Radio, RadioGroup, FormControlLabel as RadioFormControlLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { stringAvatar } from '../utils/avatarUtil';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUserData } from "../utils/userInfo";
import GroupIcon from "@mui/icons-material/Group";

const AddExpense = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [splitOption, setSplitOption] = useState('friends'); // To toggle between friends or groups

  const friends = useSelector((state) => state.user.friends);
  const groups = useSelector((state) => state.user.groups); // Assuming groups are stored in state.user.groups
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setDate(currentDate);
    document.title = "TrackSplit - Add Expense";
  }, []);

  const handleAddExpense = async () => {
    const newExpense = {
      amount,
      category,
      description,
      date,
      phoneNumbers: splitOption === 'friends' ? selectedFriends : [], // Only pass friends if selected
      groupId: splitOption === 'group' ? selectedGroup : null, // Only pass groupId if selected
    };

    try {
      let response;

      // Determine the appropriate URL for the POST request based on the split option
      if (splitOption === 'friends') {
        response = await axios.post('/expense/split/friends', newExpense); // URL for splitting with friends
      } else if (splitOption === 'group') {
        response = await axios.post('/expense/split/group', newExpense); // URL for splitting with group
      }

      await fetchUserData(dispatch);

      toast.success('Expense added successfully!', {
        position: "top-center"
      });

      // Reset fields after successful expense addition
      setAmount('');
      setCategory('');
      setDescription('');
      setSelectedFriends([]);
      setSelectedGroup(null);

      // Navigate to the friends page after a delay
      setTimeout(() => {
        navigate('/friends');
      }, 1000);

    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense. Please try again.', {
        position: "top-center"
      });
    }
  };


  const handleSelectFriend = (phoneNumber) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.includes(phoneNumber)
        ? prevSelectedFriends.filter((num) => num !== phoneNumber)
        : [...prevSelectedFriends, phoneNumber]
    );
  };

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId);
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

          {/* Option to select between friends or group */}
          <FormControl component="fieldset" sx={{ marginTop: 2 }}>
            <RadioGroup
              value={splitOption}
              onChange={(e) => setSplitOption(e.target.value)}
            >
              <FormControlLabel value="friends" control={<Radio />} label="Split with Friends" />
              <FormControlLabel value="group" control={<Radio />} label="Split with Group" />
            </RadioGroup>
          </FormControl>

          {/* Render Friends selection if 'friends' is selected */}
          {splitOption === 'friends' && friends.length > 0 && (
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
          )}

          {/* Render Group selection if 'group' is selected */}
          {splitOption === 'group' && groups.length > 0 && (
            <Box sx={{ marginTop: '16px', width: '100%' }}>
              <Typography variant="h6">Select Group</Typography>
              <List>
                {groups.map(({ _id, name }) => (
                  <ListItem key={_id} sx={{ paddingLeft: "0px" }}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        sx={{
                          backgroundColor: "primary.main",
                          marginRight: "8px",
                        }}
                      >
                        <GroupIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedGroup === _id}
                          onChange={() => handleSelectGroup(_id)}
                        />
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Button variant="outlined" color="primary" onClick={handleAddExpense} sx={{ marginTop: '16px' }}>
            Add Expense
          </Button>
        </Box>
      </Container>

      <ToastContainer />
      <Navbar />
    </div>
  );
};

export default AddExpense;
