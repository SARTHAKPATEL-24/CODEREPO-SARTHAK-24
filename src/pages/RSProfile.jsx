import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Edit, Save, Visibility, VisibilityOff, AddCircle, RemoveCircle } from "@mui/icons-material";
import { auth, db } from "../config/Firebase"; // Import Firebase Auth and Firestore
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore methods

const RepairShopProfile = () => {
  const [profile, setProfile] = useState({
    shopName: "",
    ownerName: "",
    mobileNo: "",
    email: "",
    password: "",
    sinceYear: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    services: [{ name: "", price: "" }],
    profileImage: "", // Add profileImage field
  });

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleEdit = () => setEditMode(!editMode);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...profile.services];
    updatedServices[index][field] = value;
    setProfile({ ...profile, services: updatedServices });
  };

  const addService = () => {
    setProfile({
      ...profile,
      services: [...profile.services, { name: "", price: "" }],
    });
  };

  const removeService = (index) => {
    setProfile({
      ...profile,
      services: profile.services.filter((_, i) => i !== index),
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, "repairShops", userId);
      await updateDoc(userDocRef, profile);
      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDocRef = doc(db, "repairShops", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setProfile(userDoc.data());
        } else {
          console.error("No such user profile found!");
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Card elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Repair Shop Profile
            </Typography>
            <Button
              variant="contained"
              startIcon={editMode ? <Save /> : <Edit />}
              onClick={editMode ? saveProfile : toggleEdit}
              sx={{ bgcolor: "#8b9a9b", color: "#fff" }}
            >
              {editMode ? "Save" : "Edit"}
            </Button>
          </Grid>

          {/* Profile Image Section */}
          <Grid container justifyContent="center" mt={3}>
            <div style={{ position: "relative" }}>
              <Avatar
                src={profile.profileImage}
                alt="Repair Shop"
                sx={{ width: 120, height: 120, bgcolor: "#b0b0b0" }}
              />
              {editMode && (
                <>
                  <input
                    accept="image/*"
                    type="file"
                    id="profile-image-upload"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <label htmlFor="profile-image-upload">
                    <IconButton
                      component="span"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: "#fff",
                        color: "#000",
                        boxShadow: 1,
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </label>
                </>
              )}
            </div>
          </Grid>

          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Shop Name"
                value={profile.shopName}
                onChange={(e) => handleChange("shopName", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner Name"
                value={profile.ownerName}
                onChange={(e) => handleChange("ownerName", e.target.value)}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile No"
                type="tel"
                value={profile.mobileNo}
                onChange={(e) => handleChange("mobileNo", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Since Year"
                type="number"
                value={profile.sinceYear}
                onChange={(e) => handleChange("sinceYear", e.target.value)}
                disabled={!editMode}
              />
            </Grid>

            {/* Email and Password - Side by Side */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={profile.password}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={!editMode}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Services Offered Section */}
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" mt={2}>
                Services Offered
              </Typography>
              <TableContainer component={Paper} elevation={2} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>Service Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Price (₹)</TableCell>
                      {editMode && <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {profile.services.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={service.name}
                            onChange={(e) =>
                              handleServiceChange(index, "name", e.target.value)
                            }
                            disabled={!editMode}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            type="number"
                            value={service.price}
                            onChange={(e) =>
                              handleServiceChange(index, "price", e.target.value)
                            }
                            disabled={!editMode}
                          />
                        </TableCell>
                        {editMode && (
                          <TableCell>
                            <IconButton onClick={() => removeService(index)}>
                              <RemoveCircle color="error" />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {editMode && (
                <Button
                  sx={{ mt: 2, color: "#1976d2" }}
                  startIcon={<AddCircle sx={{ color: "#1976d2" }} />}
                  onClick={addService}
                >
                  Add Service
                </Button>
              )}
            </Grid>

            {/* Address Section */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                value={profile.address}
                onChange={(e) => handleChange("address", e.target.value)}
                disabled={!editMode}
              />
            </Grid>

            {/* Location Details */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                value={profile.country}
                onChange={(e) => handleChange("country", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="State"
                value={profile.state}
                onChange={(e) => handleChange("state", e.target.value)}
                disabled={!editMode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={profile.city}
                onChange={(e) => handleChange("city", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pin Code"
                value={profile.pinCode}
                onChange={(e) => handleChange("pinCode", e.target.value)}
                disabled={!editMode}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RepairShopProfile;
