import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2' // Import Grid2 correctly

const images = [
  "/tea.jpg",
  "/tea-cup.jpg",
  "/jam.jpg",
  "/tea-procedures.jpg",
];

const AboutContent = () => {
  return (
    <Box padding={4}>
      <Grid container spacing={4}>
        {/* Left Column with Images */}
        <Grid size={{ xs: 0, md: 2 }}>
          {images.map((img, index) => (
            <Grid key={index}>
              <Box
                component="img"
                src={img}
                alt={`Image ${index + 1}`}
                width="100%"
                height="auto"
                borderRadius={2}
                boxShadow={3}
              />
            </Grid>
          ))}
        </Grid>

        {/* Right Column with Text */}
        <Grid size={10} >
          <Typography variant="h4" gutterBottom sx={{textAlign:"center"}}>
            Welcome to Flying Teapot Shop
          </Typography>
          <Typography variant="body1" >
            This is the page of our small tea shop, <strong>Flying Tea</strong>. The site is currently under development, but you’re welcome to explore our selection:
          </Typography>
          <Typography variant="body1" >
            - <strong>Tea</strong><br />
            - <strong>Tea Accessories</strong><br />
            - <strong>Jam</strong><br />
            - <strong>Tea Ceremonies</strong>
          </Typography>
          <Typography variant="h6" gutterBottom sx={{textAlign:"center"}}>
            How It Works
          </Typography>
          <Typography variant="body1">
            1. <strong>Registration</strong>: Create an account with your email and password to get started.<br />
            2. <strong>Login</strong>: Access your account and begin browsing our shop.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Exclusive Features for Registered Users</strong><br />
            Once registered, you can add items to your cart, create a personalized list of favorites, and easily update your account information whenever you like.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            For any suggestions or collaboration inquiries, feel free to reach out:<br />
            - <strong>Email</strong>: eva.last.ita@gmail.com<br />
            - <strong>Phone</strong>: 054-628-7650
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutContent;
