import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Avatar,
  Paper,
  Stack,
  Typography,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SPProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "sarthak",
    surname: "Patel",
    email: "sarthakpatel201@gmail.com",
    mobile: "7046087650",
    password: "password123",
    address: "vastral",
    country: "India",
    state: "Gujarat",
    city: "Ahmedabad",
    pinCode: "382418",
    profileImage: "",
    serviceType: "Rent", // Added service type
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "80px" }}>
      <Paper elevation={3} style={{ padding: 20, background: "white", borderRadius: 10 }}>
        <Stack spacing={3} alignItems="center">
          <div style={{ position: "relative" }}>
            <Avatar src={formData.profileImage} style={{ width: 100, height: 100, background: "#b0b0b0" }} />
            {isEditing && (
              <>
                <input
                  accept="image/*"
                  type="file"
                  name="profileImage"
                  onChange={(e) => setFormData({ ...formData, profileImage: URL.createObjectURL(e.target.files[0]) })}
                  style={{ display: "none" }}
                  id="profile-upload"
                />
                <label htmlFor="profile-upload">
                  <Button
                    component="span"
                    startIcon={<EditIcon />}
                    size="small"
                    variant="contained"
                    style={{ position: "absolute", bottom: 0, right: 0, background: "#fff", color: "#000" }}
                  >
                    Edit
                  </Button>
                </label>
              </>
            )}
          </div>

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
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                variant="outlined"
                disabled={!isEditing}
              >
                <MenuItem value="Sell">Sell</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
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
