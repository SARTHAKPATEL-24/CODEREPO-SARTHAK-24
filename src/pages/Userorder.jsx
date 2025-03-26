import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const orders = [
  {
    id: 1,
    vehicle: "Honda Activa 6G",
    model: "2022",
    condition: "Good",
    image: "https://via.placeholder.com/150",
    date: "2025-03-10",
    time: "10:00 AM",
    price: "$15/day",
    status: "Completed",
  },
  {
    id: 2,
    vehicle: "Royal Enfield Classic 350",
    model: "2021",
    condition: "Excellent",
    image: "https://via.placeholder.com/150",
    date: "2025-03-05",
    time: "02:30 PM",
    price: "$30/day",
    status: "Completed",
  },
  {
    id: 3,
    vehicle: "TVS Jupiter",
    model: "2020",
    condition: "Fair",
    image: "https://via.placeholder.com/150",
    date: "2025-02-28",
    time: "11:45 AM",
    price: "$12/day",
    status: "Completed",
  },
  {
    id: 4,
    vehicle: "Yamaha FZ-S",
    model: "2023",
    condition: "New",
    image: "https://via.placeholder.com/150",
    date: "2025-02-20",
    time: "09:15 AM",
    price: "$20/day",
    status: "Completed",
  },
  {
    id: 5,
    vehicle: "Bajaj Pulsar 150",
    model: "2019",
    condition: "Good",
    image: "https://via.placeholder.com/150",
    date: "2025-02-15",
    time: "04:00 PM",
    price: "$18/day",
    status: "Completed",
  },
  {
    id: 6,
    vehicle: "Suzuki Access 125",
    model: "2021",
    condition: "Excellent",
    image: "https://via.placeholder.com/150",
    date: "2025-02-10",
    time: "12:30 PM",
    price: "$14/day",
    status: "Completed",
  },
  {
    id: 7,
    vehicle: "KTM Duke 200",
    model: "2023",
    condition: "New",
    image: "https://via.placeholder.com/150",
    date: "2025-02-05",
    time: "03:20 PM",
    price: "$35/day",
    status: "Completed",
  },
  {
    id: 8,
    vehicle: "Hero Splendor Plus",
    model: "2018",
    condition: "Fair",
    image: "https://via.placeholder.com/150",
    date: "2025-02-01",
    time: "08:10 AM",
    price: "$10/day",
    status: "Completed",
  },
];

const PreviousOrders = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Grid container spacing={3} style={{marginTop:"50px"}}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
            <Card>
              <CardMedia component="img" height="140" image={order.image} alt={order.vehicle} />
              <CardContent>
                <Typography variant="h6">{order.vehicle}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {order.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: {order.price}
                </Typography>
                <Typography variant="body2" color={order.status === "Completed" ? "green" : "red"}>
                  Status: {order.status}
                </Typography>
                <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} sx={{ mt: 1 }} onClick={() => handleOpen(order)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <>
              <Typography variant="h6">{selectedOrder.vehicle}</Typography>
              <Typography>Model: {selectedOrder.model}</Typography>
              <Typography>Condition: {selectedOrder.condition}</Typography>
              <Typography>Price: {selectedOrder.price}</Typography>
              <Typography>Date: {selectedOrder.date}</Typography>
              <Typography>Time: {selectedOrder.time}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviousOrders;
