import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Manageyourwebsite
        </Link>{" "}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Link color="inherit" href="https://github.com/Angela-OH">
              Angela OH
            </Link>
          </div>
          &nbsp;
          <div>
            <Link color="inherit" href="https://github.com/pinkishincoloragain">
              Myungbin Son
            </Link>
          </div>
        </div>
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Sticky footer
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Pin a footer to the bottom of the viewport."}
          {"The footer will move as the main element of the page grows."}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container>
          <div>Manage your hair.</div>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
