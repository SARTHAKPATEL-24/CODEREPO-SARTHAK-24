import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
} from "@mui/material";

const SPOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "userOrders"),
          where("status", "==", "completed") // Fetch only completed orders
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching completed orders:", error);
        setLoading(false);
      }
    };

    fetchCompletedOrders();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Completed Orders
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : orders.length > 0 ? (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={order.image || "https://via.placeholder.com/300"}
                  alt={order.vehicleName}
                />
                <CardContent>
                  <Typography variant="h6">{order.vehicleName}</Typography>
                  <Typography variant="body2">Buyer: {order.userName}</Typography>
                  <Typography variant="body2">Mobile: {order.mobile}</Typography>
                  <Typography variant="body2">Address: {order.address}</Typography>
                  <Typography variant="body2">Pickup: {order.pickupDateTime}</Typography>
                  {order.type === "rent" && (
                    <Typography variant="body2">Return: {order.returnDateTime}</Typography>
                  )}
                  <Typography variant="body2">Payment: {order.paymentStatus}</Typography>
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    Status: Completed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No completed orders found.</Typography>
      )}
    </Container>
  );
};

export default SPOrder;
