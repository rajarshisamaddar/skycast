import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Box, Typography } from "@mui/material";

function Login() {
  const { loginWithRedirect } = useAuth0();

  setTimeout(() => {
    loginWithRedirect();
  }, 7000);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
      bgcolor="#234d70"
    >
      <CircularProgress sx={{ color: "white" }} />
      <Box>
        <Typography
          variant="h5"
          component="h5"
          color="white"
          align="center"
          sx={{ marginX: { xs: "2%" } }}
          marginY={"1rem"}
        >
          Hold on! You are being redirected to the sign in page...
        </Typography>

        <Typography
          variant="p"
          component="p"
          color="white"
          align="center"
          sx={{ marginX: { md: "20%", xs: "8%" } }}
        >
          SkyCast in development! 🔧{" "}
          <span style={{ backgroundColor: "#00c853" }}>
            You may see a RED ALERT with DEV KEYS.
          </span>{" "}
          No worries—your security is ensured. 🔒 Enjoy accurate weather data!
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
