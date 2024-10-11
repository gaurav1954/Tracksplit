import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import './group.css'; // Custom CSS for styling

const CreateGroup = () => {
  const location = useLocation();
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([
    { id: 1, name: 'Weekend Trip' },
    { id: 2, name: 'Office Party' },
    { id: 3, name: 'Family Expenses' },
  ]); // Dummy group data

  // Set the document title when this component is mounted
  useEffect(() => {
    document.title = "TrackSplit - Create Group";
  }, []);

  const handleCreateGroup = () => {
    if (groupName) {
      const newGroup = { id: groups.length + 1, name: groupName };
      setGroups([...groups, newGroup]);
      setGroupName(''); // Clear input field after adding
    }
  };

  const handleDeleteGroup = (id) => {
    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
  };

  return (
    <div className="create-group-page">
      <Container maxWidth="xs" className="create-group-container">
        <Typography variant="h6" style={{ marginTop: '30px' }}>
          Your Groups:
        </Typography>
        {groups.length > 0 ? (
          <List>
            {groups.map((group) => (
              <ListItem key={group.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteGroup(group.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemAvatar>
                  <Avatar>
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={group.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h5" gutterBottom>
            No groups yet!
          </Typography>
        )}

        {/* Input Field for New Group */}
        <TextField
          label="Group Name"
          variant="outlined"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateGroup}
          startIcon={<GroupIcon />}
          fullWidth
        >
          Start a New Group
        </Button>
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

export default CreateGroup;
