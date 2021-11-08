import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import StickyFooter from "./Footer";
import { theme } from "Components/theme";
import "styles/Home.scss";
import Curly from "../assets/Curly.jpg";
import PrimarySearchAppBar from "Views/MUI/SearchBar.js";

function Home() {
  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }

      prevScrollY.current = currentScrollY;
      console.log(goingUp, currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const handleClick = (e) => {
    console.log("Clicked");
  };

  return (
    <div>
      <div className="Home">
        <div className="header">
          <ThemeProvider theme={theme}>
            <CardHeader title="Manageyourhair" className="Logo" />
          </ThemeProvider>
        </div>
        <div className="main">
          <div className="context">
            <div className="CatchPhrase">
              <h1>Do you want to get a haircut?</h1>
            </div>
            <div className="searchB">
              <PrimarySearchAppBar Color="black" />
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="description-text">
          <h1>Place your reservation today!</h1>
          <img
            src={Curly}
            className="Curly"
            style={{ width: "80vw", position: "inherit" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
