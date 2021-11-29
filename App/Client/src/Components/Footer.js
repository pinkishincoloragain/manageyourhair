import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <div
      id="bottom"
      style={{
        display: "flex",
        margin: "auto",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/pinkishincoloragain/manageyourhair">
        Manageyourhair
      </Link>{" "}
      <div
        style={{
          marginLeft: "1vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            marginLeft: "0.1rem",
            marginRight: "0.1rem",
          }}
        >
          <Link color="inherit" href="https://github.com/Angela-OH">
            Angela OH
          </Link>
        </div>
        &nbsp;
        <div
          style={{
            marginRight: "0.2rem",
          }}
        >
          {" "}
          <Link color="inherit" href="https://github.com/pinkishincoloragain">
            Myungbin Son
          </Link>
        </div>
      </div>
      {new Date().getFullYear()}
      {"."}
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
      <Container component="main" sx={{ mt: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Our services
        </Typography>
        <div>
          <Typography variant="h5" component="h2" gutterBottom>
            {"We help people make reservation for haircut."}<br/>
            {"Let me tell you how you can use our service."}<br/><br/>
            {"1.Search hairshop."}<br/><br/>
            {"2. Choose hairshop and make reservation."}<br/><br/>
            {"3. Check your reservation on Mypage."}<br/><br/>
            {"4. Get your haircut on the date!"}<br/><br/>
            {"5. Watch other people's review."}<br/>
          </Typography>
        </div>
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
          <div>Manageyourhair.</div>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
