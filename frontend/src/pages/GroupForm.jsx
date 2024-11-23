import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import AddIcon from "@mui/icons-material/Add";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { stringAvatar } from '../utils/avatarUtil';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { fetchUserData } from "../utils/userInfo";
import { useNavigate } from "react-router-dom";

const GroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const friends = useSelector((state) => state.user.friends);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "TrackSplit - Group Form";
  }, []);

  // Handle selecting/deselecting members
  const handleSelectFriend = (phoneNumber) => {
    setSelectedFriends((prevSelectedFriends) =>
      prevSelectedFriends.includes(phoneNumber)
        ? prevSelectedFriends.filter((friendPhone) => friendPhone !== phoneNumber)
        : [...prevSelectedFriends, phoneNumber]
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!groupName) {
      toast.error("Group name is required!", { position: "top-center" });
      return;
    }

    const newGroup = {
      name: groupName,
      memberPhoneNumbers: selectedFriends,
    };

    try {
      const response = await axios.post('/user/creategroup', newGroup, {
      });

      if (response.status === 201) {
        toast.success("Group created successfully!", { position: "top-center" });

        // Reset form fields
        setGroupName("");
        setGroupDescription("");
        setSelectedFriends([]);
        await fetchUserData(dispatch);
        setTimeout(() => {
          navigate('/group');
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating group:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to create group.', { position: "top-center" });
    }
  };


  return (
    <div className="group-form-page">
      <Container maxWidth="sm" className="group-form-container">
        <Typography variant="h6" gutterBottom>
          Create a New Group
        </Typography>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <TextField
            label="Group Name"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            margin="normal"
          />

          <TextField
            label="Group Description"
            fullWidth
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          <Box sx={{ marginTop: "16px", width: "100%" }}>
            <Typography variant="h6">Add Members</Typography>
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
                    label=""
                  />
                </ListItem>
              ))}
            </List>
          </Box>



          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            startIcon={<AddIcon />}
            sx={{ marginTop: "16px" }}
          >
            Add Group
          </Button>
        </Box>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default GroupForm;
