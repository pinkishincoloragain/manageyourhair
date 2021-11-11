import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import StickyFooter from "./Footer";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(isLoggedIn);


  const [position, setPosition] = useState(0);
  const [searchInput, setSearchInput] = useState("");

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
  const logOut = () => {
    dispatch(logout());
  };

  // let history = useHistory();
  // let location = useLocation();
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log("searchInput", searchInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("searchInput", searchInput);
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
          <Link to="/" className="Logo">
            <div>Manageyourhair</div>
          </Link>
          <div className="links">
            <Link to={"./signup"} style={{ textDecoration: "none" }}>
              <div className="linkBtn">Sign Up</div>
            </Link>
            <Link to={"./login"}>
              <div className="linkBtn">Sign In</div>
            </Link>
            <div className="linkBtn" onClick={logOut}>
              Logout
            </div>
          </div>
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
              <div className="searchBar">
                <input
                  autoFocus={true}
                  type="textarea"
                  value={searchInput}
                  onChange={handleChange}
                  className="searchInput"
                  placeholder="Search for a stylist / place"
                />
                <button className="submitBtn" onClick={handleSubmit}>
                  Search
                </button>
              </div>
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
              Duis aute irure dolor in cillum dolore eu fugiat <br />
              cupidatat non proident, anim id est laborum.
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
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              <br />
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat{" "}
              <br />
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
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
