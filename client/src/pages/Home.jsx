import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Grid, Card, CardContent, CardMedia, Container } from "@mui/material";
import Header from '../components/Header'

const Home = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static" color="primary">
        <Header />
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: "400px",
          backgroundColor: "lightblue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "black",
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to My Website
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Discover amazing content and features.
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: "Feature 1", description: "Description of feature 1." },
            { title: "Feature 2", description: "Description of feature 2." },
            { title: "Feature 3", description: "Description of feature 3." },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/300"
                  alt={feature.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
