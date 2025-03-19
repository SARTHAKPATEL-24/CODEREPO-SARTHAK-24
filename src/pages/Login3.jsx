import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

function Trial() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: "20px", marginTop: "100px", borderRadius: "8px" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login Page
                </Typography>
                <TextField
                    fullWidth
                    label="Email Id"
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
                <Button
                    variant="contained"
                    
                    fullWidth
                    onClick={() => navigate('/Home')}
                    style={{ marginTop: "20px",backgroundColor:"#8b9a9b" }}
                >
                    Login
                </Button>
                <Typography align="center" style={{ marginTop: "15px" }}>
                If not registered<Button color="primary" onClick={() => navigate("/Signup")}>
                         <u>click here</u>
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Trial;