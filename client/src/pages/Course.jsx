import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import CourseVideo from '../components/CourseVideo';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function Course() {
  const [currentVideo, setCurrentVideo] = useState(null);

  // Example resources data for each video
  const videoResources = {
    "Video 1": [
      { title: "Resource 1", url: "https://example.com/resource1" },
      { title: "Resource 2", url: "https://example.com/resource2" },
    ],
    "Video 2": [
      { title: "Resource A", url: "https://example.com/resourceA" },
      { title: "Resource B", url: "https://example.com/resourceB" },
    ],
  };

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Header Section */}
      <Box
        sx={{
          flexShrink: 0,
          backgroundColor: '#3f51b5',
          color: 'white',
          padding: 2,
        }}
      >
        <Header video={currentVideo} />
      </Box>

      {/* Content Section */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', marginTop: 3 }}>
        {/* Sidebar Section */}
        <Box
          sx={{
            width: '9%',
            backgroundColor: '#f5f5f5',
            borderRight: '1px solid #ddd',
            overflowY: 'auto',
          }}
        >
          <SideBar onVideoSelect={handleVideoSelect} />
        </Box>

        {/* Resources Section */}
        <Box
          sx={{
            width: '30%',
            backgroundColor: '#f9f9f9',
            borderRight: '1px solid #ddd',
            padding: 2,
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Resources
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          {currentVideo && videoResources[currentVideo] ? (
            <List>
              {videoResources[currentVideo].map((resource, index) => (
                <ListItem key={index} sx={{ paddingY: 1 }}>
                  <ListItemText
                    primary={resource.title}
                    secondary={
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: '#3f51b5' }}
                      >
                        {resource.url}
                      </a>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No resources available for this video.
            </Typography>
          )}
        </Box>

        {/* Main Content Section (Video Player) */}
        <Box
          sx={{
            flexGrow: 1,
            padding: 2,
            overflowY: 'auto',
          }}
        >
          <CourseVideo video={currentVideo} />
        </Box>
      </Box>
    </Box>
  );
}

export default Course;
