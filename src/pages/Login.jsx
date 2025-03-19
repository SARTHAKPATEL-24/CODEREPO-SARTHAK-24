import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Checkbox, FormControlLabel, Button, Typography, Card, CardContent } from "@mui/material";

function Glide() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", password: "" });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
      <Card sx={{ width: "100%", p: 3, bgcolor: "white", color: "black" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" sx={{ textDecoration: "underline" }}>
            LOGIN FORM
          </Typography>
          <TextField
            fullWidth
            label="User Name"
            variant="outlined"
            name="name"
            onChange={handleChange}
            sx={{ mb: 2, bgcolor: "white", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Enter Password"
            type="password"
            variant="outlined"
            name="password"
            onChange={handleChange}
            sx={{ mb: 2, bgcolor: "white", borderRadius: 1 }}
          />
          <FormControlLabel control={<Checkbox sx={{ color: "black" }} />} label={<Typography color="black">Keep me logged in</Typography>} />
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#8b9a9b", color: "white", mt: 2 }}
            onClick={() => console.log(data)}
          >
            LOGIN
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account? 
            <Button sx={{ color: "#1976D2", textTransform: "none" }} onClick={() => navigate("/Signup")}>Sign Up</Button>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Glide;
