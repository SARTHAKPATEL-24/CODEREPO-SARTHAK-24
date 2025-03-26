import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Checkbox, FormControlLabel, Button, Typography, Card, CardContent, Link, Box } from "@mui/material";

function Glide() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <Card sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2 }}> 
        <CardContent>
          <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
            LOGIN
          </Typography>
          <TextField
            fullWidth
            label="User Email"
            variant="outlined"
            name="email"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Enter Password"
            type="password"
            variant="outlined"
            name="password"
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <FormControlLabel 
              control={<Checkbox />} 
              label={<Typography variant="body2">Keep me logged in</Typography>} 
            />
            <Link component="button" variant="body2" onClick={() => navigate("/SP/Forgotpass")} sx={{ textDecoration: "none" }}>
              Forgot Password?
            </Link>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#8b9a9b", color: "white", py: 1.2, fontSize: "1rem", fontWeight: "bold" }}
            onClick={() => navigate("/SP/Dashboard")}
          >
            LOGIN
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account? 
            <Button sx={{ color: "#1976D2", textTransform: "none" }} onClick={() => navigate("/SP/signup")}>
              Sign Up
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Glide;