import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  Switch,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, AddCircle, Search } from "@mui/icons-material";

const serviceNames = [
  "Oil Change", "Engine Repair", "Brake Inspection", "Battery Replacement", "Tire Rotation", "Suspension Check",
  "Transmission Service", "Exhaust System Repair", "Wheel Alignment", "Radiator Service", "Fuel System Cleaning",
  "Spark Plug Replacement", "Headlight Restoration", "Windshield Repair", "Clutch Repair", "Gearbox Overhaul", "Emission Testing",
  "Steering Adjustment", "Cooling System Repair"
];

const ManageRepairList = () => {
  const [services, setServices] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: serviceNames[i % serviceNames.length],
      price: (i + 1) * 100,
      duration: (i + 1) * 5,
      status: i % 2 === 0,
    }))
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("price");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleSearch = (event) => setSearchTerm(event.target.value);
  const handleSort = (event) => setSortOption(event.target.value);
  const handleStatusChange = (id) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, status: !service.status } : service
      )
    );
  };
  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const sortedServices = [...services].sort((a, b) => a[sortOption] - b[sortOption]);
  const filteredServices = sortedServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
        Manage Repair Services
      </Typography>
      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <TextField
          placeholder="Search Service"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />,
          }}
        />
        <Select value={sortOption} onChange={handleSort} size="small" displayEmpty>
          <MenuItem value="price">Sort by Price</MenuItem>
          <MenuItem value="duration">Sort by Duration</MenuItem>
        </Select>
        <Button variant="contained" startIcon={<AddCircle />} sx={{ bgcolor: "#8b9a9b", color: "#fff" }}>
          Add Service
        </Button>
      </div>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Service Name</strong></TableCell>
              <TableCell><strong>Price (₹)</strong></TableCell>
              <TableCell><strong>Duration (min)</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>₹{service.price}</TableCell>
                <TableCell>{service.duration} min</TableCell>
                <TableCell>
                  <Switch checked={service.status} onChange={() => handleStatusChange(service.id)} color="primary" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(service.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={filteredServices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
      />
    </Container>
  );
};

export default ManageRepairList;
