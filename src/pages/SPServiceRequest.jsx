import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const SPServiceRequest = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        // Get the current logged-in SP's UID
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.error("No logged-in user found.");
          setLoading(false);
          return;
        }

        // Query orders where spId matches the logged-in SP's UID
        const q = query(
          collection(db, "userOrders"),
          where("spuserid", "==", currentUser.uid), // Filter by spId
          where("status", "in", ["pending", "in-progress"]) // Fetch pending and in-progress orders
        );

        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const orderDoc = doc(db, "userOrders", orderId);
      await updateDoc(orderDoc, { status: "in-progress" }); // Update status to in-progress
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "in-progress" } : order
        )
      );
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleMarkAsCompleted = async (orderId) => {
    try {
      const orderDoc = doc(db, "userOrders", orderId);
      await updateDoc(orderDoc, { status: "completed" }); // Update status to completed
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      const orderDoc = doc(db, "userOrders", orderId);
      await updateDoc(orderDoc, { status: "rejected" }); // Update status to rejected
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Service Requests
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
                  <Typography
                    variant="body2"
                    color={order.status === "in-progress" ? "primary" : "text.secondary"}
                    sx={{ mt: 1 }}
                  >
                    Status: {order.status === "in-progress" ? "In Progress" : "Pending"}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    {order.status === "pending" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRejectOrder(order.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {order.status === "in-progress" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleMarkAsCompleted(order.id)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No service requests found.</Typography>
      )}
    </Container>
  );
};

export default SPServiceRequest;
