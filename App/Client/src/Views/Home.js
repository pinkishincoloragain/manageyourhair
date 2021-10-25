import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Project Home</h1>
      {/** Link to List.js */}
      <Link to={"./list"}>
        <button>My List</button>
      </Link>
    </div>
  );
}

export default Home;
