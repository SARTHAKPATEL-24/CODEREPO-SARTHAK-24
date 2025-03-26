import React, { useState } from "react";
import { Container, Grid, Typography, Button, MenuItem, Select, FormControl, InputLabel, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 30 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side - Welcome Message */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 0, boxShadow: 0, bgcolor:"#f2f8fa" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Welcome to GLIDE GO!
              </Typography>
              <Typography variant="body1" paragraph>
                Your one-stop solution for renting, buying, and repairing two-wheelers in your city. Explore a seamless experience with our professional services tailored for your convenience.
              </Typography>
              <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} onClick={() => navigate("/User/AboutUs")} >Read More</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - City and Services Selection */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 3,borderRadius: 4 }}>
            <CardContent>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select City</InputLabel>
                <Select value={city} onChange={(e) => setCity(e.target.value)} label="Select City">
                  <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                  <MenuItem value="Gandhinagar">Gandhinagar</MenuItem>
                  <MenuItem value="Vadodara">Vadodara</MenuItem>
                  <MenuItem value="Surat">Surat</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Service</InputLabel>
                <Select value={service} onChange={(e) => setService(e.target.value)} label="Select Service">
                  <MenuItem value="rent">Rent Vehicles</MenuItem>
                  <MenuItem value="buy">Buy Vehicles</MenuItem>
                  <MenuItem value="repair">Repair Vehicles</MenuItem>
                </Select>
              </FormControl>
              
              <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} fullWidth>Submit</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
