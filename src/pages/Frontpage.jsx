import React from "react";
import Rent from "../assets/images/Rent.png";
import Repair from "../assets/images/Repair.png";
import Vehicles from "../assets/images/Vehicles.png";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  TextField,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Hidden
} from "@mui/material";
import {
  TwoWheeler,
  Build,
  DirectionsBike,
  LocalOffer,
  SupportAgent,
  LocationOn,
  Phone,
  Email,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  ExpandMore,
  CheckCircle,
  Star,
  Download
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
 const navigate = useNavigate();
  return (
    <Box sx={{ overflowX: "hidden", mt:8 }}>
      {/* Hero Section with Video Background */}
   
<Box
  sx={{
    height: isMobile ? "70vh" : "90vh",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    px: 2,
    overflow: "hidden",
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    animation: "fadeIn 2s ease-in-out",
    "@keyframes fadeIn": {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 }
    }
  }}
>
  <Typography
    variant={isMobile ? "h3" : "h2"}
    sx={{
      fontWeight: 900,
      mb: 3,
      textTransform: "uppercase",
      letterSpacing: "2px",
      textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
      animation: "slideUp 1s ease-out",
      "@keyframes slideUp": {
        "0%": { transform: "translateY(30px)", opacity: 0 },
        "100%": { transform: "translateY(0)", opacity: 1 }
      }
    }}
  >
    Glide Go
  </Typography>
  <Typography 
    variant={isMobile ? "h5" : "h4"} 
    sx={{ 
      mb: 4, 
      maxWidth: "800px",
      textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
      animation: "slideUp 1s ease-out 0.2s forwards",
      opacity: 0
    }}
  >
    Revolutionizing Two-Wheeler Mobility in Urban Spaces
  </Typography>
  
</Box>

      {/* Trust Badges Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {[
            { label: "500+ Happy Customers", icon: <Star color="primary" /> },
            { label: "24/7 Support", icon: <SupportAgent color="primary" /> },
            { label: "4 Locations", icon: <LocationOn color="primary" /> },
            { label: "Verified Partners", icon: <CheckCircle color="primary" /> }
          ].map((badge, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                  borderRadius: 2,
                  height: "100%",
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
                  {badge.icon}
                </Box>
                <Typography variant="body2" fontWeight={500}>
                  {badge.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* User, Service Provider, and Repair Shop Cards */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: 700,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2px"
            }
          }}
        >
          Join Our Ecosystem
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "For Users",
              description: "Experience seamless two-wheeler rentals and purchases tailored for your needs.",
              image: Rent,
              features: [
                "Wide selection of vehicles",
                "Flexible rental periods",
                "Competitive pricing",
                "24/7 roadside assistance"
              ],
              button: (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: "8px",
                    py: 1.5,
                    fontWeight: "bold",
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                      boxShadow: `0 0 15px ${theme.palette.primary.main}`
                    }
                  }}
                  onClick={() => navigate("/User/Login")} // Navigate to Riders page
                >
                  Start Renting
                </Button>
              ),
              color: theme.palette.primary.main
            },
            {
              title: "For Service Providers",
              description: "Join our network and connect with riders looking for your services.",
              image: Vehicles,
              features: [
                "Easy vehicle listing",
                "Revenue management",
                "Customer verification",
                "Insurance coverage"
              ],
              button: (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: "8px",
                    py: 1.5,
                    fontWeight: "bold",
                    backgroundColor: theme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      boxShadow: `0 0 15px ${theme.palette.secondary.main}`
                    }
                  }}
                  onClick={() => navigate("/SP/Login")} // Navigate to Service Providers page
                >
                  List Your Vehicles
                </Button>
              ),
              color: theme.palette.secondary.main
            },
            {
              title: "For Repair Shops",
              description: "Get listed and reach out to customers needing repair services.",
              image: Repair,
              features: [
                "Service requests in your area",
                "Digital payment system",
                "Customer ratings",
                "Business analytics"
              ],
              button: (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: "8px",
                    py: 1.5,
                    fontWeight: "bold",
                    backgroundColor: theme.palette.success.main,
                    "&:hover": {
                      backgroundColor: theme.palette.success.main,
                      boxShadow: `0 0 15px ${theme.palette.success.main}`
                    }
                  }}
                  onClick={() => navigate("/Repairshop/Login")} // Navigate to Repair Shops page
                >
                  Join as Repair Shop
                </Button>
              ),
              color: theme.palette.success.main
            }
          ].map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  borderTop: `4px solid ${card.color}`,
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: `0 10px 25px rgba(0,0,0,0.15)`
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={card.image}
                  alt={card.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {card.description}
                  </Typography>
                  <List dense sx={{ mb: 2 }}>
                    {card.features.map((feature, i) => (
                      <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle color="primary" sx={{ fontSize: 18 }} />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <Box sx={{ p: 2 }}>{card.button}</Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

 

      {/* Our Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: 700,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2px"
            }
          }}
        >
          Our Comprehensive Services
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              title: "Rent & Buy",
              description: "Find the perfect two-wheeler for your needs with our wide selection.",
              icon: <DirectionsBike sx={{ fontSize: 48 }} />,
              color: theme.palette.info.main,
              features: ["Hourly/Daily rentals", "Long-term leasing", "Purchase options"]
            },
            {
              title: "Repair Services",
              description: "Connect with trusted repair shops for all maintenance needs.",
              icon: <Build sx={{ fontSize: 48 }} />,
              color: theme.palette.success.main,
              features: ["On-demand repairs", "Scheduled maintenance", "Emergency services"]
            },
            {
              title: "Best Deals",
              description: "Get exclusive offers on rentals, purchases, and services.",
              icon: <LocalOffer sx={{ fontSize: 48 }} />,
              color: theme.palette.warning.main,
              features: ["Member discounts", "Seasonal offers", "Bundle packages"]
            },
            {
              title: "24/7 Support",
              description: "Dedicated support team always available to assist you.",
              icon: <SupportAgent sx={{ fontSize: 48 }} />,
              color: theme.palette.error.main,
              features: ["Phone support", "Live chat", "In-app messaging"]
            }
          ].map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  borderRadius: 3,
                  borderBottom: `4px solid ${service.color}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: `0 15px 30px rgba(0,0,0,0.1)`
                  }
                }}
              >
                <Box sx={{ 
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  backgroundColor: `${service.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3
                }}>
                  {service.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {service.description}
                </Typography>
                <Box sx={{ mt: "auto", width: "100%" }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" fontWeight={500} gutterBottom>
                    Includes:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                    {service.features.map((feature, i) => (
                      <Chip 
                        key={i}
                        label={feature}
                        size="small"
                        sx={{ 
                          backgroundColor: `${service.color}10`,
                          color: "text.primary"
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
<Box sx={{ backgroundColor: "#f2f8fa", py: 8 }}>
  <Container maxWidth="lg">
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
        mb: 6,
        fontWeight: 700,
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          bottom: -12,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80px",
          height: "4px",
          backgroundColor: theme.palette.primary.main,
          borderRadius: "2px"
        }
      }}
    >
      Simple 4-Step Process
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {[
        {
          step: "1",
          title: "Create Your Account",
          description: "Sign up in minutes with your basic details and get verified instantly."
        },
        {
          step: "2",
          title: "Choose Your Vehicle",
          description: "Browse our extensive catalog and select your preferred two-wheeler."
        },
        {
          step: "3",
          title: "Complete Booking",
          description: "Select your rental period and make secure payment through our platform."
        },
        {
          step: "4",
          title: "Ride Away",
          description: "Pick up your vehicle or get it delivered to your preferred location."
        }
      ].map((step, index) => (
        <Grid item xs={12} sm={6} md={6} lg={5} key={index} sx={{mb: 6}}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: "100%",
              borderRadius: 3,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: theme.shadows[4]
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  mr: 2,
                  fontWeight: "bold"
                }}
              >
                {step.step}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: 700,
            position: "relative",
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "4px",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2px"
            }
          }}
        >
          Frequently Asked Questions
        </Typography>

        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          {[
            {
              question: "What documents do I need to rent a vehicle?",
              answer: "You'll need a valid government-issued ID, proof of address, and a valid driver's license. For certain vehicles, additional documentation may be required."
            },
            {
              question: "How does the pricing work for rentals?",
              answer: "We offer flexible pricing options including hourly, daily, and weekly rates. Pricing varies based on vehicle type and rental duration, with discounts available for longer rentals."
            },
            {
              question: "What happens if there's damage to the vehicle?",
              answer: "All rentals include basic damage protection. For minor damages, our protection plan covers the costs. For major damages, your security deposit may be used after assessment."
            },
            {
              question: "Can I extend my rental period?",
              answer: "Yes, you can extend your rental through the app or by contacting our support team, subject to vehicle availability."
            },
            {
              question: "How do I become a service provider?",
              answer: "You can apply through our website or app by submitting your details and vehicle documents. Our team will verify your information and get you onboarded within 2-3 business days."
            }
          ].map((faq, index) => (
            <Accordion
              key={index}
              elevation={2}
              sx={{
                mb: 2,
                borderRadius: "8px !important",
                overflow: "hidden",
                "&:before": { display: "none" }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  backgroundColor: theme.palette.grey[100],
                  fontWeight: 600
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

  {/* Customer Reviews Section */}
<Box sx={{ 
  backgroundColor: "#f2f8fa", 
  py: 6,
  position: 'relative',
}}>
  <Container maxWidth="lg">
    <Typography
      variant="h5"
      sx={{
        textAlign: "center",
        mb: 6,
        fontWeight: 800,
        position: "relative",
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        left: '50%',
        transform: 'translateX(-50%)',
        "&:after": {
          content: '""',
          position: "absolute",
          bottom: -12,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60px",
          height: "3px",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          borderRadius: "3px"
        }
      }}
    >
      What Our Customers Say
    </Typography>

    <Grid container spacing={3}>
      {[
        {
          name: "Rahul Sharma",
          role: "Daily Commuter",
          avatar: "/avatar1.jpg",
          rating: 5,
          review: "Glide Go has transformed my daily commute! The bikes are always in excellent condition.",
          date: "2 weeks ago",
          color: theme.palette.primary.light
        },
        {
          name: "Priya Patel",
          role: "Weekend Explorer",
          avatar: "/avatar2.jpg",
          rating: 4,
          review: "I love using Glide Go for weekend trips. The selection of bikes is great!",
          date: "1 month ago",
          color: theme.palette.secondary.light
        },
        {
          name: "Vikram Singh",
          role: "Business Owner",
          avatar: "/avatar3.jpg",
          rating: 5,
          review: "Listing my bikes on Glide Go has provided a steady additional income stream.",
          date: "3 months ago",
          color: theme.palette.info.light
        }
      ].map((testimonial, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
              backgroundColor: 'common.white',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 8px 20px rgba(0,0,0,0.1), 0 0 0 2px ${testimonial.color}40`,
                borderColor: testimonial.color
              }
            }}
          >
            <Box sx={{ 
              display: "flex", 
              mb: 1.5,
              justifyContent: 'center'
            }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  sx={{
                    color: i < testimonial.rating ? 
                      theme.palette.warning.main : 
                      theme.palette.grey[300],
                    fontSize: 18
                  }}
                />
              ))}
            </Box>
            <Typography 
              variant="body2" 
              paragraph 
              sx={{ 
                flexGrow: 1, 
                fontStyle: "italic",
                textAlign: 'center',
                mb: 2,
                position: 'relative',
                '&:before, &:after': {
                  content: '"\\201C"',
                  fontSize: 32,
                  color: testimonial.color,
                  opacity: 0.3,
                  position: 'absolute',
                },
                '&:before': {
                  top: -10,
                  left: -5
                },
                '&:after': {
                  content: '"\\201D"',
                  bottom: -20,
                  right: -5
                }
              }}
            >
              {testimonial.review}
            </Typography>
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              mt: 'auto',
              pt: 1.5,
              borderTop: `1px dashed ${theme.palette.divider}`
            }}>
              <Avatar 
                src={testimonial.avatar} 
                alt={testimonial.name}
                sx={{ 
                  width: 40, 
                  height: 40, 
                  mr: 2,
                  border: `2px solid ${testimonial.color}`
                }}
              />
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {testimonial.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {testimonial.role}
                </Typography>
              </Box>
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ ml: 'auto' }}
              >
                {testimonial.date}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>


      {/* Newsletter Section */}
      <Box sx={{ backgroundColor: theme.palette.primary.dark, color: "white", py: 8 }}>
        <Container maxWidth="md">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Stay Updated
              </Typography>
              <Typography variant="body1">
                Subscribe to our newsletter for the latest updates, exclusive offers, and mobility tips.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" }
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Your email address"
                  size="small"
                  fullWidth
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px"
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{
                    borderRadius: "8px",
                    px: 4,
                    fontWeight: "bold",
                    whiteSpace: "nowrap"
                  }}
                >
                  Subscribe
                </Button>
              </Box>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                We respect your privacy. Unsubscribe at any time.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: theme.palette.grey[900], color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                Glide Go
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Revolutionizing urban mobility through innovative two-wheeler solutions that connect riders, service providers, and repair shops.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                {[
                  { icon: <Facebook />, name: "Facebook" },
                  { icon: <Twitter />, name: "Twitter" },
                  { icon: <Instagram />, name: "Instagram" },
                  { icon: <LinkedIn />, name: "LinkedIn" }
                ].map((social) => (
                  <Avatar
                    key={social.name}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main
                      }
                    }}
                  >
                    {social.icon}
                  </Avatar>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
                Company
              </Typography>
              <List dense sx={{ py: 0 }}>
                {["About Us", "Careers", "Blog", "Press"].map((item) => (
                  <ListItem key={item} sx={{ px: 0, py: 0.5 }}>
                    <Button
                      sx={{
                        color: "white",
                        textTransform: "none",
                        justifyContent: "flex-start",
                        px: 0,
                        fontSize: "0.875rem",
                        '&:hover': {
                          color: theme.palette.primary.light
                        }
                      }}
                    >
                      {item}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
                Services
              </Typography>
              <List dense sx={{ py: 0 }}>
                {["Rentals", "Purchases", "Repairs", "Insurance"].map((item) => (
                  <ListItem key={item} sx={{ px: 0, py: 0.5 }}>
                    <Button
                      sx={{
                        color: "white",
                        textTransform: "none",
                        justifyContent: "flex-start",
                        px: 0,
                        fontSize: "0.875rem",
                        '&:hover': {
                          color: theme.palette.primary.light
                        }
                      }}
                    >
                      {item}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
                Contact Us
              </Typography>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: "white" }}>
                    <LocationOn fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="123, Main Street, Ahmedabad, Gujarat, India"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: "white" }}>
                    <Phone fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="+91-9876543210"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32, color: "white" }}>
                    <Email fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="contact@glidego.com"
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, backgroundColor: "rgba(255,255,255,0.1)" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                © {new Date().getFullYear()} Glide Go. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
                <Typography variant="body2">
                  Terms of Service
                </Typography>
                <Typography variant="body2">
                  Privacy Policy
                </Typography>
                <Typography variant="body2">
                  Cookie Policy
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}