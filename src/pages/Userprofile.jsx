import React, { useState, useEffect } from "react";
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
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { db, auth } from "../config/Firebase"; // Combined Firebase imports
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage imports

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    profileImage: "",
    license: "",
  });

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user || localStorage.getItem("userEmail")) {
          const q = query(collection(db, "users"), where("email", "==", localStorage.getItem("userEmail")));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            console.log("Fetched user data:", userData); // ✅ Log fetched data
            setFormData(userData);
          } else {
            console.error("No user data found!");
          }
        } else {
          console.error("No user is logged in!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Upload the file to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${file.name}`);
        await uploadBytes(storageRef, file);

        // Get the download URL for the uploaded file
        const downloadURL = await getDownloadURL(storageRef);

        // Update the profileImage field in Firestore
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, { profileImage: downloadURL });

        // Update the formData state to reflect the new profile image
        setFormData((prevData) => ({ ...prevData, profileImage: downloadURL }));

        console.log("Profile image updated successfully!");
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "80px" }}>
      <Paper elevation={3} style={{ padding: 20, background: "white", borderRadius: 10 }}>
        <Stack spacing={3} alignItems="center">
          <div style={{ position: "relative" }}>
            <Avatar
              src={formData.profileImage}
              alt="Profile"
              style={{ width: 100, height: 100, background: "#b0b0b0" }}
            />
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
                  <IconButton
                    component="span"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      color: "#000",
                   
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
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
                                {showPassword ? <Visibility /> : <VisibilityOff />}
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
            Uploaded License: {formData.license}
          </Typography>

          {isEditing && (
            <>
              <input
                accept="image/*"
                type="file"
                name="license"
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
