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
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../features/authSlice"; // Auth actions
import { setUser, setFriends, setGroups } from "../features/userSlice"; // User actions
import "./login.css";

const Login = () => {
  // Single state for both phoneNumber and password
  const [credentials, setCredentials] = useState({
    phoneNumber: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Update the state for both phoneNumber and password
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Step 1: Login call
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        credentials // Send credentials object (phoneNumber, password)
      );

      // Step 2: Dispatch login action to update isAuthenticated
      dispatch(login());

      // Store token in localStorage or sessionStorage for future requests
      localStorage.setItem("token", response.data.token);

      // Step 3: Fetch user details, friends, and groups
      const userDetailsResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/details`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`, // Include token in headers
          },
        }
      );

      // Step 4: Dispatch user details to Redux store
      dispatch(setUser(userDetailsResponse.data.user));
      dispatch(setFriends(userDetailsResponse.data.friends));
      dispatch(setGroups(userDetailsResponse.data.groups));

      // Redirect to landing page after successful login
      navigate("/landing");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="xs" className="container">
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card className="login-card">
          <CardContent>
            <Typography variant="h5" component="h1" align="center" className="login-header">
              TrackSplit
            </Typography>
            <Typography variant="body2" align="center" paragraph className="login-description">
              Welcome to TrackSplit!{" "}
              <span role="img" aria-label="wave">
                👋
              </span>{" "}
              Please sign-in to your account and start tracking
            </Typography>
            {error && (
              <Typography color="error" align="center" paragraph>
                {error}
              </Typography>
            )}
            <form onSubmit={handleLogin}>
              <TextField
                label="Phone Number"
                name="phoneNumber" // Specify the name to update state
                type="text"
                fullWidth
                margin="normal"
                value={credentials.phoneNumber}
                onChange={handleChange}
                required
                className="text-field"
              />
              <TextField
                label="Password"
                name="password" // Specify the name to update state
                type="password"
                fullWidth
                margin="normal"
                value={credentials.password}
                onChange={handleChange}
                required
                className="text-field"
              />
              <Box display="flex" justifyContent="space-between" alignItems="center" marginY={1}>
                <FormControlLabel control={<Checkbox color="primary" />} label="Remember Me" />
                <Button color="primary" style={{ textTransform: "none" }}>
                  Forgot Password?
                </Button>
              </Box>
              <Button variant="contained" color="primary" type="submit" fullWidth className="login-button">
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
