import React, { useState } from "react";
import { Container, TextField, MenuItem, Button, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <Container maxWidth="md" style={{marginTop:"90px"}}>
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          <u>Service Provider Sign Up</u>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Surname" name="surname" value={formData.surname} onChange={handleChange} required /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Email ID" name="email" value={formData.email} onChange={handleChange} required type="email" /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Password" name="password" value={formData.password} onChange={handleChange} required type="password" /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange} required type="tel" /></Grid>
            <Grid item xs={6}><TextField fullWidth select label="Select Service" name="service" value={formData.service} onChange={handleChange} required>
            {serviceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField></Grid>
            <Grid item xs={12}><TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} required multiline rows={2} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} required /></Grid>
            <Grid item xs={6}><TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} required /></Grid>
            <Grid item xs={6}><TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} required /></Grid>
            <Grid item xs={6}><TextField fullWidth label="Pin Code" name="pinCode" value={formData.pinCode} onChange={handleChange} required type="number" /></Grid>
            
              
          </Grid>
          <Button type="submit" variant="contained" style={{backgroundColor:"#8b9a9b"}} fullWidth sx={{ mt: 2 }} onClick={() => navigate("/Sp/Login")}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpServiceProvider;
