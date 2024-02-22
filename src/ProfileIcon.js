import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from 'react-router-dom';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

const ProfileIcon = ({ userEmail, setUserEmail }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const handleProfileDialogClose = () => {
    setProfileDialogOpen(false);
  };

  const handleSignOut = () => {
    navigate("/login");
  };

  return (
    <>
      <Avatar alt="Profile" onClick={handleClick} />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My Bookings</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>

      <Dialog open={profileDialogOpen} onClose={handleProfileDialogClose}>
        <DialogTitle>My Profile</DialogTitle>
        <DialogContent>
          
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileIcon;
