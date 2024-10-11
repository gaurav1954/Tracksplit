import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import './signup.css';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    phoneNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, phoneNumber, password } = credentials;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.post(`${apiUrl}/auth/signup`, {
        username,
        phoneNumber,
        password
      });

      if (response.status === 200) {
        console.log('Signup successful');
        navigate('/login');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error.response ? error.response.data : error.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="xs" className="container">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h5" component="h1" align="center" className="signup-header">
          Signup
        </Typography>
        <form onSubmit={handleSignup} className="signup-form">
          <TextField
            label="Username"
            type="text"
            name="username"
            fullWidth
            margin="normal"
            value={credentials.username}
            onChange={handleChange}
            required
            className="text-field"
          />
          <TextField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            fullWidth
            margin="normal"
            value={credentials.phoneNumber}
            onChange={handleChange}
            required
            className="text-field"
          />

          {/* Password field with visibility toggle */}
          <FormControl fullWidth variant="outlined" margin="normal" className="text-field">
            <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={credentials.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              required
            />
          </FormControl>

          <Button variant="contained" color="primary" type="submit" fullWidth className="signup-button">
            Signup
          </Button>
        </form>
        <Typography align="center" variant="body2" className="login-link">
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
