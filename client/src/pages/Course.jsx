import React, { useState } from "react";
import { Container, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactPlayer from "react-player";
import SideBar from "../components/SideBar";

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
    <>
    <SideBar></SideBar>
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 3, textAlign: "center" }}>
        Course Overview
      </Typography>

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

        {/* Right Sidebar: Weekly Topics */}
        <Grid item xs={12} md={4}>
          {courseContent.map((week, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{week.week}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {week.topics.map((topic, subIndex) => (
                  <Box
                    key={subIndex}
                    sx={{
                      mb: 1,
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleTopicClick(topic)}
                  >
                    <Typography>
                      {topic.title} <span style={{ color: "gray" }}>({topic.duration})</span>
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Container>
    </>
  );
}

export default Course;
