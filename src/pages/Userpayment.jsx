import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = (e) => {
    e.preventDefault();
    // Payment logic here
    alert(`Payment Successful using ${paymentMethod}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Select Payment Method
        </Typography>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Choose one</FormLabel>
          <RadioGroup
            row
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel value="card" control={<Radio />} label="Card" />
            <FormControlLabel value="gpay" control={<Radio />} label="Google Pay" />
            <FormControlLabel value="paytm" control={<Radio />} label="Paytm" />
            <FormControlLabel value="phonepe" control={<Radio />} label="PhonePe" />
          </RadioGroup>
        </FormControl>

        <Box component="form" onSubmit={handlePayment} noValidate sx={{ mt: 3 }}>
          {paymentMethod === 'card' && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Cardholder Name"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  variant="outlined"
                  inputProps={{ maxLength: 16 }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date"
                  placeholder="MM/YY"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  variant="outlined"
                  type="password"
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>
            </Grid>
          )}

          {paymentMethod !== 'card' && (
            <Typography sx={{ mt: 2, mb: 1 }} color="text.secondary">
              You will be redirected to <strong>{paymentMethod.toUpperCase()}</strong> to complete your payment.
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              backgroundColor: "#c69087",
              borderRadius: '8px',
              mt: 3,
            }}
          >
            Pay Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentPage;