import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBar = () => {
  const menuItemsTop = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Analytics', icon: <AnalyticsIcon /> },
    { text: 'Calendar', icon: <CalendarMonthIcon /> },
  ];

  const menuItemsBottom = [
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Logout', icon: <LogoutIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 80, // Minimized sidebar width
        height: '100vh',
        backgroundColor: '#f5f5f5',
        boxShadow: 1,
        position: 'fixed',
      }}
    >
      <List>
        {menuItemsTop.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              padding: '8px',
              '&:hover .text': {
                visibility: 'visible',
                position: 'absolute',
                left: '80px', // Position text outside the sidebar
                backgroundColor: '#ffffff',
                padding: '4px 8px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 40, // Space for icon
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                className="text"
                sx={{
                  visibility: 'hidden', // Initially hidden
                  whiteSpace: 'nowrap',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {menuItemsBottom.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              padding: '8px',
              '&:hover .text': {
                visibility: 'visible',
                position: 'absolute',
                left: '80px',
                backgroundColor: '#ffffff',
                padding: '4px 8px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                className="text"
                sx={{
                  visibility: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
