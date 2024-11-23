import React, { useState } from "react";
import { Container, List, ListItem, ListItemAvatar, Avatar, Typography, Button, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const Group = () => {
  // State to hold the groups
  const groups = useSelector(state => state.user.groups);
  console.log(groups);

  // Use navigate hook from react-router-dom
  const navigate = useNavigate();

  // Navigate to Group Form Page
  const handleCreateGroup = () => {
    navigate("/createGroup"); // Adjust to match your route for the group form page
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center">
        Groups
      </Typography>



      {/* Render the list of groups */}
      {groups.length > 0 ? (
        <List>
          {groups.map((group) => (
            <ListItem
              key={group.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "8px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      backgroundColor: "primary.main",
                      marginRight: "8px",
                    }}
                  >
                    <GroupIcon />
                  </Avatar>
                </ListItemAvatar>
                <Box>
                  <Typography variant="h6">{group.name}</Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography textAlign="center" color="text.secondary">
          No groups created yet!
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centers the button horizontally
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={handleCreateGroup}
          startIcon={<AddIcon />}
        >
          Create New Group
        </Button>
      </Box>

    </Container>
  );
};

export default Group;
