import React, { useState, useEffect } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { db } from "../config/Firebase"; // Import Firestore
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore"; // Firestore functions

const RepairShopsPage = () => {
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [repairShops, setRepairShops] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    userName: "",
    service: "",
    address: "",
    mobile: "",
    payment: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch repair shops from Firestore
  useEffect(() => {
    const fetchRepairShops = () => {
      const q = query(collection(db, "repairShops"), where("city", "==", selectedCity));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const shops = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRepairShops(shops);
      });
      return unsubscribe;
    };

    const unsubscribe = fetchRepairShops();
    return () => unsubscribe();
  }, [selectedCity]);

  const handleViewMore = (shop) => {
    setSelectedShop(shop);
    setOpen(true);
  };

  const handleBookNow = () => {
    setBookingOpen(true);
  };

  const handleBookingChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleConfirmBooking = async () => {
    try {
      // Create a new repair order object
      const repairOrder = {
        shopName: selectedShop.shopName,
        userName: bookingDetails.userName,
        mobile: bookingDetails.mobile,
        address: bookingDetails.address,
        service: bookingDetails.service,
        rsuserid: selectedShop.id,
        price: selectedShop.services.find((service) => service.name === bookingDetails.service)?.price || "N/A",
        status: "pending", // Default status
        createdAt: serverTimestamp(),
      };

      // Add the repair order to the `UserRepairOrder` collection
      await addDoc(collection(db, "UserRepairOrder"), repairOrder);

      // Show success message in Snackbar
      setSnackbarMessage("Repair order placed successfully!");
      setSnackbarOpen(true);

      setBookingOpen(false); // Close the booking dialog
    } catch (error) {
      console.error("Error placing repair order:", error);

      // Show error message in Snackbar
      setSnackbarMessage("Failed to place the repair order. Please try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container style={{ marginTop: "80px" }}>
      <AppBar position="static" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", bgcolor: "#f2f8fa", color: "#333" }}>
          <Tabs
            value={selectedCity}
            onChange={(e, newValue) => setSelectedCity(newValue)}
            textColor="inherit"
            variant="standard"
            sx={{ "& .MuiTab-root": { minWidth: 120, fontSize: 16, fontWeight: "bold", mx: 2 } }}
          >
            {["Ahmedabad", "Gandhinagar", "Vadodara", "Surat"].map((city) => (
              <Tab key={city} label={city} value={city} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        Vehicle Repair & Service Shops
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {repairShops.map((shop, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={shop.profileImage || ""}
                alt={shop.shopName}
              />
              <CardContent>
                <Typography variant="h6">
                  {shop.shopName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Owner: {shop.ownerName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address:{shop.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact: {shop.mobileNo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Since: {shop.sinceYear}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 1, bgcolor: "#8b9a9b" }}
                  onClick={() => handleViewMore(shop)}
                >
                  View More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Shop Details */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        {selectedShop && (
          <>
            <DialogTitle>{selectedShop.name} - Details</DialogTitle>
            <DialogContent>
              <Typography variant="h5">Owner: {selectedShop.ownerName}</Typography>
              <Typography variant="body2">Address: {selectedShop.address}</Typography>
              <Typography variant="body2">Contact: {selectedShop.mobileNo}</Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                Services Offered:
              </Typography>
              <List>
                {selectedShop.services?.map((service, i) => (
                  <ListItem key={i}>
                    <ListItemText
                      primary={service.name}
                      secondary={`Price: ₹${service.price}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" sx={{ mt: 1, bgcolor: "#8b9a9b" }} fullWidth onClick={handleBookNow}>
                Book Now
              </Button>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Book Repair Service</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="User Name"
            name="userName"
            value={bookingDetails.userName}
            onChange={handleBookingChange}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            fullWidth
            label="Select Service"
            name="service"
            value={bookingDetails.service}
            onChange={handleBookingChange}
            sx={{ mb: 2 }}
          >
            {selectedShop?.services?.map((service, i) => (
              <MenuItem key={i} value={service.name}>
                {service.name} - ₹{service.price}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={bookingDetails.address}
            onChange={handleBookingChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mobile No"
            name="mobile"
            value={bookingDetails.mobile}
            onChange={handleBookingChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#8b9a9b" }}
            fullWidth
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </Button>
        </DialogContent>
      </Dialog>

      {/* Snackbar for Alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RepairShopsPage;
