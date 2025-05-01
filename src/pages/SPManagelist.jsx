import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";

const initialListings = [
  { id: 1, model: "Honda Activa", type: "Rent", price: "$10/day", city: "Ahmedabad", status: "Available" },
  { id: 2, model: "Royal Enfield Classic 350", type: "Sell", price: "$1500", city: "Vadodara", status: "Sold" },
];

const ManageListings = () => {
  const [listings, setListings] = useState(initialListings);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleOpen = (listing = null) => {
    setEditData(listing);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedListing = {
      id: editData ? editData.id : listings.length + 1,
      model: formData.get("model"),
      type: formData.get("type"),
      price: formData.get("price"),
      city: formData.get("city"),
      status: formData.get("status"),
    };

    if (editData) {
      setListings(listings.map((l) => (l.id === editData.id ? updatedListing : l)));
    } else {
      setListings([...listings, updatedListing]);
    }

    handleClose();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ my: 3, fontWeight: "bold" }}>
        Manage Two-Wheeler Listings
      </Typography>

      <Button variant="contained" startIcon={<Add />} sx={{ mb: 2 }} onClick={() => handleOpen()}>
        Add New Listing
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Model</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>City</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>{listing.model}</TableCell>
                <TableCell>{listing.type}</TableCell>
                <TableCell>{listing.price}</TableCell>
                <TableCell>{listing.city}</TableCell>
                <TableCell>{listing.status}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpen(listing)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(listing.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editData ? "Edit Listing" : "Add New Listing"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="listingForm">
            <TextField label="Model" name="model" fullWidth defaultValue={editData?.model || ""} margin="dense" required />
            <TextField label="Type" name="type" fullWidth select defaultValue={editData?.type || ""} margin="dense" required>
              <MenuItem value="Rent">Rent</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
            </TextField>
            <TextField label="Price" name="price" fullWidth defaultValue={editData?.price || ""} margin="dense" required />
            <TextField label="City" name="city" fullWidth defaultValue={editData?.city || ""} margin="dense" required />
            <TextField label="Status" name="status" fullWidth select defaultValue={editData?.status || ""} margin="dense" required>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Rented">Rented</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button type="submit" form="listingForm" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageListings;
