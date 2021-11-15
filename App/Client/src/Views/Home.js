import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import StickyFooter from "../Components/Footer";
import { UserContext, SearchContext } from "utils/UserContext";
import SearchBar from "Components/SearchBar";

function Home() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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

  const logOut = () => {
    dispatch(logout());
  };

  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  let height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  return (
    <div>
      <div className="Home">
        <div className="header">
          <Link to={"./"}>
            <div className="Logo">Manageyourhair</div>
          </Link>
          {!currentUser ? (
            <div className="links">
              <Link to={"./signup"}>
                <div className="linkBtn">Sign Up</div>
              </Link>
              <Link to={"./login"}>
                <div className="linkBtn">Sign In</div>
              </Link>
            </div>
          ) : (
            <div className="links">
              <Link to={"./mypage"}>
                <div className="linkBtn">My Page</div>
              </Link>
              <div className="linkBtn" onClick={logOut}>
                Logout
              </div>
            </div>
          )}
        </div>
        <div
          className="main"
          style={{
            backgroundPositionY: position / 4,
            opacity: `${1 - (position / width) * 1.5}`,
          }}
        >
          <div className="context">
            <div className="CatchPhrase">
              <h1>Do you need a haircut?</h1>
            </div>
            <div className="SearchWrapper">
              <SearchBar placeholder="City Centre / Drumcondra" />
            </div>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="ourservice">
          <p
            style={{
              fontSize: "4rem",
              opacity: `${((position - height / 2) * 3) / (height / 2)}`,
              marginLeft: "10vw",
              fontWeight: "bold",
            }}
          >
            Our service is ..
          </p>
        </div>
        <div className="description-text">
          <div>
            <div
              className="Curly"
              style={{
                transform: `translateX(
                  ${Math.max((-position / 2) * 1.8 + height, 150)}px
                  )`,
              }}
            ></div>
            <div
              className="desc"
              style={{
                transform: `translateX(${-position + width * 1.1}px)`,
                opacity: `${((position - 800) * 3) / 500}`,
                marginTop: `-200px`,
                marginBottom: `200px`,
              }}
            >
              We help you find closest hairshop. <br />
              Not only that, we also help you to make a reservation.
            </div>
          </div>
          <div>
            <div
              className="Pink"
              style={{
                transform: `translateX(${Math.min(
                  (position / 2.4 - 300) * 2,
                  540
                )}px)`,
                opacity: `${(position - 300) / 1000}`,
              }}
            ></div>
            <div
              className="desc2"
              style={{
                transform: `translateX(${-position + 1800}px)`,
                opacity: `${(position - 800) / 1000}`,
              }}
            >
              Your hair looks dirty.
              <br />
              Get some haircut right now.
              <br />
              Click your location and find the nearest hairshop.
            </div>
          </div>
        </div>
      </div>
      <div>
        <StickyFooter />
      </div>
    </div>
  );
}

export default Home;