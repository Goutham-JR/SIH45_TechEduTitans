import React from 'react';
import { Box, Button, Container, TextField, Typography, Avatar, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProfileContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100vh',
});

const Sidebar = styled(Box)(({ theme }) => ({
  width: '25%',
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const ProfilePicture = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

const PictureCircle = styled(Avatar)({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: '#d3d3d3',
  marginBottom: '10px',
});

const FormSection = styled(Box)(({ theme }) => ({
  width: '75%',
  padding: theme.spacing(4),
}));

const ProfileFormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ProfileForm = () => {
  return (
    <ProfileContainer>
      <Sidebar>
        <ProfilePicture>
          <PictureCircle />
          <Typography variant="h6">Goutham</Typography>
        </ProfilePicture>
        <List component="nav" aria-label="sidebar-menu">
          <ListItem button>
            <ListItemText primary="Overview" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Security" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Skills" />
          </ListItem>
        </List>
      </Sidebar>
      <FormSection>
        <Container>
          <ProfileFormContainer noValidate autoComplete="off">
            <TextField label="Name" variant="outlined" fullWidth />
            <TextField label="Email" variant="outlined" fullWidth />
            <TextField label="DOB" variant="outlined" type="date" InputLabelProps={{ shrink: true }} fullWidth />
            <TextField label="Phone Number" variant="outlined" fullWidth />
          </ProfileFormContainer>
        </Container>
      </FormSection>
    </ProfileContainer>
  );
};

export default ProfileForm;
