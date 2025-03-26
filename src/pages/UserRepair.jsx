import React, { useState } from "react";
import { AppBar, Tabs, Tab, Card, CardMedia, CardContent, Typography, Button, Grid, Container, Toolbar } from "@mui/material";

const ownerNames = ["John Doe", "Paddy Smith", "Mahesh Verma", "Amit Patel", "Suresh Reddy", "Ravi Kumar", "Manoj Sharma", "Rahul Singh", "Vikas Mehta", "Anil Kapoor", "Deepak Joshi", "Rajesh Khanna", "Arun Mishra", "Vijay Chauhan", "Sanjay Das", "Kiran Yadav"];

const repairShops = {
  Ahmedabad: Array(16).fill().map((_, i) => ({ name: `Speed service ${i+1}`, owner: ownerNames[i % ownerNames.length], address: `Example Address, Ahmedabad`, mobile: `98765432${i+10}`, image: "https://via.placeholder.com/300" })),
  Gandhinagar: Array(16).fill().map((_, i) => ({ name: `Quick Fix ${i+1}`, owner: ownerNames[i % ownerNames.length], address: `Example Address, Gandhinagar`, mobile: `98765432${i+20}`, image: "https://via.placeholder.com/300" })),
  Vadodara: Array(16).fill().map((_, i) => ({ name: `Fast Repairs ${i+1}`, owner: ownerNames[i % ownerNames.length], address: `Example Address, Vadodara`, mobile: `98765432${i+30}`, image: "https://via.placeholder.com/300" })),
  Surat: Array(16).fill().map((_, i) => ({ name: `Pro Garage ${i+1}`, owner: ownerNames[i % ownerNames.length], address: `Example Address, Surat`, mobile: `98765432${i+40}`, image: "https://via.placeholder.com/300" }))
};

const RepairShopsPage = () => {
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");

  const handleContactClick = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };

  return (
    <Container style={{marginTop:"80px"}}>
      <AppBar position="static" elevation={1} >
        <Toolbar sx={{ display: "flex", justifyContent: "center",bgcolor:"#f2f8fa",color:"#333" }}>
          <Tabs
            value={selectedCity}
            onChange={(e, newValue) => setSelectedCity(newValue)}
            textColor="inherit"
            indicatorColor="darkblack"
            variant="standard"
            sx={{ '& .MuiTab-root': { minWidth: 120, fontSize: 16, fontWeight: 'bold', mx: 2 } }}
          >
            {Object.keys(repairShops).map((city) => (
              <Tab key={city} label={city} value={city} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>Vehicle Repair & Service Shops</Typography>
      <Grid container spacing={3} justifyContent="center">
        {repairShops[selectedCity].map((shop, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardMedia component="img" height="200" image={shop.image} alt={shop.name} />
              <CardContent>
                <Typography variant="h6">{shop.name}</Typography>
                <Typography variant="body2" color="text.secondary">Owner: {shop.owner}</Typography>
                <Typography variant="body2" color="text.secondary">{shop.address}</Typography>
                <Typography variant="body2" color="text.secondary">📞 {shop.mobile}</Typography>
                <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} sx={{ mt: 1 }} onClick={() => handleContactClick(shop.mobile)}>Contact</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RepairShopsPage;