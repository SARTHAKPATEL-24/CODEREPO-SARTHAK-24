import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const UserRepairOrder = () => {
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "UserRepairOrder"), (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUpcomingOrders(orders.filter((order) => order.status === "inprogress"));
      setCompletedOrders(orders.filter((order) => order.status === "completed"));
    });

    return () => unsubscribe();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderOrders = (orders, label) => (
    <Box sx={{ mt: 3 }}>
      {orders.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          No {label.toLowerCase()} orders available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {order.userName}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Shop Name: {order.shopName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Mobile: {order.mobile}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Address: {order.address}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Service: <strong>{order.service}</strong>
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold"  sx={{ mt: 1 }}>
                    Price: ₹{order.price}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
                    Status: <strong>{order.status}</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Repair Orders
      </Typography>

      <Box sx={{ width: "100%", bgcolor: "#f2f8fa", mt: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          
        >
          <Tab label="Upcoming Orders" sx={{fontWeight:"bold"}} />
          <Tab label="Completed Orders" sx={{fontWeight:"bold"}} />
        </Tabs>
      </Box>

      {selectedTab === 0 && renderOrders(upcomingOrders, "Upcoming")}
      {selectedTab === 1 && renderOrders(completedOrders, "Completed")}
    </Container>
  );
};

export default UserRepairOrder;
