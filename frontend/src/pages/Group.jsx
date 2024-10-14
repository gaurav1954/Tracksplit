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
import GroupIcon from "@mui/icons-material/Group";
import { setGroups } from "../features/userSlice"; // Importing setGroups action
import axios from "axios";
import Navbar from "../components/Navbar";

const CreateGroup = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.user.groups);
  const [groupName, setGroupName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Reference for input field to set focus
  const inputRef = useRef(null);

  // Function to create a group by name
  const handleCreateGroup = async () => {
    try {
      const response = await axios.post("/api/groups", { name: groupName });
      const newGroup = response.data; // Assume the API returns the new group

      dispatch(setGroups([...groups, newGroup]));
      setGroupName("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to create group. Please try again.");
    }
  };

  // Handle adding group button click to focus on input field
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
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="Group Name"
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          margin="normal"
          sx={{
            width: "80%",
            borderRadius: "100px", // Rounded corners
            marginRight: "8px", // Space between input and button
          }}
          ref={inputRef} // Set reference to input field for focusing
        />

        {/* Add group icon next to input */}
        <IconButton
          color="primary"
          onClick={handleCreateGroup}
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

      {/* Groups List */}
      <Container
        maxWidth="xs"
        className="create-group-container"
        sx={{
          paddingLeft: "0px"
        }}
      >
        {groups.length > 0 ? (
          <List>
            {groups.map(({ id, name }) => (
              <ListItem
                key={id}
                sx={{
                  paddingLeft: "0px"
                }}
              >
                <ListItemAvatar>
                  <Avatar variant="rounded">
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No groups created yet!</Typography>
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
            Create group
          </Button>
        </Box>
      </Container>

      {/* Navbar */}
      <Navbar />
    </Box>
  );
};

export default CreateGroup;
