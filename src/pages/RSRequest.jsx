import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";

const RSRequest = () => {
  const [requests, setRequests] = useState([]);

  // Fetch requests from Firestore
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          console.error("No logged-in user found.");
          return;
        }

        // Query requests where rsuserid matches the logged-in repair shop user's ID
        const q = query(
          collection(db, "UserRepairOrder"),
          where("rsuserid", "==", currentUser.uid), // Filter by rsuserid
          where("status", "in", ["pending", "inprogress"]) // Fetch pending and in-progress requests
        );

        const querySnapshot = await getDocs(q);
        const fetchedRequests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    const requestRef = doc(db, "UserRepairOrder", id);
    await updateDoc(requestRef, { status: "inprogress" });
  };

  const handleReject = async (id) => {
    const requestRef = doc(db, "UserRepairOrder", id);
    await deleteDoc(requestRef);
  };

  const handleMarkAsCompleted = async (id) => {
    try {
      const requestRef = doc(db, "UserRepairOrder", id);
      await updateDoc(requestRef, { status: "completed" });
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Repair Service Requests
      </Typography>

      {requests.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          No order requests available.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {requests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    User: {request.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📞 Mobile: {request.mobile}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 Address: {request.address}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    🔧 Service: {request.service}
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
                    💰 Price: ₹{request.price}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    🟡 Status: <strong>{request.status}</strong>
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  {request.status === "pending" && (
                    <Box display="flex" gap={1}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#1976d2",
                          ":hover": { backgroundColor: "#1565c0" },
                        }}
                        onClick={() => handleAccept(request.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(request.id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}

                  {request.status === "inprogress" && (
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#2e7d32",
                        ":hover": { backgroundColor: "#1b5e20" },
                      }}
                      onClick={() => handleMarkAsCompleted(request.id)}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RSRequest;
