import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../features/userSlice"; // Redux action to set friends
import { Delete } from "@mui/icons-material";
import axios from "axios"; // For API call
import Navbar from "../components/Navbar";

const AddFriends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends); // Get friends from Redux state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to add friend by phone number
  const handleAddFriend = async () => {
    try {
      // Make API request to backend to add friend
      const response = await axios.post("/user/addFriend", { phoneNumber });
      const newFriend = response.data.friend; // Assuming the API returns the new friend object

      // Update Redux store with new friend
      dispatch(setFriends([...friends, newFriend]));

      // Clear input field and error message
      setPhoneNumber("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to add friend. Please try again.");
    }
  }

  const handleDeleteFriend = (id) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    dispatch(setFriends(updatedFriends)); // Update Redux store
    // You can add a call to the backend to delete the friend as well if needed
  };

  return (
    <div className="add-friend-page">
      <Container maxWidth="xs" className="add-friend-container">
        {/* Friends List */}
        {friends.length > 0 ? (
          <>
            <Typography variant="h6" style={{ marginBottom: "10px" }}>
              Friends:
            </Typography>
            <List>
              {friends.map(({ _id, username, phoneNumber }) => (
                <ListItem key={_id} secondaryAction={
                  <IconButton onClick={() => handleDeleteFriend(id)}><Delete /></IconButton>
                }>
                  <ListItemAvatar><Avatar>{username ? username.charAt(0).toUpperCase() : ''}</Avatar></ListItemAvatar>
                  <ListItemText primary={username} secondary={phoneNumber} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography>No friends added yet!</Typography>
        )}

        {/* Input Field to Add Friends */}
        <TextField
          label="Phone Number (10 digits)"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          inputProps={{ maxLength: 10 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddFriend}
        >
          Add Friend
        </Button>

        {/* Display Error Message */}
        {errorMessage && (
          <Typography variant="body2" color="error" gutterBottom>
            {errorMessage}
          </Typography>
        )}
      </Container>

      <Navbar></Navbar>
    </div>
  );
};

export default AddFriends;
