import React, { useState } from "react";
import { Container, Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactPlayer from "react-player";
import SideBar from "../components/SideBar";

const App = () => {
  const [currentVideo, setCurrentVideo] = useState({
    title: "Introduction to AI Hardware",
    description: "This video provides an introduction to the components of AI hardware, including GPUs and CPUs.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "10:15",
  });

  const courseContent = [
    {
      week: "Week 1",
      topics: [
        {
          title: "Introduction to AI Hardware",
          description: "This video provides an introduction to the components of AI hardware, including GPUs and CPUs.",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          duration: "10:15",
        },
        {
          title: "Introduction to System Software",
          description: "Learn about system software and its role in AI systems.",
          videoUrl: "https://www.youtube.com/watch?v=3tmd-ClpJxA",
          duration: "12:30",
        },
      ],
    },
    {
      week: "Week 2",
      topics: [
        {
          title: "Introduction to Containers",
          description: "Explore the basics of containers and their use in AI development.",
          videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
          duration: "15:45",
        },
        {
          title: "Kubernetes Deep Dive",
          description: "A deep dive into Kubernetes and orchestration tools for AI.",
          videoUrl: "https://www.youtube.com/watch?v=ZZ5LpwO-An4",
          duration: "14:20",
        },
      ],
    },
    {
      week: "Week 3",
      topics: [
        {
          title: "DeepOps Overview",
          description: "Overview of DeepOps tools for AI workload management.",
          videoUrl: "https://www.youtube.com/watch?v=ENgLmfZlu9g",
          duration: "11:50",
        },
        {
          title: "Building Compute Clusters",
          description: "Learn how to build high-performance compute clusters for AI.",
          videoUrl: "https://www.youtube.com/watch?v=OPf0YbXqDm0",
          duration: "13:00",
        },
      ],
    },
    // Add more weeks and topics as needed
  ];

  const handleTopicClick = (topic) => {
    setCurrentVideo({
      title: topic.title,
      description: topic.description,
      videoUrl: topic.videoUrl,
      duration: topic.duration,
    });
  };

  return (
    <>
    <SideBar></SideBar>
    <Container>
      <Typography variant="h4" sx={{ mt: 3, mb: 3, textAlign: "center" }}>
        Course Overview
      </Typography>

      <Grid container spacing={4}>
        {/* Center: Video Player */}
        <Grid item xs={12} md={8}>
          <Box sx={{ position: "relative", paddingTop: "56.25%", width: "100%" }}>
            <ReactPlayer
              url={currentVideo.videoUrl}
              controls
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {currentVideo.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {currentVideo.description}
            </Typography>
            <Typography variant="caption" sx={{ display: "block", mt: 1, color: "gray" }}>
              Duration: {currentVideo.duration}
            </Typography>
          </Box>
        </Grid>

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
};

export default App;
