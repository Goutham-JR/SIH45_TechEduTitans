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
<<<<<<< Updated upstream
import SignIn from "./SignIn"; // Replace with your actual SignIn component
import SignOut from "./SignUp"; // Replace with your actual SignOut component
=======
import SignIn from "./SignIn";
import SignOut from "./SignUp";
>>>>>>> Stashed changes

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  const [SignInopen, setSignInOpen] = useState(false);
  const [SignOutopen, setSignOutopen] = useState(false);

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
<<<<<<< Updated upstream

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
                      setSignOutOpen(true);
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
                  onClick={() => setSignInOpen(true)}
                  sx={{ textTransform: "none", color: "white" }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sign In Dialog */}
      <Dialog open={signInOpen} onClose={() => setSignInOpen(false)}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <SignIn />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSignInOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Sign Out Dialog */}
      <Dialog open={signOutOpen} onClose={() => setSignOutOpen(false)}>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogContent>
          <SignOut />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSignOutOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleLoginLogout();
              setSignOutOpen(false);
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
=======
            {
              isLoggedIn?(
                <>
                <IconButton color="inherit"
                onClick={handleMenuOpen} 
                aria-controls="profile-menu"
                aria-haspopup="true"
                >
              <AccountCircleIcon/>
                </IconButton>
              <Menu
              id="profile:menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{mt:2}}

              >
                <MenuItem onClick={handleMenuClose}>
                Profile </MenuItem>

                <MenuItem onClick={handleMenuClose}>
                Settings </MenuItem>

                <MenuItem onClick={()=>{setSignOutopen(true);
                handleMenuClose();
                }}>
                Logout </MenuItem>
              </Menu>
                </>
              ):(
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
                onClick={() => setSignOutopen(true)}
                sx={{ textTransform: "none", color: "white" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
    
          <Dialog open={SignInopen}
          onClose={()=>setSignInOpen(false)}>
          <DialogTitle>
            SignIn
          </DialogTitle>
          <DialogContent>
            <SignIn/>
          </DialogContent>
          <DialogActions>
            <Button onclick={()=>setSignInOpen(false)}>Close</Button>
          </DialogActions>
          </Dialog>

          <Dialog open={SignOutopen}
          onClose={()=>setSignOutopen(false)}>
          <DialogTitle>
            Sign Out
          </DialogTitle>
          <DialogContent>
            <SignOut/>
          </DialogContent>
          <DialogActions>
            <Button onclick={()=>setSignOutopen(false)}>Cancel</Button>
            <Button onClick={()=>{handleLoginLogout(); 
              setSignOutopen(false);
            }}>Logout</Button>
          </DialogActions>
          </Dialog>
          </>
>>>>>>> Stashed changes
  );
};

export default AppHeader;
