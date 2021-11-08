import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import StickyFooter from "./Footer";
import { theme } from "Components/theme";
import "styles/Home.scss";
import PrimarySearchAppBar from "Views/MUI/SearchBar.js";

function Home() {
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
        <div
          className="main"
          style={{
            backgroundPositionY: position / 4,
            opacity: `${1-((position) / 1000)*1.2}`,
          }}
        >
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
          <div>
            <div
              className="Curly"
              style={{
                transform: `translateX(${(-position / 2)*1.8 + 1000}px)`,
              }}
            ></div>
            <p
              className="desc"
              style={{
                transform: `translateX(${-position + 1800}px)`,
                opacity: `${(position - 1000) / 1000}`,
              }}
            >
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
          <div>
            <div
              className="Pink"
              style={{
                transform: `translateX(${(position / 2.4 - 300) * 2}px)`,
                opacity: `${(position - 300) / 1000}`,
              }}
            ></div>
            <p
              className="desc"
              style={{
                transform: `translateX(${-position + 1800}px)`,
                opacity: `${(position - 1000) / 1000}`,
              }}
            >
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Home;
