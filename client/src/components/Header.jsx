import { useState, useEffect, React } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Snackbar,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import Joi from "joi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Popover from "@mui/material/Popover";

// Joi schema for SignIn validation
const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email.",
    }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
  }),
});

// Joi schema for SignUp validation
const signUpSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters.",
      "string.max": "Name cannot exceed 30 characters.",
      "string.pattern.base": "Name must only contain alphabets.",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email.",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.pattern.base":
        "Password must be at least 8 characters, include alphanumeric characters, and at least one special character.",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match.",
    "string.empty": "Confirm Password is required.",
  }),
  phoneNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.empty": "Phone Number is required.",
      "string.pattern.base": "Phone Number must be exactly 10 digits.",
    }),
}).with("password", "confirmPassword"); // This ensures both password and confirmPassword are used together

const Header = () => {
  const navigate = useNavigate();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

  const handleOpenSignUp = () => setOpenSignUp(true);
  const handleCloseSignUp = () => setOpenSignUp(false);

  const [isLogged, setIsLogged] = useState(false);

  //CHECK USER ALREADY LOGIN
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/protected/check-auth",
          {
            withCredentials: true, // Send cookies with the request
          }
        );
        setUser(response.data.user); // Set user data
        setIsLogged(true);
      } catch (err) {
        setUser(null);
        setIsLogged(false);
        setTimeout(() => navigate("/"), 2000);
      }
    };

    fetchUser();
  }, [navigate]);

  //SIGNIN
  const [loginformData, setloginFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleLoginChange = (e) => {
    setloginFormData({ ...loginformData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { error: validationError } = signInSchema.validate(loginformData);
    if (validationError) {
      setSnackbar({
        open: true,
        message: "" + validationError.details[0].message,
        severity: "error",
      });
      return;
    }
    try {
      // Call the backend API to check the credentials
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        loginformData,
        {
          withCredentials: true, // Include cookies with the request
        }
      );

      setUser(null);
      fetchUser();

      // Redirect on successful login
      setSnackbar({
        open: true,
        message: "Login successful! Redirecting...",
        severity: "success",
      });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };

  //SIGNUP

  const [signupformData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const handleSignupChange = (e) => {
    setSignupFormData({ ...signupformData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupformData.password !== signupformData.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match!",
        severity: "error",
      });
      return;
    }

    const { error: validationError } = signUpSchema.validate(signupformData);
    if (validationError) {
      setSnackbar({
        open: true,
        message: validationError.details[0].message,
        severity: "error",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", signupformData);
      setSnackbar({
        open: true,
        message: "Sign up successful! Please log in to continue.",
        severity: "success",
      });
      setOpenSignUp(false);
      setOpenSignIn(true);
      setSignupFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };

  //WISHLIST, NOTIFICATION, ACCOUNT
  const [anchorEl, setAnchorEl] = useState(null); // Single state to manage active popover
  const [activePopover, setActivePopover] = useState(""); // Tracks which popover is active

  // Handlers
  const handleHover = (event, popover) => {
    if (popover) {
      setAnchorEl(event.currentTarget);
      setActivePopover(popover);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setActivePopover(""); // Clear the active popover
  };

  //FETCH USER DETAILS
  const [userDetail, setUserDetail] = useState(null);
  const fetchUser = async () => {
    try {
      const isLogged = true; // Replace with your actual logic for checking login status
      if (isLogged) {
        const res = await axios.get(
          "http://localhost:5000/api/protected/fetchuserdetail",
          {
            withCredentials: true,
          }
        );
        setUserDetail(res.data.user);
        console.log(res.data.user);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  // useEffect runs only once on mount
  useEffect(() => {
    fetchUser(); // Fetch user details on mount
  }, []);
  return (
    <div>
      {/* AppBar Header */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#478eff",
          color: "#ffffff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#ffffff" }}
          >
            Tech Edu Titans
          </Typography>

          {/* Centered Search Bar */}
          <Box
            sx={{
              flexGrow: 1,
              mx: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              sx={{
                width: "50%",
                backgroundColor: "#ffffff",
                borderRadius: 1,
              }}
            />
          </Box>

          {/* Buttons */}
          {!isLogged ? (
            <Box display="flex" alignItems="center">
              <Button
                variant="outlined"
                sx={{
                  mx: 1,
                  color: "#ffffff",
                  borderWidth: 3,
                  borderColor: "#ffffff",
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#ffffff", color: "#000000" },
                }}
                onClick={handleOpenSignIn}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  mx: 1,
                  backgroundColor: "#ffffff",
                  borderWidth: 3,
                  color: "#000000",
                  "&:hover": { backgroundColor: "#01b8a7" },
                }}
                onClick={handleOpenSignUp}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 3,
                padding: 2,
              }}
            >
              {/* Wishlist */}
              <Box
                onMouseEnter={(event) => handleHover(event, "wishlist")}
                onMouseLeave={handleClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  cursor: "pointer",
                }}
              >
                <FavoriteIcon />
                <Popover
                  open={activePopover === "wishlist"}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: -10,
                    horizontal: "left",
                  }}
                  PaperProps={{
                    sx: { width: 300 },
                  }}
                >
                  <Typography sx={{ p: 2, fontWeight: "bold" }}>
                    Your wishlist is empty
                  </Typography>
                  <Button
                    sx={{
                      p: 2,
                      color: "purple",
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    Explore courses
                  </Button>
                </Popover>
              </Box>

              {/* Notifications */}
              <Box
                onMouseEnter={(event) => handleHover(event, "notifications")}
                onMouseLeave={handleClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 1,
                  cursor: "pointer",
                }}
              >
                <NotificationsIcon />
                <Popover
                  open={activePopover === "notifications"}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: -10,
                    horizontal: "left",
                  }}
                  PaperProps={{
                    sx: { width: 300 },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Notifications
                    </Typography>
                    <Typography
                      sx={{
                        color: "purple",
                        cursor: "pointer",
                        fontSize: "small",
                        fontWeight: "bold",
                      }}
                      onClick={() => alert("Settings Clicked")}
                    >
                      Settings
                    </Typography>
                  </Box>
                  <Divider />
                  <Typography sx={{ p: 2, color: "gray" }}>
                    No notifications.
                  </Typography>
                </Popover>
              </Box>

              {/* Account */}
              <Box
                onMouseEnter={(event) => handleHover(event, "account")}
                onMouseLeave={handleClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <AccountCircleIcon />
                <Popover
                  open={activePopover === "account"}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: -10,
                    horizontal: "left",
                  }}
                  PaperProps={{
                    sx: { width: 300 },
                  }}
                >
                  <Box
                    sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <Avatar sx={{ bgcolor: "purple" }}>
                      {userDetail?.name?.charAt(0) || ""}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {userDetail?.name || "Guest"}
                      </Typography>
                      <Typography sx={{ fontSize: "small", color: "gray" }}>
                        {userDetail?.email || "No email provided"}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <List>
                    {userDetail?.role === "Student" ? (
                      <ListItem button="true">
                        <ListItemText primary="My Learning" />
                      </ListItem>
                    ) : (
                      <ListItem button="true">
                        <ListItemText primary="My Course" />
                      </ListItem>
                    )}                    
                    <ListItem button="true">
                      <ListItemText primary="Wishlist" />
                    </ListItem>
                    <Divider />
                    <ListItem button="true">
                      <ListItemText primary="Notifications" />
                    </ListItem>
                    <ListItem button="true">
                      <ListItemText primary="Messages" />
                    </ListItem>
                    <Divider />
                    <ListItem button="true">
                      <ListItemText primary="Account Settings" />
                    </ListItem>
                    <ListItem button="true">
                      <ListItemText primary="Help and Support" />
                    </ListItem>
                    <ListItem button="true">
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Popover>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Sign In Modal */}
      <Modal open={openSignIn} onClose={handleCloseSignIn}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#f4f4f4",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="#356bcc" marginLeft={20}>
              Sign In
            </Typography>
            <IconButton onClick={handleCloseSignIn}>
              <CloseIcon />
            </IconButton>
          </Box>
          {error && (
            <Typography
              color="error"
              align="center"
              style={{ marginBottom: "10px" }}
            >
              {error}
            </Typography>
          )}
          {/* Form for Sign In */}
          <form onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={loginformData.email}
              onChange={handleLoginChange}
              placeholder="Enter your email"
              InputProps={{
                inputProps: {
                  style: { color: loginformData.email ? "#000" : "#aaa" },
                },
              }}
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
              value={loginformData.password}
              onChange={handleLoginChange}
              placeholder="Enter your password"
              InputProps={{
                inputProps: {
                  style: { color: loginformData.password ? "#000" : "#aaa" },
                },
              }}
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#478eff",
                "&:hover": { backgroundColor: "#356bcc" },
              }}
            >
              Sign In
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
          >
            Forgot Password? |{" "}
            <span
              style={{ color: "#6200ea", cursor: "pointer" }}
              onClick={() => {
                handleCloseSignIn();
                handleOpenSignUp();
              }}
            >
              Sign Up
            </span>
          </Typography>
        </Box>
      </Modal>

      {/* Sign Up Modal */}
      <Modal open={openSignUp} onClose={handleCloseSignUp}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#f4f4f4",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" color="#356bcc" marginLeft={20}>
              Sign Up
            </Typography>
            <IconButton onClick={handleCloseSignUp}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Form for Sign Up */}
          <form onSubmit={handleSignupSubmit}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              variant="outlined"
              margin="normal"
              value={signupformData.name}
              onChange={handleSignupChange}
              placeholder="Enter your name"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={signupformData.email}
              onChange={handleSignupChange}
              placeholder="Enter your email"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
              value={signupformData.password}
              onChange={handleSignupChange}
              placeholder="Enter your password"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              margin="normal"
              value={signupformData.confirmPassword}
              onChange={handleSignupChange}
              placeholder="Confirm your password"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              margin="normal"
              value={signupformData.phoneNumber}
              onChange={handleSignupChange}
              placeholder="Enter your phone number"
              style={{ backgroundColor: "#fff", borderRadius: "5px" }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#478eff",
                "&:hover": { backgroundColor: "#356bcc" },
              }}
            >
              Sign Up
            </Button>
          </form>

          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
          >
            Already have an account?{" "}
            <span
              style={{ color: "#6200ea", cursor: "pointer" }}
              onClick={() => {
                handleCloseSignUp();
                handleOpenSignIn();
              }}
            >
              Sign In
            </span>
          </Typography>
        </Box>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "", severity: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Top center alignment
      >
        <Alert
          onClose={() =>
            setSnackbar({ open: false, message: "", severity: "" })
          }
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Header;
