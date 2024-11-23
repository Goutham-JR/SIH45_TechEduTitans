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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
            maxWidth: "600px", // Limits the width for better alignment
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
          {/* Notifications and Wishlist (Only visible when logged in) */}
          {isLoggedIn && (
            <>
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={2} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </>
          )}

          {/* Login/Sign-Up or Profile Dropdown */}
          {isLoggedIn ? (
            <>
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
                    handleLoginLogout();
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
                onClick={handleLoginLogout}
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
                onClick={handleLoginLogout}
                sx={{ textTransform: "none", color: "white" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
