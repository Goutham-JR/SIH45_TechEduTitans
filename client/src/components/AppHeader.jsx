import { Box, Alert, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AppHeader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
      {/* App Name with School Icon (on the left side) */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Student App
        </Typography>
      </Box>
      {/* User Profile (on the right side) */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
       
        <Alert severity="info" >
           {/* Notification Alert (in the center) */}
        <NotificationsIcon sx={{ marginRight: 1 }} />
        </Alert>
        <AccountCircleIcon sx={{ margin: 3 }} />
      </Box>
    </Box>
  );
}

export default AppHeader;
