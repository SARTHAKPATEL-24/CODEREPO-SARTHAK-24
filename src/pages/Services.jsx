import React from "react";
import { Container, Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";

const services = [
  {
    title: "Two-Wheeler Rentals",
    description: "Rent a variety of two-wheelers at affordable prices. Daily, weekly, and monthly plans available.",
    image: "https://source.unsplash.com/400x300/?motorbike"
  },
  {
    title: "Second-Hand Sales",
    description: "Buy certified second-hand two-wheelers in excellent condition with full documentation.",
    image: "https://source.unsplash.com/400x300/?scooter"
  },
  {
    title: "Repairs & Services",
    description: "Get your two-wheeler serviced by experts. We offer maintenance, repairs, and part replacements.",
    image: "https://source.unsplash.com/400x300/?mechanic"
  }
];

const Services = () => {
  return (
    <Container sx={{ py: 5, marginTop:"80px" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Our Services
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 350, mx: "300", boxShadow: 3,maxHeight:300 }}>
              <CardMedia component="img" height="180" image={service.image} alt={service.title} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
