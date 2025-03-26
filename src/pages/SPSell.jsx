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
  MenuItem,
  IconButton,
  Popover
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const BuyRentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    price: '',
    type: '',
    rentPrice: '',
    option: '',
    image: '',
    owner: '',
    condition: '',
    city: ''
  });

  const [listings, setListings] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedListings = [...listings];
      updatedListings[editIndex] = formData;
      setListings(updatedListings);
      setEditIndex(null);
    } else {
      setListings([...listings, formData]);
    }
    setFormData({ name: '', model: '', price: '', type: '', rentPrice: '', option: '', image: '', owner: '', condition: '', city: '' });
  };

  const handleEdit = (index) => {
    setFormData(listings[index]);
    setEditIndex(index);
    handleMenuClose();
  };

  const handleDelete = (index) => {
    setListings(listings.filter((_, i) => i !== index));
    handleMenuClose();
  };

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Sell & Rent Two-Wheelers
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Vehicle Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Model" name="model" value={formData.model} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Owner Name" name="owner" value={formData.owner} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Condition" name="condition" value={formData.condition} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="City" name="city" value={formData.city} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select label="Option" name="option" value={formData.option} onChange={handleChange} fullWidth required>
              <MenuItem value="Buy">Sell</MenuItem>
              <MenuItem value="Rent">Rent</MenuItem>
            </TextField>
          </Grid>
          {formData.option === 'Buy' && (
            <Grid item xs={12} sm={6}>
              <TextField label="Price" name="price" value={formData.price} onChange={handleChange} fullWidth required type="number" />
            </Grid>
          )}
          {formData.option === 'Rent' && (
            <Grid item xs={12} sm={6}>
              <TextField label="Rent Price" name="rentPrice" value={formData.rentPrice} onChange={handleChange} fullWidth required type="number" />
            </Grid>
          )}
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" style={{ backgroundColor: '#8b9a9b', width: '100%' }}>
              {editIndex !== null ? 'Update' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }} align="center">
        Available Listings
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {listings.map((listing, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              {listing.image && <img src={listing.image} alt={listing.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />}
              <CardContent>
                <Typography variant="h6" align="center">{listing.name}</Typography>
                <Typography color="textSecondary" align="center">{listing.model}</Typography>
                <Typography variant="body2" align="center">Owner: {listing.owner}</Typography>
                <Typography variant="body2" align="center">Condition: {listing.condition}</Typography>
                <Typography variant="body2" align="center">City: {listing.city}</Typography>
                {listing.option === 'Buy' && <Typography variant="body2" align="center">Price: ${listing.price}</Typography>}
                {listing.option === 'Rent' && <Typography variant="body2" align="center">Rent Price: ${listing.rentPrice}</Typography>}
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between' }}>
                {listing.option === 'Rent' && <Button size="small" color="primary">Rent</Button>}
                {listing.option === 'Buy' && <Button size="small" color="secondary">Sell</Button>}
                <IconButton onClick={(e) => handleMenuClick(e, index)}>
                  <MoreVertIcon />
                </IconButton>
                <Popover open={menuIndex === index} anchorEl={anchorEl} onClose={handleMenuClose}>
                  <Button onClick={() => handleEdit(index)}>Edit</Button>
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                </Popover>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BuyRentPage;
