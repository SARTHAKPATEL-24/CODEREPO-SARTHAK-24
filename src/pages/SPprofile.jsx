import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { auth, db } from "../config/Firebase"; // Import Firebase Auth and Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

const SPProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    service: "", // Ensure this matches the Firestore field name
  });

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid; // Get the current user's UID
        const userDocRef = doc(db, "SPusers", userId); // Reference to the user's document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setFormData(userDoc.data()); // Populate formData with fetched data
        } else {
          console.error("No such user profile!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "80px" }}>
      <Paper elevation={3} style={{ padding: 20, background: "white", borderRadius: 10 }}>MY PROFILE
        <Stack spacing={3} alignItems="center">
          <Grid container spacing={2}>
            {["firstName", "surname", "email", "mobile", "address", "country", "state", "city", "pinCode"].map((field) => (
              <Grid item xs={6} key={field}>
                <TextField
                  fullWidth
                  label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={!isEditing}
                />
              </Grid>
            ))}
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                disabled={!isEditing}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Service Type"
                name="service" // Ensure this matches the Firestore field name
                value={formData.service} // Ensure this matches the Firestore field name
                onChange={handleChange}
                variant="outlined"
                disabled={!isEditing}
              >
                <MenuItem value="sell">Sell Vehicle</MenuItem>
                <MenuItem value="rent">Rent Vehicle</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#8b9a9b" }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SPProfile;
