import React, { useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, TextField, MenuItem } from "@mui/material";

const initialListings = [
  { id: 1, name: "Honda Activa 5G", price: 35000, image: "https://via.placeholder.com/150", condition: "Used" },
  { id: 2, name: "Royal Enfield Classic 350", price: 120000, image: "https://via.placeholder.com/150", condition: "New" }
];

const BuySellPage = () => {
  const [listings, setListings] = useState(initialListings);
  const [newListing, setNewListing] = useState({ name: "", price: "", image: "", condition: "" });

  const handleChange = (e) => {
    setNewListing({ ...newListing, [e.target.name]: e.target.value });
  };

  const handleAddListing = () => {
    if (newListing.name && newListing.price && newListing.image && newListing.condition) {
      setListings([...listings, { id: listings.length + 1, ...newListing }]);
      setNewListing({ name: "", price: "", image: "", condition: "" });
    }
  };

  return (
    <Container style={{marginTop:"80px"}}>
      <Typography variant="h4" gutterBottom>Buy & Sell Two-Wheelers</Typography>
      <Grid container spacing={3}>
        {listings.map((listing) => (
          <Grid item xs={12} sm={6} md={4} key={listing.id}>
            <Card>
              <CardMedia component="img" height="140" image={listing.image} alt={listing.name} />
              <CardContent>
                <Typography variant="h6">{listing.name}</Typography>
                <Typography variant="body1">Price: ₹{listing.price}</Typography>
                <Typography variant="body2">Condition: {listing.condition}</Typography>
                <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} fullWidth>Buy Now</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>Sell Your Two-Wheeler</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Name" name="name" value={newListing.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Price" name="price" type="number" value={newListing.price} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Image URL" name="image" value={newListing.image} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField select fullWidth label="Condition" name="condition" value={newListing.condition} onChange={handleChange}>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} onClick={handleAddListing}>Add Listing</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuySellPage;