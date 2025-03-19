import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const ForgetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      // Handle password reset logic here
      alert("Password reset successfully!");
    }
  };

  return (
    <Container maxWidth="sm" style={{marginTop:"100px"}}>
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            variant="contained"
            style={{backgroundColor:"#8b9a9b"}}
            fullWidth
            sx={{ mt: 2 }}
          >
            Reset Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgetPassword;