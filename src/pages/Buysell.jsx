import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

const BuySellPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    price: '',
    type: '',
  });

  const [listings, setListings] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setListings([...listings, formData]);
    setFormData({ name: '', model: '', price: '', type: '' });
  };

  return (
    <Container style={{marginTop:"80px"}}>
      <Typography variant="h4" gutterBottom>
        Buy & Sell Two-Wheelers
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Type (e.g., Scooter, Motorcycle)"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" style={{backgroundColor:"#8b9a9b"}}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Available Listings
      </Typography>
      <Grid container spacing={2}>
        {listings.map((listing, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{listing.name}</Typography>
                <Typography color="textSecondary">{listing.model}</Typography>
                <Typography variant="body2">Price: ${listing.price}</Typography>
                <Typography variant="body2">Type: {listing.type}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Rent
                </Button>
                <Button size="small" color="secondary">
                  Buy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BuySellPage;