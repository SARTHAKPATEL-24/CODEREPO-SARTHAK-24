import React from "react";
import { Typography, Button, Container, Grid, Card, CardContent, CardMedia } from "@mui/material";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Container sx={{ textAlign: "center", py: 5,marginTop:"60px" }}>
        <Typography variant="h3" gutterBottom>
          Explore the City with Ease!
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Rent a bike, scooter, or motorcycle hassle-free at the best rates.
        </Typography>
        <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} size="large">
          Rent Now
        </Button>
      </Container>

      {/* Featured Vehicles */}
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" gutterBottom>
          Featured Rentals
        </Typography>
        <Grid container spacing={4}>
          {['Scooter', 'Motorcycle', 'E-Bike'].map((vehicle, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://source.unsplash.com/400x300/?${vehicle}`}
                  alt={vehicle}
                />
                <CardContent>
                  <Typography variant="h6" >{vehicle}</Typography>
                  <Typography variant="body1" color="textSecondary" >
                    Affordable and reliable {vehicle.toLowerCase()}s available for rent.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
