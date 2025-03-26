import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { DashboardOutlined, DirectionsBike, ShoppingCart, Build } from "@mui/icons-material";

const Dashboard = () => {
  return (
    <Container style={{marginTop:"80px"}}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <DashboardOutlined fontSize="large" />
            <Typography variant="h6">Overview</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <DirectionsBike fontSize="large" />
            <Typography variant="h6">Rentals</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <ShoppingCart fontSize="large" />
            <Typography variant="h6">Buy & Sell</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Build fontSize="large" />
            <Typography variant="h6">Repairs & Services</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
