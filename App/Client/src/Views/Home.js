import React from "react";
import { Link } from "react-router-dom";
import { Button, ThemeProvider } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import StickyFooter from "./Footer";
import { theme } from "Components/theme";
import "styles/Home.scss";
import Red from "../assets/Red.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";

function Home() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(isLoggedIn);
  
  const handleClick = (e) => {
    console.log("Clicked");
  };
  
  const logOut = () => {
    dispatch(logout());
  }

  return (
    <div>
      <div className="header">
        <ThemeProvider theme={theme}>
          <CardHeader title="Manageyourhair" fontFamily="Geostar" className="Logo" />
        </ThemeProvider>{" "}
        <div id="Btns">
          <Link to={"./list"}>
            <Button variant="contained" onClick={handleClick}>
              List
            </Button>
          </Link>
          <Link to={"./mypage"}>
            <Button variant="contained">My Page</Button>
          </Link>
          <Link to={"./login"}>
            <Button variant="contained">Login Page</Button>
          </Link>
          <Button variant="contained" onClick={logOut}>Logout</Button>
          <Link to={"./reservation"}>
            <Button variant="contained">Make reservation</Button>
          </Link>
        </div>
      </div>
      <img src={Red} alt="Red" className="Red" />
    </div>
  );
}

export default Home;
