import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
  TextField,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../components/Header";
import { Margin } from "@mui/icons-material";


const Home = () => {
  const carouselData = [
    {
      image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?fit=crop&w=1200&q=80",
      title: "React for Beginners",
      description: "Master React and build modern web applications.",
    },
    {
      image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?fit=crop&w=1200&q=80",
      title: "Python for Data Science",
      description: "Learn Python and excel in Data Science.",
    },
    {
      image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?fit=crop&w=1200&q=80",
      title: "SEO Masterclass",
      description: "Boost your business with advanced SEO techniques.",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div>
        <Header /> 
      </div>
            
      {/* Hero Section with Slideshow */}
      <Box sx={{ mt: 0 }}>
        <Slider {...sliderSettings} >
          {carouselData.map((item, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                height: "400px",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "125px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {item.description}
                </Typography>
                <Button variant="contained" color="secondary">
                  Enroll Now
                </Button>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Categories Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Categories
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Web Development",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?fit=crop&w=400&q=80",
            },
            {
              title: "Data Science",
              image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?fit=crop&w=400&q=80",
            },
            {
              title: "Digital Marketing",
              image: "https://images.unsplash.com/photo-1581093458790-9c40b09d798d?fit=crop&w=400&q=80",
            },
          ].map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Courses Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Popular Courses
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "React for Beginners",
              description: "Learn React from scratch.",
              price: "$19.99",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?fit=crop&w=400&q=80",
            },
            {
              title: "Python for Data Science",
              description: "Master Python for data analysis.",
              price: "$29.99",
              image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?fit=crop&w=400&q=80",
            },
            {
              title: "SEO & Marketing",
              description: "Boost your business with SEO.",
              price: "$15.99",
              image: "https://images.unsplash.com/photo-1581093458790-9c40b09d798d?fit=crop&w=400&q=80",
            },
          ].map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={course.image}
                  alt={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    {course.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          py: 3,
          textAlign: "center",
          mt: 4,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} MyLearning. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
