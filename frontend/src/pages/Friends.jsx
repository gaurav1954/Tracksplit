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
import { Link, useLocation } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import "./friends.css"; // Custom CSS for styling

const AddFriends = () => {
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  // Function to add friend by name and phone number
  const handleAddFriend = () => {
    if (friendName && phoneNumber.length === 10) { // Ensure phone number is 10 digits
      // Create a new friend object
      const newFriend = {
        id: friends.length + 1,
        name: friendName,
        phone: phoneNumber,
      };

      // Add the new friend to the friends list
      setFriends([...friends, newFriend]);

      // Clear input fields
      setFriendName("");
      setPhoneNumber("");
      setErrorMessage(""); // Clear error message
    } else {
      setErrorMessage("Please enter a valid name and a 10-digit phone number.");
    }
  };

  // Function to delete a friend by id
  const handleDeleteFriend = (id) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    setFriends(updatedFriends);
  };

  return (
    <div className="add-friend-page">
      <Container maxWidth="xs" className="add-friend-container">
        {/* Friends List */}
        {friends.length > 0 ? (
          <>
            <Typography variant="h6" className="friend-list-title" style={{ marginBottom: "10px" }}>
              Friends Added:
            </Typography>
            <List>
              {friends.map((friend) => (
                <ListItem key={friend.id} secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFriend(friend.id)}>
                    <DeleteIcon />
                  </IconButton>
                }>
                  <ListItemAvatar>
                    <Avatar>{friend.name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={friend.name} secondary={friend.phone} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            No friends added yet!
          </Typography>
        )}

        {/* Input Fields for Adding Friends */}
        <TextField
          label="Friend's Name"
          variant="outlined"
          fullWidth
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Phone Number (10 digits)"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          inputProps={{ maxLength: 10 }} // Limit input length to 10
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

        {/* Display Error Message */}
        {errorMessage && (
          <Typography variant="body2" color="error" gutterBottom>
            {errorMessage}
          </Typography>
        )}
      </Container>

      {/* Bottom Navigation */}
      <AppBar position="fixed" className="bottom-navbar" style={{ top: 'auto', bottom: 0 }}>
        <Toolbar className="nav-links">
          <Button
  color="inherit"
  component={Link}
  to="/friends"
  className="nav-button"
  style={{
    color: location.pathname === '/friends' ? 'yellow' : 'inherit', // Change to yellow for active link
    display: 'flex',
    flexDirection: 'column',
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
    color: location.pathname === '/group' ? 'yellow' : 'inherit', // Change to yellow for active link
    display: 'flex',
    flexDirection: 'column',
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
    color: location.pathname === '/add-expense' ? 'yellow' : 'inherit', // Change to yellow for active link
    display: 'flex',
    flexDirection: 'column',
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
    color: location.pathname === '/activity' ? 'yellow' : 'inherit', // Change to yellow for active link
    display: 'flex',
    flexDirection: 'column',
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
    color: location.pathname === '/profile' ? 'yellow' : 'inherit', // Change to yellow for active link
    display: 'flex',
    flexDirection: 'column',
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

export default AddFriends;
