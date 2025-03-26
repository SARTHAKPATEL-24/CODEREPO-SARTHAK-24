import React from "react";
import { Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const AboutUs = () => {
  return (
    <Container sx={{ py: 5,marginTop:"60px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        About Us!
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Welcome to <strong>GlideGo</strong>, your ultimate platform for renting, buying, selling, and servicing two-wheelers in top tourism destinations.
      </Typography>
      
      <Grid container spacing={4} sx={{ mt: 3 }}>
        {/* Rental Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://content.jdmagicbox.com/comp/koraput/b3/9999p6852.6852.231230220109.s4b3/catalogue/lovekoraput-rental-koraput-bike-on-rent-hnx8q1zvs7.jpg"
              alt="Bike Rentals"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Two-Wheeler Rentals
              </Typography>
              <Typography color="text.secondary">
                Rent scooters and bikes at affordable prices for an unforgettable travel experience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Buy & Sell Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeFYyPQiz48IzL1kGhht2_7BIX51yeWb_qA&s"
              alt="Buy and Sell Bikes"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Buy & Sell Bikes
              </Typography>
              <Typography color="text.secondary">
                Connect with verified buyers and sellers for second-hand two-wheelers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Repairs & Services Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-2GAKfZ5VMc0Or53L2ySu0rbW9A017ncLAg&s"
              alt="Bike Repair & Services"
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Repairs & Services
              </Typography>
              <Typography color="text.secondary">
                Get quick and reliable servicing to keep your ride in top condition.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
