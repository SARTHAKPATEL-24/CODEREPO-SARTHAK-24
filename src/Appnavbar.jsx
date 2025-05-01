import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Button, Drawer,
  List, ListItemButton, ListItemText, IconButton,
  Divider, Box
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./assets/images/Logo.png"; // Adjust the path to your logo image

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Load the todos on mount
    const todosString = localStorage.getItem("accessToken");
    if (todosString) {
      setIsLogin(true);
    }
    // Respond to the `storage` event
    function storageEventHandler(event) {
      if (event.key === "accessToken") {
        if (event.newValue) {
          setIsLogin(true);
        }

      }
    }
    // Hook up the event handler
    window.addEventListener("storage", storageEventHandler);
    return () => {
      // Remove the handler when the component unmounts
      window.removeEventListener("storage", storageEventHandler);
    };
  }, [isAuthenticated]);


  // Navigation items for Users
  const userNavItems = [
    { text: "Home", path: "/User/home" },
    { text: "Buy & Rent", path: "/User/buy-rent" },
    { text: "Repair & Services", path: "/User/repair" },
    { text: "Repair Order", path: "/User/repairorder" },
    { text: "Buy & Rent Order", path: "/User/Order" },
    { text: "My Profile", path: "/User/profile" },
    { text: "Contact Us", path: "/User/contactus" },
  ];

  // Navigation items for Service Providers (SP)
  const spNavItems = [
    { text: "Dashboard", path: "/SP/Dashboard" },
    { text: "Sell & Rent", path: "/SP/Sell-rent" },
    { text: "Service Request", path: "/SP/requests" },
    { text: "Orders", path: "/SP/orders" },
    { text: "Profile", path: "/SP/profile" },
    { text: "Support", path: "/SP/support" },
  ];

  // Navigation items for Repair Shops
  const repairShopNavItems = [
    { text: "Request Orders", path: "/Repairshop/requests" },
    { text: "Previous Orders", path: "/Repairshop/orders" },
    { text: "Profile", path: "/Repairshop/profile" },
    { text: "Support", path: "/Repairshop/support" },

  ];

  // Determine navigation type based on route
  const isSP = location.pathname.startsWith("/SP");
  const isRepairShop = location.pathname.startsWith("/Repairshop");
  const navItems = isSP ? spNavItems : isRepairShop ? repairShopNavItems : userNavItems;

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
        {isLogin && isAuthenticated && <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        }
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
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1, marginLeft: 2 }}>
          <img
            src={Logo} // Replace with the correct path to your logo
            alt="Logo"
            style={{ height: "40px", marginRight: "10px",width:"40px",borderRadius:"50%", objectFit:"cover" }} // Adjust height and spacing as needed
          />
          <Typography variant="h6" sx={{ color: "#FFF" }}>
            GlideGo
          </Typography>
        </Box>

        {/* Login Button */}
        {window.location.pathname !== "/Homepage" && <>
          {isLogin && isAuthenticated ? <Button
            color="inherit"
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userEmail");
              localStorage.removeItem("userId");
              handleLogout();
              navigate(isSP ? "/SP/Login" : isRepairShop ? "/Repairshop/Login" : "/User/Login")
            }}
          >Logout</Button> : <Button
            color="inherit"
            sx={{ marginLeft: "auto" }}
            onClick={() => navigate(isSP ? "/SP/Login" : isRepairShop ? "/Repairshop/Login" : "/User/Login")}
          >
            Login
          </Button>}
        </>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
