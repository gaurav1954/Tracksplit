import React, { useState } from "react";
import { Container, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Button, Box } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";

const Group = () => {
  // State to hold the groups
  const [groups, setGroups] = useState([
    { id: 1, name: "Family", description: "Family Group", members: ["Alice"] },
    { id: 2, name: "Friends", description: "Friends Group", members: ["Bob"] },
  ]);

  // Use navigate hook from react-router-dom
  const navigate = useNavigate();

  // Navigate to Group Form Page
  const handleCreateGroup = () => {
    navigate("/create-group-form"); // Adjust to match your route for the group form page
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center">
        Groups
      </Typography>

      {/* Button to navigate to Group Form */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateGroup}
        sx={{ marginBottom: 2 }}
      >
        Create New Group
      </Button>

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
                  <Typography variant="body2" color="text.secondary">
                    {group.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Members: {group.members.join(", ")}
                  </Typography>
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
    </Container>
  );
};

export default Group;
