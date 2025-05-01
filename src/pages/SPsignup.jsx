import React, { useState } from "react";
import { Container, TextField, MenuItem, Button, Typography, Box, Grid, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/Firebase"; // Import Firebase Auth and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Auth method
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

const serviceOptions = [
  { value: "sell", label: "Sell Vehicles" },
  { value: "rent", label: "Rent Vehicles" },
];

const SignUpServiceProvider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    service: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store user data in Firestore `SPusers` collection
      await setDoc(doc(db, "SPusers", user.uid), {
        firstName: formData.firstName,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        pinCode: formData.pinCode,
        service: formData.service,
      });

      console.log("User signed up and data stored successfully!");
      navigate("/SP/Login"); // Navigate to the login page after successful signup
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "90px" }}>
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          <u>Service Provider Sign Up</u>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email ID"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"} // Toggle between text and password
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                type="tel"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Select Service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                {serviceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Pin Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
                type="number"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#8b9a9b" }}
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpServiceProvider;
