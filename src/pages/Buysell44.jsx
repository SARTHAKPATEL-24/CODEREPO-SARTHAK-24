import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Sample data (replace with your actual API calls)
const sampleVehicles = [
  {
    id: 1,
    name: 'Honda Activa 125',
    image: 'https://via.placeholder.com/300',
    price: 150,
    type: 'Scooter',
    condition: 'Used',
  },
  {
    id: 2,
    name: 'Royal Enfield Classic 350',
    image: 'https://via.placeholder.com/300',
    price: 300,
    type: 'Motorcycle',
    condition: 'New',
  },
  // ... more vehicles
];

const BuySellPage = () => {
  const [vehicles, setVehicles] = useState(sampleVehicles);
  const [filterType, setFilterType] = useState('All');
  const [filterCondition, setFilterCondition] = useState('All');
  const [sellDialogOpen, setSellDialogOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    image: '',
    price: '',
    type: 'Scooter',
    condition: 'Used',
  });

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterConditionChange = (event) => {
    setFilterCondition(event.target.value);
  };

  const handleSellDialogOpen = () => {
    setSellDialogOpen(true);
  };

  const handleSellDialogClose = () => {
    setSellDialogOpen(false);
    setNewVehicle({
      name: '',
      image: '',
      price: '',
      type: 'Scooter',
      condition: 'Used',
    });
  };

  const handleSellVehicle = () => {
    // Implement your API call to add the new vehicle
    setVehicles([...vehicles, { ...newVehicle, id: vehicles.length + 1 }]);
    handleSellDialogClose();
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filterType !== 'All' && vehicle.type !== filterType) {
      return false;
    }
    if (filterCondition !== 'All' && vehicle.condition !== filterCondition) {
      return false;
    }
    return true;
  });

  const VehicleCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: theme.spacing(2),
  }));

  return (
    <Container maxWidth="lg" style={{ marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom>
        Buy & Sell Two Wheelers
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="type-filter-label">Type</InputLabel>
            <Select
              labelId="type-filter-label"
              id="type-filter"
              value={filterType}
              label="Type"
              onChange={handleFilterTypeChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Scooter">Scooter</MenuItem>
              <MenuItem value="Motorcycle">Motorcycle</MenuItem>
              {/* Add more types if needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="condition-filter-label">Condition</InputLabel>
            <Select
              labelId="condition-filter-label"
              id="condition-filter"
              value={filterCondition}
              label="Condition"
              onChange={handleFilterConditionChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button variant="contained" style={{ marginTop: '20px',backgroundColor:"#8b9a9b" }} onClick={handleSellDialogOpen}>
        Sell Your Vehicle
      </Button>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {filteredVehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
            <VehicleCard>
              <CardMedia component="img" height="140" image={vehicle.image} alt={vehicle.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {vehicle.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {vehicle.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Condition: {vehicle.condition}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${vehicle.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View Details
                </Button>
                {/* Add more actions like "Buy Now" */}
              </CardActions>
            </VehicleCard>
          </Grid>
        ))}
      </Grid>

      <Dialog open={sellDialogOpen} onClose={handleSellDialogClose}>
        <DialogTitle>Sell Your Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Vehicle Name"
            type="text"
            fullWidth
            value={newVehicle.name}
            onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            type="text"
            fullWidth
            value={newVehicle.image}
            onChange={(e) => setNewVehicle({ ...newVehicle, image: e.target.value })}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={newVehicle.price}
            onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="sell-type-label">Type</InputLabel>
            <Select
              labelId="sell-type-label"
              id="sell-type"
              value={newVehicle.type}
              label="Type"
              onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
            >
              <MenuItem value="Scooter">Scooter</MenuItem>
              <MenuItem value="Motorcycle">Motorcycle</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="sell-condition-label">Condition</InputLabel>
            <Select
              labelId="sell-condition-label"
              id="sell-condition"
              value={newVehicle.condition}
              label="Condition"
              onChange={(e) => setNewVehicle({ ...newVehicle, condition: e.target.value })}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSellDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSellVehicle} color="primary">
            Sell
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BuySellPage;