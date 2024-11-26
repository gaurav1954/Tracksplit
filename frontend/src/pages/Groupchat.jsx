import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Grid,
} from "@mui/material";

const GroupChat = () => {
  const { group_id } = useParams(); // Get group_id from route parameters

  // Access state data using useSelector
  const group = useSelector((state) =>
    state.user.groups.find((g) => g.id === group_id)
  );
  const currentUser = useSelector((state) => state.user.user.username);

  // Guard clause in case the group is not found
  if (!group) {
    return (
      <Container maxWidth="sm" sx={{ marginTop: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundColor: "error.main",
            color: "white",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Group Not Found
          </Typography>
        </Box>
      </Container>
    );
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      {/* Group Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          backgroundColor: "primary.main",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {group.name}
        </Typography>
      </Box>

      {/* Group Members - Horizontal Scroll */}
      <Box
        sx={{
          marginTop: 2,
          overflowX: "auto",
          display: "flex",
          gap: 2,
          padding: 2,
          backgroundColor: "grey.100",
          borderRadius: "8px",
        }}
      >
        {group.members.map((member) => (
          <Box
            key={member.id}
            sx={{
              textAlign: "center",
              width: "80px",
            }}
          >
            <Avatar sx={{ margin: "0 auto", bgcolor: "primary.main" }}>
              {member.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="caption">{member.username}</Typography>
          </Box>
        ))}
      </Box>

      {/* Chat Box */}
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {group.expenses.map((expense) => (
          <Box
            key={expense.id}
            sx={{
              display: "flex",
              justifyContent:
                expense.paidBy.username === currentUser
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                maxWidth: "70%",
                backgroundColor:
                  expense.paidBy.username === currentUser
                    ? "primary.light"
                    : "grey.100",
                color:
                  expense.paidBy.username === currentUser
                    ? "primary.contrastText"
                    : "text.primary",
                borderRadius: "12px",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  textAlign={
                    expense.paidBy.username === currentUser ? "right" : "left"
                  }
                >
                  Paid by: {expense.paidBy.username === currentUser
                    ? "YOU"
                    : expense.paidBy.username}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  ₹{expense.amount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expense.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign={
                    expense.paidBy.username === currentUser ? "right" : "left"
                  }
                  display="block"
                  mt={1}
                >
                  {formatDate(expense.date)}
                </Typography>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default GroupChat;
