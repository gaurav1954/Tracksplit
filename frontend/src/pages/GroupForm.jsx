import React, { useState, useEffect } from "react";
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
import "react-toastify/dist/ReactToastify.css";

const GroupForm = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Dummy data for friends
  const dummyFriends = [
    { id: 1, name: "Alice", phoneNumber: "1234567890" },
    { id: 2, name: "Bob", phoneNumber: "2345678901" },
    { id: 3, name: "Charlie", phoneNumber: "3456789012" },
  ];

  useEffect(() => {
    document.title = "TrackSplit - Group Form";
  }, []);

  // Handle selecting/deselecting members
  const handleSelectMember = (id) => {
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.includes(id)
        ? prevSelectedMembers.filter((memberId) => memberId !== id)
        : [...prevSelectedMembers, id]
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!groupName) {
      toast.error("Group name is required!", { position: "top-center" });
      return;
    }

    const newGroup = {
      groupName,
      groupDescription,
      members: selectedMembers,
    };

    console.log("Group Created:", newGroup);

    toast.success("Group created successfully!", { position: "top-center" });

    // Reset form fields
    setGroupName("");
    setGroupDescription("");
    setSelectedMembers([]);
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
              {dummyFriends.map(({ id, name }) => (
                <ListItem key={id} sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar>{name.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedMembers.includes(id)}
                        onChange={() => handleSelectMember(id)}
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </Box>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default GroupForm;
