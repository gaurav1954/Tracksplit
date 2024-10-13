import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import GroupIcon from '@mui/icons-material/Group';
import { setGroups } from '../features/userSlice'; // Importing setGroups action
// import './group.css';
import Navbar from '../components/Navbar';
import axios from 'axios';

const CreateGroup = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.user.groups); // Accessing groups from Redux state
  const [groupName, setGroupName] = useState('');

  // Handle Create Group with API call
  const handleCreateGroup = async () => {
    if (groupName) {
      try {
        const response = await axios.post('/api/groups', { name: groupName });
        const newGroup = response.data; // Assume the API returns the new group
        dispatch(setGroups([...groups, newGroup])); // Update Redux state with the new group
        setGroupName(''); // Clear input field after adding
      } catch (error) {
        console.error('Error creating group:', error);
      }
    }
  };

  // Handle Delete Group locally
  const handleDeleteGroup = (id) => {
    const updatedGroups = groups.filter((group) => group.id !== id);
    dispatch(setGroups(updatedGroups)); // Update Redux with deleted group
  };

  return (
    <div className="create-group-page">
      <Container maxWidth="xs" className="create-group-container">

        {groups.length > 0 ? (
          <>
            <Typography style={{ marginBottom: "10px", marginTop: "10px" }}>
              Groups
            </Typography>
            <List>
              {groups.map((group) => (
                <ListItem
                  key={group.id}
                  style={{ paddingLeft: "0px" }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteGroup(group.id)}
                    >

                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <GroupIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={group.name} />
                </ListItem>
              ))}
            </List>
          </>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<GroupIcon />}
            onClick={handleCreateGroup}
          >
            Start a New Group
          </Button>
        </Box>
      </Container>

      <Navbar />
    </div>
  );
};

export default CreateGroup;
