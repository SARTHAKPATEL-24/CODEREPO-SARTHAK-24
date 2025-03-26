import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Grid, Link } from "@mui/material";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "30px", marginTop: "100px", borderRadius: "10px" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
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
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: "10px" }}>
                    <Grid item>
                        <Link component="button" variant="body2" onClick={() => navigate("/User/Forgotpass")}>
                            Forgot Password?
                        </Link>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/home')}
                    style={{ marginTop: "20px", backgroundColor: "#8b9a9b", color: "#fff" }}
                >
                    Login
                </Button>
                <Typography align="center" style={{ marginTop: "15px" }}>
                    Don't have an account? 
                    <Button color="primary" onClick={() => navigate("/user/signup")}>
                        <u>Sign Up</u>
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Login;
