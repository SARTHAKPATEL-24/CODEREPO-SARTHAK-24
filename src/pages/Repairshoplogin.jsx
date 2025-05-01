import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Checkbox, FormControlLabel, Button, Typography, Card, CardContent, Link, Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, db } from "../config/Firebase"; // Import Firebase Auth and Firestore
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth method
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

function RepairShopLogin({handleLoginfromApp}) {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState(""); // State to store error messages

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      // Authenticate user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Fetch user profile from Firestore
      const userDocRef = doc(db, "repairShops", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userProfile = userDoc.data();
        console.log("User profile fetched:", userProfile);

        // Get Firebase access token (JWT)
        const token = await user.getIdToken();
        console.log("Access Token:", token);

        // Store profile data and token in localStorage
        
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userEmail", data.email); // Store email in localStorage
        localStorage.setItem("userId", userCredential.user.uid);
        handleLoginfromApp();

        // Redirect to the profile page
        navigate("/Repairshop/requests");
      } else {
        console.error("No such user profile found!");
        setError("No profile found for this account.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <Card sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
            LOGIN
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            fullWidth
            label="User Email"
            variant="outlined"
            name="email"
            value={data.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Enter Password"
            type={showPassword ? "text" : "password"} // Toggle between text and password
            variant="outlined"
            name="password"
            value={data.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <FormControlLabel
              control={<Checkbox />}
              label={<Typography variant="body2">Keep me logged in</Typography>}
            />
           
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#8b9a9b", color: "white", py: 1.2, fontSize: "1rem", fontWeight: "bold" }}
            onClick={handleLogin} // Call the login function
          >
            LOGIN
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?
            <Button sx={{ color: "#1976D2", textTransform: "none" }} onClick={() => navigate("/Repairshop/signup")}>
              Sign Up
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default RepairShopLogin;