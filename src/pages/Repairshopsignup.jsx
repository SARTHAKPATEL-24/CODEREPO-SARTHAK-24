import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Grid, Typography, Paper, IconButton, Avatar, InputAdornment } from "@mui/material";
import { AddCircle, RemoveCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, db } from "../config/Firebase"; // Import Firebase Auth and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Auth method
import { doc, setDoc } from "firebase/firestore"; // Firestore methods

const RepairShopSignUp = () => {
  const [services, setServices] = useState([{ name: "", price: "" }]);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    mobileNo: "",
    email: "",
    password: "",
    sinceYear: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const addService = () => setServices([...services, { name: "", price: "" }]);
  const removeService = (index) => setServices(services.filter((_, i) => i !== index));
  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userId = userCredential.user.uid;

      // Store user data in Firestore
      await setDoc(doc(db, "repairShops", userId), {
        ...formData,
        profileImage: image,
        services: services,
      });

      alert("Repair shop registered successfully!");
      navigate("/Repairshop/Login");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: "80px" }}>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Repair Shop Sign-Up
        </Typography>
        <Grid container spacing={2} component="form">
          {/* Profile Image */}
          <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
            <Avatar src={image} sx={{ width: 100, height: 100, mb: 2 }} />
            <Button sx={{ bgcolor: "#8b9a9b" }} variant="contained" component="label">
              Upload Profile Picture
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
          </Grid>

          {/* Shop Name and Owner Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Owner Name"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
            />
          </Grid>

          {/* Mobile No and Since Year */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile No"
              name="mobileNo"
              type="tel"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Since Year"
              name="sinceYear"
              value={formData.sinceYear}
              onChange={handleChange}
            />
          </Grid>

          {/* Email and Password */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email ID"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              value={formData.password}
              onChange={handleChange}
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

          {/* Services Offered */}
          <Grid item xs={12}>
            <Typography variant="h6">Services Offered</Typography>
            {services.map((service, index) => (
              <Grid container spacing={1} key={index} alignItems="center">
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label={`Service ${index + 1}`}
                    value={service.name}
                    onChange={(e) =>
                      handleServiceChange(index, "name", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Price (₹)"
                    type="text"
                    value={service.price}
                    onChange={(e) =>
                      handleServiceChange(index, "price", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  {index > 0 && (
                    <IconButton onClick={() => removeService(index)}>
                      <RemoveCircle sx={{ color: "#8b9a9b" }} />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
            <Button
              sx={{ color: "#8b9a9b" }}
              startIcon={<AddCircle sx={{ color: "#8b9a9b" }} />}
              onClick={addService}
            >
              Add Service
            </Button>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          {/* Country and State */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>

          {/* City and Pin Code */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pin Code"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#8b9a9b" }}
              onClick={handleSubmit}
              fullWidth
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RepairShopSignUp;
