import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, MenuItem, Select, FormControl, InputLabel, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../config/Firebase"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

const HomePage = () => {
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Fetch services from Firestore
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesSnapshot = await getDocs(collection(db, "services"));
        const fetchedServices = servicesSnapshot.docs.map((doc) => doc.data());
        console.log("Fetched Services:", fetchedServices); // Log the fetched services
        setServices(fetchedServices);

      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  const handleSubmit = () => {
    localStorage.setItem("city", city);
    localStorage.setItem("service", service); 
    if (city && service) {
      console.log(`Selected City: ${city}, Selected Service: ${service}`);
      if (service === "rent") {
        navigate(`/User/buy-rent?city=${city}&service=${service}`);
      }
      else if (service === "buy") {
        navigate(`/User/buy-rent?city=${city}&service=${service}`);
      }
      else if (service === "repair") {
        navigate(`/User/repair?city=${city}`);
      }
    } else {
      alert("Please select both city and service.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 30 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side - Welcome Message */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 0, boxShadow: 0, bgcolor: "#f2f8fa" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Welcome to GLIDE GO!
              </Typography>
              <Typography variant="body1" paragraph>
                Your one-stop solution for renting, buying, and repairing two-wheelers in your city. Explore a seamless experience with our professional services tailored for your convenience.
              </Typography>
              <Button variant="contained" style={{ backgroundColor: "#8b9a9b" }} onClick={() => navigate("/User/AboutUs")}>
                Read More
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - City and Services Selection */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 1, boxShadow: 6, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Select Your Services
              </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select City</InputLabel>
                <Select value={city} onChange={(e) => setCity(e.target.value)} label="Select City">
                  <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
                  <MenuItem value="Gandhinagar">Gandhinagar</MenuItem>
                  <MenuItem value="Vadodara">Vadodara</MenuItem>
                  <MenuItem value="Surat">Surat</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Service</InputLabel>
                {console.log("Services:", services)} {/* Log the services state */}
                <Select value={service} onChange={(e) => setService(e.target.value)} label="Select Service">
                  {services.map((x) => {
                    console.log("Service Type:", x.name); // Log each service type
                    return (
                      <MenuItem key={x.type} value={x.type}>
                        {x.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
              <Button variant="contained" style={{ backgroundColor: "#8b9a9b" }} fullWidth onClick={handleSubmit}>
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
