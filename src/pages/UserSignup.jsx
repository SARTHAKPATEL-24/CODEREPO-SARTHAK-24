import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid, Box, IconButton, Avatar, InputAdornment } from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/Firebase"; // Import Firestore and Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods

function Trial() {
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
    license: null,
    profileImage: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, license: e.target.files[0] });
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Store user data in Firestore `users` collection
      await setDoc(doc(db, "users",user.uid), {
        
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
        license: formData.license ? formData.license.name : null,
        profileImage: formData.profileImage,
        
      });

      // Navigate to login page after successful signup
      navigate("/User/Login");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#333" }}>
          <u>Create Account</u>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Profile Image Section */}
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Avatar
                src={formData.profileImage}
                alt="Profile"
                sx={{ width: 100, height: 100, margin: "0 auto", mb: -5 }}
              />
              <input
                accept="image/*"
                type="file"
                id="profile-image-upload"
                style={{ display: "none" }}
                onChange={handleProfileImageChange}
              />
              <label htmlFor="profile-image-upload">
                <IconButton color="primary" component="span" sx={{mb:0, left: 30}}>
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>

            {/* Form Fields */}
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email ID"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                multiline
                rows={2}
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Pin Code"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Upload License:</Typography>
              <input
                accept="image/*,.pdf"
                type="file"
                onChange={handleFileChange}
                style={{ marginTop: "5px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#8b9a9b", color: "#fff", width: "100%" }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Trial;
