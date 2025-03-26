import React from "react";
import { Container, TextField, Button, Typography, Grid, Paper } from "@mui/material";

const ContactUs = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4,marginTop:"90px" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          Have questions? Feel free to reach out to us!
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full Name" variant="outlined" required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" variant="outlined" type="email" required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Message" variant="outlined" multiline rows={4} required />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} fullWidth>
              Send Message
            </Button>
          </Grid>
        </Grid>

        <Typography align="center" variant="h6" sx={{ mt: 4 }}>
          Our Contact Information
        </Typography>
        <Typography align="center"  variant="body1">📍 Address: 123 Rental St, Tourist City</Typography>
        <Typography align="center"  variant="body1">📞 Phone: +1 234 567 890</Typography>
        <Typography align="center"  variant="body1">✉ Email: support@twowheelerrentals.com</Typography>
      </Paper>
    </Container>
  );
};

export default ContactUs;
