import React, { useEffect } from "react";
import { useFetch } from "../utils/Hooks";
import { useContext } from "react";
import { SearchContext } from "utils/UserContext";
import MediaCard from "Components/MediaCard";
import "styles/List.scss";
import { SearchBar } from "./Home";

function List() {
  const [data] = useFetch("http://localhost:8001/api/getList");
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className="List">
      <SearchBar />
      <MediaCard />
      <div>{searchValue}</div>
      <h1>List from server{"\n"}</h1>
      {data.map((item) => {
        return <div key={item}>{item}</div>;
      })}
    </div>
  );
}

export default List;
