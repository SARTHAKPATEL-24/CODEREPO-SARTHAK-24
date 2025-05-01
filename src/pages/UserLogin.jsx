import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Grid, Link, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../config/Firebase"; // Adjust the import path as necessary
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase authentication method

function Login({handleLoginfromApp}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [error, setError] = useState(""); // State to handle login errors

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in both email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
      
            // Get Firebase access token (JWT)
            const token = await user.getIdToken();
      
            console.log("Access Token:", token);
            

             // Store in localStorage or cookies
            localStorage.setItem("accessToken", token);
            localStorage.setItem("userEmail", email); // Store email in localStorage
            localStorage.setItem("userId", userCredential.user.uid); // Store user ID in localStorage
            handleLoginfromApp();

            navigate("/User/home"); // Redirect to home page after successful login
            // Redirect or continue
          } catch (error) {
            console.error("Login error:", error.message);
          }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "30px", marginTop: "70px", borderRadius: "10px" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                {error && (
                    <Typography variant="body2" color="error" align="center" style={{ marginBottom: "10px" }}>
                        {error}
                    </Typography>
                )}
                <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"} // Toggle between text and password
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
               
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogin} // Call handleLogin on button click
                    style={{ marginTop: "20px", backgroundColor: "#8b9a9b", color: "#fff" }}
                >
                    Login
                </Button>
                <Typography align="center" style={{ marginTop: "15px" }}>
                    Don't have an account? 
                    <Button color="primary" onClick={() => navigate("/User/Signup")}>
                        <u>Sign Up</u>
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Login;
