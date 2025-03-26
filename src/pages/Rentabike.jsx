import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const shops = Array.from({ length: 16 }, (_, index) => ({
  id: index + 1,
  name: `Shop ${index + 1}`,
  image: `https://source.unsplash.com/300x200/?bike,shop`,
  description: `This is a bike rental shop offering the best two-wheelers in town.`,
  vehicles: [
    { name: "Scooter", price: "$10/day" },
    { name: "Bike", price: "$15/day" },
  ],
}));

const ShopList = () => {
  const [selectedShop, setSelectedShop] = useState(null);

  return (
    <>
      <Grid container spacing={5} style={{marginTop:"50px"}} >
        {shops.map((shop) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={shop.id}>
            <Card>
              <CardMedia component="img" height="140" image={shop.image} alt={shop.name} />
              <CardContent>
                <Typography variant="h6">{shop.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {shop.description}
                </Typography>
                <Button variant="contained" style={{backgroundColor:"#8b9a9b"}} onClick={() => setSelectedShop(shop)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedShop} onClose={() => setSelectedShop(null)}>
        {selectedShop && (
          <>
            <DialogTitle>{selectedShop.name}</DialogTitle>
            <DialogContent>
              <Typography>{selectedShop.description}</Typography>
              <Typography variant="h6" style={{ marginTop: 10 }}>Available Vehicles:</Typography>
              {selectedShop.vehicles.map((vehicle, index) => (
                <Typography key={index}>{vehicle.name} - {vehicle.price}</Typography>
              ))}
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ShopList;
