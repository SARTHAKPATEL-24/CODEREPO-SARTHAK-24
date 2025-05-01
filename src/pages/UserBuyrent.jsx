import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  CardMedia,
  Box,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { db } from "../config/Firebase";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 🔹 Import Firebase Auth

const cities = ["Ahmedabad", "Gandhinagar", "Vadodara", "Surat"];

const BuyRentPage = () => {
  const [view, setView] = useState(localStorage.getItem("service") || "buy");
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem("city") || "Ahmedabad");
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    buyerName: "",
    mobile: "",
    address: "",
    pickupDateTime: "",
    returnDateTime: "",
    paymentStatus: "Pending",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const q = query(
          collection(db, "vehicles"),
          where("city", "==", selectedCity),
          where("type", "==", view)
        );
        const querySnapshot = await getDocs(q);
        const fetchedVehicles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVehicles(fetchedVehicles);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };

    fetchVehicles();
  }, [selectedCity, view]);

  const handleOpenDialog = (vehicle) => {
    setSelectedVehicle(vehicle);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedVehicle(null);
    setBookingDetails({
      buyerName: "",
      mobile: "",
      address: "",
      pickupDateTime: "",
      returnDateTime: "",
      paymentStatus: "Pending",
    });
  };

  const handleBookingChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleBookNow = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setSnackbarMessage("You must be logged in to book a vehicle.");
        setSnackbarOpen(true);
        return;
      }

      const order = {
        userId: user.uid,
        userName: bookingDetails.buyerName,
        vehicleId: selectedVehicle.id,
        vehicleName: selectedVehicle.name,
        model: selectedVehicle.model,
        price: selectedVehicle.price,
        image: selectedVehicle.image,
        spuserid: selectedVehicle.spuserid,
        type: view,
        pickupDateTime: bookingDetails.pickupDateTime,
        returnDateTime: view === "rent" ? bookingDetails.returnDateTime : null,
        address: bookingDetails.address,
        mobile: bookingDetails.mobile,
        paymentStatus: bookingDetails.paymentStatus,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "userOrders"), order);

      setSnackbarMessage("Booking successful!");
      setSnackbarOpen(true);
      handleCloseDialog();
    } catch (error) {
      console.error("Error placing order:", error);
      setSnackbarMessage("Failed to place the booking. Please try again.");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container style={{ marginTop: "80px" }}>
      <AppBar position="static" style={{ backgroundColor: "#ffffff", boxShadow: "none" }}>
        <Toolbar style={{ display: "flex", justifyContent: "center", gap: "30px", padding: "15px 0" }}>
          <Button
            onClick={() => setView("buy")}
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: view === "buy" ? "#000" : "#888",
              borderBottom: view === "buy" ? "3px solid #000" : "none",
              borderRadius: "0px",
              textTransform: "none",
            }}
          >
            Buy Vehicles
          </Button>

          <Button
            onClick={() => setView("rent")}
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: view === "rent" ? "#000" : "#888",
              borderBottom: view === "rent" ? "3px solid #000" : "none",
              borderRadius: "0px",
              textTransform: "none",
            }}
          >
            Rent Vehicles
          </Button>
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="center" mt={2}>
        <Select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          variant="outlined"
          sx={{ minWidth: 200, fontSize: "16px" }}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {vehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
            <Card>
              <CardMedia component="img" height="180" image={vehicle.image} alt={vehicle.name} />
              <CardContent>
                <Typography variant="h6">{vehicle.name}</Typography>
                <Typography variant="body2">Model: {vehicle.model}</Typography>
                <Typography variant="body2">Price: {vehicle.price}</Typography>
                <Typography variant="body2">Owner: {vehicle.owner}</Typography>
                <Typography variant="body2">Condition: {vehicle.condition}</Typography>
                <Typography variant="body2">City: {vehicle.city}</Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#8b9a9b",
                      color: "#fff",
                      fontWeight: "bold",
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                    onClick={() => handleOpenDialog(vehicle)}
                  >
                    {view === "buy" ? "Buy Now" : "Rent Now"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{view === "buy" ? "Buy Vehicle" : "Rent Vehicle"}</DialogTitle>
        <DialogContent>
          {selectedVehicle && (
            <Box>
              <Typography variant="h6">{selectedVehicle.name}</Typography>
              <Typography variant="body2">Model: {selectedVehicle.model}</Typography>
              <Typography variant="body2">Price: {selectedVehicle.price}</Typography>
              <Typography variant="body2">Owner: {selectedVehicle.owner}</Typography>
              <Typography variant="body2">Condition: {selectedVehicle.condition}</Typography>
              <Typography variant="body2">City: {selectedVehicle.city}</Typography>
            </Box>
          )}
          <Stack spacing={2} mt={2}>
            <TextField
              label="Buyer Name"
              name="buyerName"
              value={bookingDetails.buyerName}
              onChange={handleBookingChange}
              fullWidth
            />
            <TextField
              label="Mobile Number"
              name="mobile"
              value={bookingDetails.mobile}
              onChange={handleBookingChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={bookingDetails.address}
              onChange={handleBookingChange}
              fullWidth
            />
            <TextField
              label="Pickup Date and Time"
              name="pickupDateTime"
              type="datetime-local"
              value={bookingDetails.pickupDateTime}
              onChange={handleBookingChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            {view === "rent" && (
              <TextField
                label="Return Date and Time"
                name="returnDateTime"
                type="datetime-local"
                value={bookingDetails.returnDateTime}
                onChange={handleBookingChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            )}
            <FormControl fullWidth>
              <InputLabel id="payment-status-label">Payment Status</InputLabel>
              <Select
                labelId="payment-status-label"
                id="payment-status"
                name="paymentStatus"
                value={bookingDetails.paymentStatus}
                onChange={handleBookingChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="50% Paid">50% Paid</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#8b9a9b", color: "#fff" }}
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

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

export default BuyRentPage;
