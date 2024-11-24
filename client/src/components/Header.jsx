import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Badge,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  // Handle Profile Dropdown
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Toggle Login State (for demo purposes)
  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#3f51b5",
          paddingX: 2,
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* Left: App Name */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Student App
            </Typography>
          </Box>

          {/* Center: Search Bar */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "5px 15px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <SearchIcon sx={{ color: "gray", marginRight: 1 }} />
            <InputBase
              placeholder="Search for courses, videos, or resources..."
              fullWidth
              sx={{ fontSize: "1rem" }}
            />
          </Box>

          {/* Right: Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <IconButton color="inherit" aria-label="notifications">
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                {/* Wishlist */}
                <IconButton color="inherit" aria-label="wishlist">
                  <Badge badgeContent={2} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                {/* Profile */}
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{ mt: 2 }}
                >
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setSignUpOpen(true);
                      handleMenuClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => setSignInOpen(true)}
                  sx={{
                    textTransform: "none",
                    color: "white",
                    borderColor: "white",
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setSignUpOpen(true)}
                  sx={{ textTransform: "none", color: "white" }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sign-In Dialog */}
      <Dialog
  open={signInOpen}
  onClose={() => setSignInOpen(false)}
  sx={{
    "& .MuiDialog-paper": {
      width: "100%", // Full width
      maxWidth: "400px", // Restrict max width
      margin: "0 auto", // Center align
      padding: "20px", // Add padding
      borderRadius: "10px", // Rounded corners
    },
  }}
>
  <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
    Sign In
  </DialogTitle>
  <DialogContent>
    <SignIn />
  </DialogContent>
  <DialogActions
    sx={{
      justifyContent: "center",
      paddingBottom: "10px",
    }}
  >
    <Button
      variant="contained"
      color="primary"
      onClick={() => setSignInOpen(false)}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
};

export default AppHeader;
