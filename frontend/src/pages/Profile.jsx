import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetUser } from '../features/userSlice'; // Adjust the path to your user slice
import { logout } from '../features/authSlice';   // Adjust the path to your auth slice

import { Avatar, Typography, Button, TextField, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

// Sample avatars array
const avatars = [
    '/avatars/avatar1.jpg',
    '/avatars/avatar2.jpg',
    '/avatars/avatar3.jpg',
    '/avatars/avatar4.jpg',
];

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Retrieve user data from Redux
    const user = useSelector((state) => state.user.user);

    const [profileData, setProfileData] = useState({
        name: user?.username || 'Username',
        phoneNumber: user?.phoneNumber || '000-000-0000',
        avatar: user?.avatar || '',
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        // Randomly assign an avatar if no avatar is assigned
        if (!profileData.avatar) {
            const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
            setProfileData((prevData) => ({ ...prevData, avatar: randomAvatar }));
        }
    }, [profileData.avatar]);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        setEditMode(false);
        // Optionally, dispatch an action to update the Redux state or save to the server
        // dispatch(updateUserProfile(profileData));
    };

    const handleLogout = () => {
        // Dispatch actions to reset auth and user slices
        dispatch(logout());
        dispatch(resetUser());

        // Redirect to login page
        navigate('/login');
    };

    return (
        <Container maxWidth="sm" className="profile-container">
            <Box display="flex" justifyContent="center" mb={4}>
                <Avatar
                    src={profileData.avatar}
                    alt="Profile"
                    sx={{ width: 100, height: 100 }}
                />
            </Box>
            <Typography variant="h5" align="center" gutterBottom>
                {profileData.name}
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                {profileData.phoneNumber}
            </Typography>

            {editMode ? (
                <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                    <TextField
                        label="Name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone Number"
                        value={profileData.phoneNumber}
                        onChange={(e) =>
                            setProfileData({ ...profileData, phoneNumber: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Box>
            ) : (
                <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                    <Button variant="contained" color="primary" onClick={handleEdit}>
                        Edit Profile
                    </Button>
                </Box>
            )}
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>

                {/* Log Out Button */}
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Log Out
                </Button>
            </Box>
        </Container>
    );
};

export default Profile;
