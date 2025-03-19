import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained"  fullWidth sx={{ mt: 2 }} style={{backgroundColor:"#8b9a9b"}}>
            Login
          </Button>
           <Typography align="center" style={{ marginTop: "15px" }}>
                          If you have no account<Button color="primary" onClick={() => navigate("/Signup")}>
                                   <u>click here</u>
                              </Button>
                          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
