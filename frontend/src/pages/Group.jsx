import React, { useEffect } from 'react';
import { TextField, Button, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './group.css'; // Custom CSS for styling

const CreateGroup = () => {
  const location = useLocation(); // To detect the current route
  const [groupName, setGroupName] = React.useState('');

  // Set the document title when this component is mounted
  useEffect(() => {
    document.title = "TrackSplit - Create Group";
  }, []);

  const handleCreateGroup = () => {
    console.log(`Creating group: ${groupName}`);
    // Add logic for creating a group, e.g., API call
  };

  return (
    <div className="create-group-page">
      <Container maxWidth="xs" className="create-group-container">
        <Typography variant="h4" gutterBottom>
          Create a Group
        </Typography>
        <TextField
          label="Group Name"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateGroup}>
          Create Group
        </Button>
      </Container>

      {/* Bottom Navbar with Green Highlight for Create Group */}
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
            to="/group" // Ensure this route is correct
            className="nav-button"
            style={{
              color: location.pathname === '/group' ? 'green' : 'inherit', // Change to '/group'
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
            <AddIcon /> {/* "+" Icon for Adding Expenses */}
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

export default CreateGroup;
