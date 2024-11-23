import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import CourseUpdate from '../components/UploadCourse';
import Grid from '@mui/material/Grid'; 

function UploadCourse() {
    return (
    <Grid container spacing={2}> {/* Use Grid for layout */}
    <Grid item xs={1}> {/* SideBar takes 1/4 of the width */}
      <SideBar />
    </Grid>
    <Grid item xs={11}> {/* Main content takes 3/4 of the width */}
      <Header />
      <CourseUpdate  />
    </Grid>
  </Grid>
  );
}

export default UploadCourse;
