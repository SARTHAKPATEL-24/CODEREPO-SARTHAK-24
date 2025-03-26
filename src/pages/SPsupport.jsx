import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SupportPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5,mt:5 }}>
      <Typography variant="h4" gutterBottom>
        Service Provider Support
      </Typography>
      <Typography variant="body1" paragraph>
        Need help with managing your rentals, listings, or payments? Contact us using the form below or check the FAQs.
      </Typography>

      {/* Support Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Contact Support
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Full Name" variant="outlined" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" type="email" variant="outlined" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Subject" variant="outlined" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Message" multiline rows={4} variant="outlined" required />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Typography variant="h5" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I list my two-wheeler for rent?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can list your vehicle by logging into your provider dashboard and adding a new listing with details and images.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I receive payments?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Payments are processed through our secure system and transferred to your registered bank account on a weekly basis.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>How do I contact customer support?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can reach us through the contact form above or email us at support@yourwebsite.com.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default SupportPage;
