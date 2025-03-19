import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItemButton, ListItemText, IconButton, Divider, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation items array
  const navItems = [
    { text: "Home", path: "/home" },
    { text: "Rent a Bike", path: "/rent" },
    { text: "Buy & Sell", path: "/buy-sell" },
    { text: "Services", path: "/services" },
    { text: "ContactUs", path: "/contactus" },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="absolute" sx={{ backgroundColor: "#8b9a9b" }}>
      <Toolbar>
        {/* Menu Button for Opening Drawer */}
        <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        {/* Side Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, backgroundColor: "white", height: "100%" }} role="presentation">
            <List>
              {/* Close Drawer Button */}
              <ListItemButton onClick={toggleDrawer(false)}>
                <ArrowBackIcon />
                <ListItemText primary="" sx={{ marginLeft: 2 }} />
              </ListItemButton>
              <Divider />

              {/* Dynamic Navigation List */}
              {navItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setDrawerOpen(false); // Close drawer after navigation
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Logo & Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#FFF", marginLeft: 2 }}>
          GlideGo
        </Typography>

        {/* Login Button */}
        <Button color="inherit" sx={{ marginLeft: "auto" }} onClick={() => navigate("/Login3")}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
