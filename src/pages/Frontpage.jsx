import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton, Divider, Box, Container, Grid, Card, CardContent, CardMedia, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search } from "@mui/icons-material";


const HomePage = () => {
  return (
    <>
      <Container sx={{ mt: 10, width:"100%" }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight="bold">
              Rent, Buy & Service Two-Wheelers 
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Find the best two-wheelers for rent, buy or sell pre-owned bikes, and get reliable repair services.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSseBh5zxnKm4Hl0aZKWSnhKXSmRolvRTPfLg&s" alt="bike" width="75%" style={{ borderRadius: "10px" }} />
          </Grid>
        </Grid>

        <Grid container justifyContent="center" sx={{ my: 4 }}>
          <TextField
            variant="outlined"
            placeholder="Search for rentals, second-hand bikes, or services..."
            fullWidth
            InputProps={{
              endAdornment: <Search />,
            }}
          />
        </Grid>

        <Grid container spacing={3}>
          {[
            { title: "Rent a Bike", image: "https://content.jdmagicbox.com/comp/koraput/b3/9999p6852.6852.231230220109.s4b3/catalogue/lovekoraput-rental-koraput-bike-on-rent-hnx8q1zvs7.jpg" },
            { title: "Buy/Sell", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTeFYyPQiz48IzL1kGhht2_7BIX51yeWb_qA&s" },
            { title: "Repair & Service", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-2GAKfZ5VMc0Or53L2ySu0rbW9A017ncLAg&s" },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardMedia component="img" height="270" image={item.image} alt={item.title} />
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
