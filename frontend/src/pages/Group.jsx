import React, { useState } from "react";
import { Container, List, ListItem, ListItemAvatar, Avatar, Typography, Button, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const Group = () => {
  const groups = useSelector((state) => state.user.groups);
  const navigate = useNavigate();

  const handleGroupClick = (groupId) => {
    navigate(`/groupChat/${groupId}`); // Navigate to GroupChat page with group ID
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center">
        Groups
      </Typography>

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
                cursor: "pointer",
              }}
              onClick={() => handleGroupClick(group._id)} // Navigate on click
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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/createGroup")}
          startIcon={<AddIcon />}
        >
          Create New Group
        </Button>
      </Box>
    </Container>
  );
};

export default Group;
