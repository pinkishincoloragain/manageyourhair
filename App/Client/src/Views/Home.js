import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import StickyFooter from "./Footer";

function Home() {
  return (
    <div>
      <div>Home</div>
      <CardHeader title="Home" />
      {/** Link to List.js */}
      <Link to={"./list"}>
        <Button variant="contained">List</Button>
      </Link>
      <Link to={"./mypage"}>
        <Button variant="contained">My Page</Button>
      </Link>
      <Link to={"./login"}>
        <Button variant="contained">Login Page</Button>
      </Link>
      <Link to={"./reservation"}>
        <Button variant="contained">Make reservation</Button>
      </Link>
      <StickyFooter />
    </div>
  );
}

export default Home;
