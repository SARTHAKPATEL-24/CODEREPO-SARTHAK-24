import React from "react";
import { Card, CardContent, Typography, Paper, Grid } from "@mui/material";

const orders = Array.from({ length: 16 }, (_, index) => ({
  id: `RENT-${index + 1}`,
  customer: [
    "John Doe", "Alice Smith", "Robert Brown", "Emily Davis", "Michael Wilson", 
    "Sophia Martinez", "David Anderson", "Olivia Thomas", "James Taylor", "Emma White", 
    "William Harris", "Ava Martin", "Alexander Lee", "Isabella Clark", "Daniel Lewis", "Mia Walker"
  ][index],
  phone: `+91 98765${10000 + index}`,
  vehicle: [
    "Honda Activa", "Yamaha R15", "Bajaj Pulsar", "Royal Enfield Classic 350", "TVS Jupiter", 
    "Hero Splendor", "KTM Duke 390", "Suzuki Access", "Honda Dio", "Bajaj Avenger", 
    "TVS Apache", "Yamaha FZ", "Honda CB Shine", "Suzuki Gixxer", "Hero Passion Pro", "Kawasaki Ninja 300"
  ][index],
  price: [
    500, 1500, 1000, 2000, 700, 600, 1800, 800, 750, 1200, 1100, 1300, 900, 950, 650, 2500
  ][index],
  status: ["Booked", "Ongoing", "Completed"][index % 3],
  date: new Date().toISOString().split("T")[0],
}));

const RentalOrderList = () => {
  return (
    <Paper sx={{ padding: 2, marginTop: "60px", boxShadow: "none", backgroundColor: "#f2f8fa" }}>
      <Typography variant="h6" gutterBottom>
        Two-Wheeler Rental Orders:-
      </Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={3} key={order.id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1"><strong>Order ID:</strong> {order.id}</Typography>
                <Typography variant="body2"><strong>Customer:</strong> {order.customer}</Typography>
                <Typography variant="body2"><strong>Mobile:</strong> {order.phone}</Typography>
                <Typography variant="body2"><strong>Vehicle:</strong> {order.vehicle}</Typography>
                <Typography variant="body2"><strong>Rental Price:</strong> ₹{order.price}/day</Typography>
                <Typography variant="body2"><strong>Status:</strong> {order.status}</Typography>
                <Typography variant="body2"><strong>Date:</strong> {order.date}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default RentalOrderList;
