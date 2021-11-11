import React, { useEffect } from "react";
import { useFetch } from "../utils/Hooks";
import { useLocation } from "react-router-dom";

function List(){
  const location = useLocation();
  const [data] = useFetch("http://localhost:8001/api/getList");

  useEffect((data) => {
    console.log(location);
  }, [location]);

  return (
    <div>
      <div>fish</div>
      <h1>List from server{"\n"}</h1>
      {data.map((item) => {
        return <div key={item}>{item}</div>;
      })}
    </div>
  );
};

export default List;
