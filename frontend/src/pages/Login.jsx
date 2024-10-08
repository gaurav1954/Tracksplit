import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    navigate("/landing");
  };

  return (
    <Container maxWidth="xs" className="container">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card className="login-card">
          <CardContent>
            <Typography
              variant="h5"
              component="h1"
              align="center"
              className="login-header"
            >
              TrackSplit
            </Typography>
            <Typography
              variant="body2"
              align="center"
              paragraph
              className="login-description"
            >
              Welcome to TrackSplit!{" "}
              <span role="img" aria-label="wave">
                👋
              </span>{" "}
              Please sign-in to your account and start tracking
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Username"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-field"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-field"
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginY={1}
              >
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember Me"
                />
                <Button color="primary" style={{ textTransform: "none" }}>
                  Forgot Password?
                </Button>
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className="login-button"
              >
                LOGIN
              </Button>
            </form>
            <Typography align="center" variant="body2" className="signup-link">
              New on our platform?{" "}
              <Link to="/signup" className="signup-link-text">
                Create an account
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
