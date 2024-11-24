import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

// Dummy data for payment history
const paymentHistory = [
  {
    id: 1,
    amount: 50.0,
    date: "2024-11-20",
    status: "Paid",
  },
  {
    id: 2,
    amount: 30.0,
    date: "2024-11-15",
    status: "Paid",
  },
  {
    id: 3,
    amount: 60.0,
    date: "2024-11-10",
    status: "Pending",
  },
];

const PaymentsPage = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handle making a payment
  const handlePayment = () => {
    if (amount <= 0) {
      setSnackbarMessage("Please enter a valid payment amount.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSnackbarMessage("Payment successful!");
      setSnackbarOpen(true);
      setAmount("");
    }, 2000);
  };

  return (
    <Box maxWidth={1200} margin="auto" p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Payment Page
      </Typography>

      {/* Payment History Section */}
      <Typography variant="h5" gutterBottom>
        Payment History
      </Typography>

      <Grid container spacing={4}>
        {paymentHistory.map((payment) => (
          <Grid item xs={12} sm={6} md={4} key={payment.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  ${payment.amount}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {payment.date}
                </Typography>
                <Typography
                  variant="body2"
                  color={payment.status === "Paid" ? "green" : "orange"}
                >
                  Status: {payment.status}
                </Typography>
              </CardContent>
              <CardActions>
                {payment.status === "Pending" && (
                  <Button variant="outlined" color="primary">
                    Retry Payment
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Make a Payment Section */}
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5">Make a Payment</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Please enter the amount you want to pay.
        </Typography>

        <TextField
          type="number"
          fullWidth
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mt: 2 }}
        />

        <Box sx={{ mt: 3 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePayment}
            >
              Pay Now
            </Button>
          )}
        </Box>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default PaymentsPage;
