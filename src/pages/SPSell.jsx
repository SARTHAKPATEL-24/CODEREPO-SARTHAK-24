import React, { useState, useEffect } from 'react';
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
  Popover,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db, auth } from '../config/Firebase'; // Added auth import
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'; // Added auth state listener

const SPSell = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    model: "",
    price: "",
    type: "",
    image: "",
    owner: "",
    condition: "",
    city: "",
    spuserid: "", // Added userId field
  });

  const [listings, setListings] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Track logged-in user

  // Fetch current user on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setFormData((prev) => ({ ...prev, spuserid: user.uid }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch listings from Firestore
  const fetchListings = () => {
    const unsubscribe = onSnapshot(collection(db, 'vehicles'), (snapshot) => {
      const fetchedListings = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((listing) => listing.spuserid === currentUser?.uid); // Filter by userId

      setListings(fetchedListings);
    });

    return unsubscribe;
  };

  // Fetch listings when currentUser is available
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = fetchListings();
      return () => unsubscribe();
    }
  }, [currentUser]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editIndex !== null) {
        // Update existing vehicle
        const listingDoc = doc(db, "vehicles", listings[editIndex].id);
        await updateDoc(listingDoc, formData);
        setEditIndex(null);
      } else {
        // Add new vehicle with the current user's ID
        await addDoc(collection(db, "vehicles"), {
          ...formData,
          spuserid: currentUser.uid, // Add the logged-in user's ID
        });
      }

      // Reset the form
      setFormData({
        id: "",
        name: "",
        model: "",
        price: "",
        type: "",
        image: "",
        owner: "",
        condition: "",
        city: "",
        spuserid: currentUser?.uid || "", // Reset with the current user's ID
      });
    } catch (err) {
      console.error("Error saving listing:", err);
    }
  };

  const handleEdit = (index) => {
    setFormData(listings[index]);
    setEditIndex(index);
    handleMenuClose();
  };

  const handleDelete = async (index) => {
    try {
      const listingDoc = doc(db, 'vehicles', listings[index].id);
      await deleteDoc(listingDoc);
      setListings(listings.filter((_, i) => i !== index));
      handleMenuClose();
    } catch (err) {
      console.error('Error deleting listing:', err);
    }
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

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="ID" name="id" value={formData.id} onChange={handleChange} fullWidth required />
        </Grid>
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
          <TextField select label="Type" name="type" value={formData.type} onChange={handleChange} fullWidth required>
            <MenuItem value="buy">buy</MenuItem>
            <MenuItem value="rent">rent</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Price" name="price" value={formData.price} onChange={handleChange} fullWidth required type="text" />
        </Grid>
        <Grid item xs={12}>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" style={{ backgroundColor: '#8b9a9b', width: '100%' }} onClick={handleSubmit}>
            {editIndex !== null ? 'Update' : 'Submit'}
          </Button>
        </Grid>
      </Grid>

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
                <Typography variant="body2" align="center">
                  {listing.type === 'Buy' ? `Price: ₹${listing.price}` : `Price: ₹${listing.price}`}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between' }}>
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

export default SPSell;
