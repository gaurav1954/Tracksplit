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
import axios from "axios";
import { fetchUserData } from "../utils/userInfo";
import { stringAvatar } from "../utils/avatarUtil"; // Importing the utility functions

const AddFriends = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const friends = useSelector((state) => state.user.friends);
  const debts = user.debts;
  const balance = user.balance; // Access balance from Redux
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Reference for input field to set focus
  const inputRef = useRef(null);

  // Function to add friend by phone number
  const handleAddFriend = async () => {
    try {
      if (phoneNumber != user.phoneNumber) {
        const response = await axios.post("/user/addFriend", { phoneNumber });
        await fetchUserData(dispatch);
        setPhoneNumber("");
        setErrorMessage("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to add friend. Please try again.");
    }
  };
  const handleSettle = async (friendPhoneNumber) => {
    try {
      // Send friend's phone number to the backend to settle debt
      const response = await axios.post("/expense/settle", { phoneNumber: friendPhoneNumber });
      if (response.status === 200) {
        // Fetch updated user data after settling
        await fetchUserData(dispatch);
      }
    } catch (error) {
      console.error("Error settling debt:", error);
      setErrorMessage("Failed to settle debt. Please try again.");
    }
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="Phone Number (10 digits)"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          sx={{
            width: "80%",
            borderRadius: "100px", // Rounded corners
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
        <Typography variant="body2" color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      {balance < 0 ? (
        <Typography variant="h6" sx={{ marginBottom: "16px", color: "black" }}>
          Overall you owe{" "}
          <span style={{ color: "orange" }}>
            {Math.abs(balance).toFixed(2)}
          </span>
        </Typography>
      ) : (
        <Typography variant="h6" sx={{ marginBottom: "16px", color: "black" }}>
          You are owed{" "}
          <span style={{ color: "green" }}>{balance.toFixed(2)}</span>
        </Typography>
      )}

      <Container
        maxWidth="xs"
        className="add-friend-container"
        sx={{
          paddingLeft: "0px",
        }}
      >
        {friends.length > 0 ? (
          <List>
            {friends.map(({ _id, username, phoneNumber }) => {
              return (
                <ListItem
                  key={_id}
                  sx={{
                    paddingLeft: "0px",
                  }}
                  secondaryAction={
                    <Button
                      variant="outlined"
                      color="success"
                      disabled={!debts[_id] || debts[_id] > 0} // Disable if no debt or if debt is positive
                      onClick={() => handleSettle(phoneNumber)}
                    >
                      Settle
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded" {...stringAvatar(username)} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={username}
                    secondary={debts[_id].toFixed(2)}
                    secondaryTypographyProps={{
                      style: { color: debts[_id] >= 0 ? "green" : "orange" },
                    }}
                  />
                </ListItem>
              );
            })}
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
    </Box>
  );
};

export default AddFriends;
