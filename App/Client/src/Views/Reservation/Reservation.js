import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DatePick from "./Datepick";
import Review from "./Review";
import AddressForm from "./Address";
import { useState, useEffect } from "react";
import { Link as RLink } from "react-router-dom";
import axios from "axios";
import authHeader from "services/auth-header";
import { useSelector } from "react-redux";



const steps = ["User info", "Reservation date", "Review your reservation"];

function GetStepContent(props) {
  console.log(props);

  const [userData, setUserData] = useState();

  // firstName, lastName, gender, description
  const [cutInfo, setCutInfo] = useState(["", "", "", ""]);
  const [selfCut, setSelfCut] = useState(true);

  const [reservationTime, setReservationTime] = useState(null);

  console.log(cutInfo);
  console.log(selfCut);

  useEffect(() => {
    props.setReservationTime(reservationTime);
  }, [props, reservationTime]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:8001/api/mypage',
          { headers: authHeader() })
        console.log(res.data);

        const fetched = await res.data.map((rowData) => ({
          id: rowData.LOGIN_ID,
          first_name: rowData.CUSTOMER_FIRST_NAME,
          last_name: rowData.CUSTOMER_LAST_NAME,
          contact: rowData.CONTACT_NO
        })
        )
        setUserData(fetched[0]);

      } catch (e) {
        console.error("error!", e.message)
      }
    }
    fetchData();
  }, [setUserData])

  switch (props.step) {
    case 0:
      return <AddressForm callback={props.callback} setCutInfo={setCutInfo} cutInfo={cutInfo} setSelfCut={setSelfCut} />;
    case 1:
      return <DatePick setTimeChecked={props.setTimeChecked} reservationTime={reservationTime} setReservationTime={setReservationTime} />;
    case 2:
      return <Review
        selfCut={selfCut}
        cutInfo={cutInfo}
        shop_id={props.shop_id}
        shop_name={props.shop_name}
        reservationTime={reservationTime}
        userData={userData}
      />;
    default:
      throw new Error("Unknown step");
  }
}


const theme = createTheme();

export default function Checkout(props) {

  const shop_id = props.match.params.shop_id;
  const shop_name = props.match.params.name;

  const [reservationTime, setReservationTime] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [timeChecked, setTimeChecked] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);


  console.log(currentUser);
  useEffect(() => {
    if (!currentUser) {
      alert("Please Login first");
      window.location.href = "/login";
    }
  }, [currentUser]);

  const handleNext = () => {
    console.log(timeChecked);

    if (activeStep === 0 || timeChecked)
      setActiveStep(activeStep + 1);

    else
      alert("Please check your reservation time.");
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  console.log(currentUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8001/api/reservation', {
      shop_id: shop_id,
      booking_date: reservationTime.toISOString().slice(0, 16).replace('T', ' '),
      // desciption: data.get("description"),
    }, { headers: authHeader() })
    handleNext();
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RLink to={"../../"} className="Logo" style={{
        textDecoration: "none",
      }}>
        <div className="Logo"
          style={{
            fontFamily: "Geostar, cursive",
            fontSize: "3.5vw",
            textAlign: "center",
            color: "black",
          }}>Manageyourhair</div>
      </RLink>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            {shop_name}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for making reservation with us.
                </Typography>
                <Typography variant="subtitle1">
                  Check your booking ID.
                </Typography>
                <p></p>
                <RLink to="/" >
                  Go back to home
                </RLink>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <GetStepContent step={activeStep} shop_id={shop_id} shop_name={shop_name} setTimeChecked={setTimeChecked} setReservationTime={setReservationTime} />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}


                  {activeStep === steps.length - 1 ?
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                    >Place reservation                  </Button>

                    : <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >Next</Button>}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright ?? "}
      <Link color="inherit" href="https://github.com/pinkishincoloragain/manageyourhair">
        manageyourhair
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}