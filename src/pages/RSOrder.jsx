import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase"; // Import Firestore
import { collection, onSnapshot } from "firebase/firestore";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

const RSOrder = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

  // Fetch completed orders from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "UserRepairOrder"), (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter orders with status "completed"
      setCompletedOrders(orders.filter((order) => order.status === "completed"));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Completed Orders
      </Typography>

      <Grid container spacing={4}>
        {completedOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card elevation={4} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User: {order.userName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📞 Mobile: {order.mobile}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📍 Address: {order.address}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  🔧 Service: {order.service}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
                  💰 Price: ₹{order.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  🟢 Status: <strong>{order.status}</strong>
                </Typography>
              </CardContent>
            </Card>
            <Divider sx={{ my: 2 }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RSOrder;