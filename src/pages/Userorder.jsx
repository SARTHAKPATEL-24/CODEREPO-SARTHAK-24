import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

const UserOrder = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.warn("User not logged in.");
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "userOrders"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleMarkAsCompleted = async (orderId) => {
    try {
      const orderDoc = doc(db, "userOrders", orderId);
      await updateDoc(orderDoc, { status: "completed" });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "completed" } : order
        )
      );
    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  const filteredOrders = orders.filter((order) =>
    tabIndex === 0 ? order.status === "in-progress" : order.status === "completed"
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        My Orders
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="Upcoming Orders" sx={{ fontSize: "16px", fontWeight: "bold" }} />
        <Tab label="Completed Orders" sx={{ fontSize: "16px", fontWeight: "bold" }} />
      </Tabs>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : filteredOrders.length > 0 ? (
        <Grid container spacing={3}>
          {filteredOrders.map((order) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ maxHeight: 200, objectFit: "cover" }}
                  image={order.image || "https://via.placeholder.com/150"}
                  alt={order.vehicleName}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {order.vehicleName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Model: {order.model}
                  </Typography>
                  <Typography variant="body2">
                    Type: {order.type === "buy" ? "Buy" : "Rent"}
                  </Typography>
                  <Typography variant="body2">
                    Pickup: {order.pickupDateTime}
                  </Typography>
                  {order.type === "rent" && (
                    <Typography variant="body2">
                      Return: {order.returnDateTime}
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="primary"
                    sx={{ mt: 1 }}
                  >
                    Price: {order.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 1 }}
                    color={
                      order.paymentStatus === "Paid"
                        ? "success.main"
                        : "error.main"
                    }
                  >
                    Payment: {order.paymentStatus}
                  </Typography>

                  {order.status === "upcoming" && (
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: "#8b9a9b", color: "#fff" }}
                      onClick={() => handleMarkAsCompleted(order.id)}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
          No orders found.
        </Typography>
      )}
    </Container>
  );
};

export default UserOrder;
