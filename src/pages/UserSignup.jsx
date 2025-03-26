import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, license: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            <Grid item xs={6}><TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={6}><TextField label="Surname" name="surname" value={formData.surname} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={6}><TextField label="Email ID" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={6}><TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={12}><TextField label="Address" name="address" multiline rows={2} value={formData.address} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={4}><TextField label="Mobile Number" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={4}><TextField label="Country" name="country" value={formData.country} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={4}><TextField label="State" name="state" value={formData.state} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={4}><TextField label="City" name="city" value={formData.city} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={4}><TextField label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} fullWidth required /></Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Upload License:</Typography>
              <input accept="image/*,.pdf" type="file" onChange={handleFileChange} style={{ marginTop: "5px" }} />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={() => navigate("/User/Login")} type="submit" variant="contained" sx={{ backgroundColor: "#8b9a9b", color: "#fff", width: "100%" }}>
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
