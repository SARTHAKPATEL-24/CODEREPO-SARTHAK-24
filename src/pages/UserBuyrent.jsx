import React, { useState } from "react";
import {
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  CardMedia,
  Box,
  Select,
  MenuItem,
} from "@mui/material";

const cities = ["Ahmedabad", "Gandhinagar", "Vadodara", "Surat"];

const generateVehiclesForCity = (city) => {
  const vehicleNames = [
    "Honda Activa", "TVS Jupiter", "Suzuki Access", "Royal Enfield Classic",
    "Bajaj Pulsar", "Yamaha FZ", "KTM Duke", "Hero Splendor",
    "Honda Shine", "Suzuki Burgman", "Yamaha R15", "Bajaj Avenger",
    "TVS Apache", "Honda Dio", "Kawasaki Ninja", "Harley Davidson",
    "Honda CB350", "Bajaj Dominar", "TVS Ronin", "Hero Xpulse",
    "Ducati Monster", "Benelli TRK", "KTM RC390", "Aprilia SXR",
    "Suzuki Gixxer", "Triumph Speed", "Revolt RV400", "Ola S1 Pro"
  ];

  const vehicleTypes = ["buy", "rent"];
  const conditions = ["New", "Used"];
  const owners = ["John Doe", "Alice Smith", "Michael Brown", "David Wilson", "Sophia Green"];
  const models = ["X1", "Z5", "Pro Max", "Classic A", "Sport B", "Eco Rider", "Turbo X"];
  const images = [
    "https://source.unsplash.com/300x200/?motorcycle",
    "https://source.unsplash.com/300x200/?bike",
    "https://source.unsplash.com/300x200/?scooter",
  ];

  return Array.from({ length: 56 }, (_, i) => ({
    id: `${city}-${i + 1}`,
    city,
    name: vehicleNames[i % vehicleNames.length],
    model: models[i % models.length],
    price: vehicleTypes[i % 2] === "buy" ? `$${10000 + i * 500}` : `$${40 + (i % 10) * 5}/day`,
    type: vehicleTypes[i % 2],
    owner: owners[i % owners.length],
    condition: conditions[i % conditions.length],
    image: images[i % images.length],
  }));
};

const vehiclesByCity = cities.reduce((acc, city) => {
  acc[city] = generateVehiclesForCity(city);
  return acc;
}, {});

const BuyRentPage = () => {
  const [view, setView] = useState("buy");
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");

  const filteredVehicles = vehiclesByCity[selectedCity].filter((vehicle) => vehicle.type === view);

  return (
    <Container style={{ marginTop: "80px" }}>
      <AppBar position="static" style={{ backgroundColor: "#ffffff", boxShadow: "none" }}>
        <Toolbar style={{ display: "flex", justifyContent: "center", gap: "30px", padding: "15px 0" }}>
          <Button
            onClick={() => setView("buy")}
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: view === "buy" ? "#000" : "#888",
              borderBottom: view === "buy" ? "3px solid #000" : "none",
              borderRadius: "0px",
              textTransform: "none",
            }}
          >
            Buy Vehicles
          </Button>

          <Button
            onClick={() => setView("rent")}
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              color: view === "rent" ? "#000" : "#888",
              borderBottom: view === "rent" ? "3px solid #000" : "none",
              borderRadius: "0px",
              textTransform: "none",
            }}
          >
            Rent Vehicles
          </Button>
        </Toolbar>
      </AppBar>

      <Box display="flex" justifyContent="center" mt={2}>
        <Select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          variant="outlined"
          sx={{ minWidth: 200, fontSize: "16px" }}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {filteredVehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
            <Card>
              <CardMedia component="img" height="180" image={vehicle.image} alt={vehicle.name} />
              <CardContent>
                <Typography variant="h6">{vehicle.name}</Typography>
                <Typography variant="body2">Model: {vehicle.model}</Typography>
                <Typography variant="body2">Price: {vehicle.price}</Typography>
                <Typography variant="body2">Owner: {vehicle.owner}</Typography>
                <Typography variant="body2">Condition: {vehicle.condition}</Typography>
                <Typography variant="body2">City: {vehicle.city}</Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#8b9a9b",
                      color: "#fff",
                      fontWeight: "bold",
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                  >
                    {view === "buy" ? "Buy Now" : "Rent Now"}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BuyRentPage;
