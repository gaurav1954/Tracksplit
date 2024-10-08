import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import "./friends.css"; // Custom CSS for styling

const AddFriends = () => {
  const [friendName, setFriendName] = useState("");
  const location = useLocation(); // To detect the current route

  const handleAddFriend = () => {
    console.log(`Adding friend: ${friendName}`);
    // Add logic for adding a friend, e.g., API call
  };

  return (
    <div className="add-friend-page">
      <Container maxWidth="xs" className="add-friend-container">
        <Typography variant="h5" gutterBottom>
          No friends yet!
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Add your first friend to start splitting expenses.
        </Typography>
        <TextField
          label="Enter Friend's Name"
          fullWidth
          variant="outlined"
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddFriend}
          startIcon={<AddIcon />}
        >
          Add Friend
        </Button>
      </Container>

      {/* Bottom Navbar with Green Highlight for Friends */}
      <AppBar
        position="fixed"
        className="bottom-navbar"
        style={{ top: "auto", bottom: 0 }}
      >
        <Toolbar className="nav-links">
          <Button
            color="inherit"
            component={Link}
            to="/friends"
            className="nav-button"
            style={{
              color: location.pathname === "/friends" ? "green" : "inherit",
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
              color: location.pathname === "/group" ? "green" : "inherit",
            }}
          >
            <GroupIcon />
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/add-expense"
            className="nav-button"
          >
            <AddIcon />
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/activity"
            className="nav-button"
            style={{
              color: location.pathname === "/activity" ? "green" : "inherit",
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
              color: location.pathname === "/profile" ? "green" : "inherit",
            }}
          >
            <AccountCircleIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AddFriends;
