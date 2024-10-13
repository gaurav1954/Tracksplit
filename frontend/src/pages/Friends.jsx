import React, { useState, useRef } from "react";
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
  IconButton,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { setFriends } from "../features/userSlice";
import axios from "axios";
import Navbar from "../components/Navbar";
import { stringAvatar } from "../utils/avatarUtil"; // Importing the utility functions

const AddFriends = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.user.friends);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Reference for input field to set focus
  const inputRef = useRef(null);

  // Function to add friend by phone number
  const handleAddFriend = async () => {
    try {
      const response = await axios.post("/user/addFriend", { phoneNumber });
      const newFriend = response.data.friend;

      dispatch(setFriends([...friends, newFriend]));
      setPhoneNumber("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to add friend. Please try again.");
    }
  };

  const handleDeleteFriend = (id) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    dispatch(setFriends(updatedFriends));
  };

  // Handle adding friend button click to focus on input field
  const handleFocusInput = () => {
    inputRef.current.focus(); // Focus input field on button click
  };

  return (
    <Box
      sx={{
        paddingLeft: "15px",
        paddingRight: "15px",
        paddingTop: "16px", // Add some top padding if needed
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="Phone Number (10 digits)"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          inputProps={{ maxLength: 10 }}
          sx={{
            width: "75%",
            borderRadius: "50px", // Rounded corners
            marginRight: "8px", // Space between input and button
          }}
          ref={inputRef} // Set reference to input field for focusing
        />

        {/* Add friend icon next to input */}
        <IconButton
          color="primary"
          onClick={handleAddFriend}
          sx={{ padding: "8px" }} // Consistent padding
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Error message if any */}
      {errorMessage && (
        <Typography
          variant="body2"
          color="error"
          gutterBottom
        >
          {errorMessage}
        </Typography>
      )}

      {/* Friends List */}
      <Container
        maxWidth="xs"
        className="add-friend-container"
        sx={{
          paddingLeft: "0px"
        }}
      >
        {friends.length > 0 ? (
          <List>
            {friends.map(({ _id, username }) => (
              <ListItem
                key={_id}
                sx={{
                  paddingLeft: "0px"
                }}
              >
                <ListItemAvatar>
                  <Avatar variant="rounded" {...stringAvatar(username)} />
                </ListItemAvatar>
                <ListItemText primary={username} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No friends added yet!</Typography>
        )}

        {/* Button to show input field and make it active */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // Align button to the left
            marginTop: "16px",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleFocusInput} // Focus input field on button click
          >
            Add more friends
          </Button>
        </Box>
      </Container>

      {/* Navbar */}
      <Navbar />
    </Box>
  );
};

export default AddFriends;
