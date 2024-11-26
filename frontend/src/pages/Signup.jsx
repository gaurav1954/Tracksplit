import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    phoneNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/auth/signup`, credentials);
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
      [e.target.name]: e.target.value,
    });
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
              Create an account to start splitting expenses with your friends!
            </Typography>
            <form onSubmit={handleSignup}>
              <TextField
                label="Username"
                name="username"
                type="text"
                fullWidth
                margin="normal"
                value={credentials.username}
                onChange={handleChange}
                required
                className="text-field"
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                fullWidth
                margin="normal"
                value={credentials.phoneNumber}
                onChange={handleChange}
                required
                className="text-field"
              />
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
              <Button variant="contained" color="primary" type="submit" fullWidth className="login-button">
                Signup
              </Button>
            </form>
            <Typography align="center" variant="body2" className="signup-link">
              Already have an account?{' '}
              <Link to="/login" className="signup-link-text">
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Signup;
