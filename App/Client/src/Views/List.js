import React, { useEffect } from "react";
import { useFetch, useFetchWithParams } from "utils/Hooks"
import { useContext } from "react";
import { SearchContext } from "utils/UserContext";
import MediaCard from "Components/MediaCard";
import "styles/List.scss";
import { SearchBar } from "./Home";

function List() {
  const [data] = useFetch("http://localhost:8001/api/getList");
  // const [data] = useFetchWithParams("http://localhost:8001/api/getList", {
  //   searchValue,
  // });
  const { searchValue, setSearchValue } = useContext(SearchContext);

  // useEffect(() => {
  //   if (searchValue) {
  //     setSearchValue("");
  //   }
  // }, [searchValue]);

  return (
    <div className="List">
      <div className="ListWrap">
        <SearchBar placeholder={searchValue} />
        <div>{searchValue}</div>
        <div className="CardList">
          {data.map((item) => {
            return (
              <MediaCard key={item} name="item">
                {item}
              </MediaCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default List;
