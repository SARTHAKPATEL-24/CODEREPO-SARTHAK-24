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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    surname: "Doe",
    email: "johndoe@example.com",
    mobile: "1234567890",
    password: "password123",
    address:"vastral",
    country: "USA",
    state: "California",
    city: "Los Angeles",
    pinCode: "90001",
    profileImage: "",
    licenseFile: "No file uploaded",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file ? file.name : "No file uploaded" });
  };

  return (
    <Container maxWidth="md" style={{marginTop:"80px"}}>
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
                  onChange={handleFileChange}
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
            {[
              { label: "First Name", name: "firstName" },
              { label: "Surname", name: "surname" },
              { label: "Email ID", name: "email" },
              { label: "Password", name: "password", type: showPassword ? "text" : "password" },
              { label: "Mobile Number", name: "mobile" },
              { label: "Address", name: "address" },
              { label: "Country", name: "country" },
              { label: "State", name: "state" },
              { label: "City", name: "city" },
              { label: "Pin Code", name: "pinCode" },
            ].map((field) => (
              <Grid item xs={6} key={field.name}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name]}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={!isEditing}
                  InputProps={
                    field.name === "password" && isEditing
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }
                      : {}
                  }
                />
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" style={{ color: "#555" }}>
            Uploaded License: {formData.licenseFile}
          </Typography>
          {isEditing && (
            <>
              <input
                accept="image/*"
                type="file"
                name="licenseFile"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="license-upload"
              />
              <label htmlFor="license-upload">
                <Button fullWidth component="span" variant="contained" style={{ backgroundColor: "#8b9a9b" }}>
                  Upload License
                </Button>
              </label>
            </>
          )}
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

export default UserProfile;
