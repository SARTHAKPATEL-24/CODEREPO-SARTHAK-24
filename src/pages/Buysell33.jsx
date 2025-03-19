import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
} from '@mui/material';

const BuySellPage = () => {
  // Dummy data for listings
  const listings = [
    {
      id: 1,
      title: 'Honda Activa 5G',
      price: '₹50,000',
      image: 'https://via.placeholder.com/150',
      description: 'Well-maintained scooter, 2020 model, 10,000 km driven.',
    },
    {
      id: 2,
      title: 'Bajaj Pulsar 150',
      price: '₹70,000',
      image: 'https://via.placeholder.com/150',
      description: '2019 model, excellent condition, 15,000 km driven.',
    },
    {
      id: 3,
      title: 'TVS Jupiter',
      price: '₹45,000',
      image: 'https://via.placeholder.com/150',
      description: '2021 model, 5,000 km driven, like new.',
    },
  ];

  return (
    <Container style={{marginTop:"80px"}}>
      {/* Page Title */}
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Buy & Sell Two Wheelers
      </Typography>

      {/* Listings Grid */}
      <Grid container spacing={4}>
        {listings.map((listing) => (
          <Grid item key={listing.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="160"
                image={listing.image}
                alt={listing.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {listing.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {listing.description}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {listing.price}
                </Typography>
              </CardContent>
              <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} sx={{ mt: 2, mb: 2, mx: 2 }}>
                Contact Seller
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sell Form */}
      <Typography variant="h5" align="center" sx={{ mt: 6, mb: 3 }}>
        Sell Your Two Wheeler
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <form>
                <TextField
                  fullWidth
                  label="Vehicle Name"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />
                <TextField
                  fullWidth
                  label="Image URL"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <Button type="submit" variant="contained" style={{backgroundColor:"#8b9a9b"}} sx={{ mt: 2 }}>
                  Submit Listing
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuySellPage;