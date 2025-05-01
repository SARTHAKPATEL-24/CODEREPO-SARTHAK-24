import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { BarChart, ShoppingCart, Build, People, DirectionsBike, Storefront } from "@mui/icons-material";

const stats = [
  { label: "Total Services", value: 120, icon: <Build fontSize="large" color="primary" /> },
  { label: "Active Requests", value: 15, icon: <ShoppingCart fontSize="large" color="secondary" /> },
  { label: "Completed Services", value: 95, icon: <BarChart fontSize="large" color="success" /> },
  { label: "Total Customers", value: 250, icon: <People fontSize="large" color="error" /> },
];

const ServiceProviderDashboard = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>Service Provider Dashboard</Typography>
      <Grid container spacing={4}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", p: 3, boxShadow: 3, backgroundColor: "#f8f9fa" }}>
              <CardContent>
                {stat.icon}
                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold" }}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Service Management Section */}
      <Grid container spacing={4}>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ textAlign: "center", p: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold" ,mt: 1}}>View Service Requests</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Approve, schedule, or reject service requests
              </Typography>
              <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => navigate("/SP/requests")}>Go to Requests</Button>
            </CardContent>
          </Card>
        </Grid>
      

   

      {/* Rent & Sell Customer Details Section */}
      
        <Grid item xs={12} md={6}> 
          <Card sx={{ textAlign: "center", p: 3, boxShadow: 3 }}>
            <CardContent>
            
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>Rent & Buy Order Details</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                View customer details for rented and bought Order vehicles
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/SP/orders")}>View  Details</Button>
            </CardContent>
          </Card>
        </Grid>
        </Grid>
    </Container>
  );
};

export default ServiceProviderDashboard;
