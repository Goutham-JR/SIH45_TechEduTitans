import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Snackbar,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page and follow the instructions to reset your password.",
  },
  {
    question: "How do I change my email address?",
    answer: "Go to your profile settings and click on 'Change Email' to update your email address.",
  },
  {
    question: "Where can I find my course progress?",
    answer: "You can view your course progress under the 'Dashboard' section of your profile.",
  },
  {
    question: "How do I make a payment?",
    answer: "Navigate to the 'Payments' section, select the course you want to pay for, and follow the payment instructions.",
  },
];

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API call to submit the message
    setTimeout(() => {
      setLoading(false);
      setContactMessage("");
      setSnackbarOpen(true);
      setMessage("Your message has been submitted. Our support team will contact you soon.");
    }, 2000);
  };

  return (
    <Box maxWidth={1200} margin="auto" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Support & Help Center
      </Typography>

      {/* FAQ Section */}
      <Typography variant="h5" gutterBottom>
        Frequently Asked Questions
      </Typography>

      <Grid container spacing={4}>
        {faqs.map((faq, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Contact Form Section */}
      <Typography variant="h5" gutterBottom>
        Contact Support
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        If you couldn't find the answer in the FAQ section, feel free to contact our support team.
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleContactSubmit}>
          <TextField
            fullWidth
            label="Your Message"
            multiline
            rows={4}
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box sx={{ textAlign: "center" }}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button variant="contained" color="primary" type="submit">
                Send Message
              </Button>
            )}
          </Box>
        </form>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={message}
      />
    </Box>
  );
};

export default SupportPage;
