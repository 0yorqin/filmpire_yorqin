import React, { useEffect } from 'react';
import { userSelector } from '../../features/auth';
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

const Profile = () => {
  const { user } = useSelector(userSelector);
  const favouriteMovies = [];
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouriteMovies.length ? (
        <Typography variant="h5">
          Add your favourite movies to see them here.
        </Typography>
      ) : (
        <Box>Favourite Movies</Box>
      )}
    </Box>
  );
};

export default Profile;
