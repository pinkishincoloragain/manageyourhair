import React, { useEffect, useRef } from "react";
import { useFetch, useFetchWithParams } from "utils/Hooks";
import { useContext, useState } from "react";
import { SearchContext } from "utils/UserContext";
import Card from "Components/Card";
import "styles/List.scss";
import SearchBar from "Components/SearchBar";
import Curly from "assets/Curly.jpg"
import { json } from "body-parser";
import axios from "axios";

function List() {
  // const [data] = useFetch("http://localhost:8001/api/getList");
  const [inputData, setInputData] = useState([{
    idx: '',
    name: '',
    image: '',
    loc_x: '',
    loc_y: '',
    address: '',
    score: 0,
    contact: '',
    open_hour: '',
    photo_link: ''
  }])

  const [userLoc, setUserLoc] = useState([53.3429, -6.26099]);

  useEffect(() => {
    async function getUserLoc() {
      try {
        const res = await axios.get('http://localhost:8001/api/getList')
        const _inputData = await res.data.map((rowData) => ({
          idx: rowData.SHOP_ID,
          name: rowData.NAME,
          address: rowData.ADDRESS,
          distance: Math.pow(Math.pow((userLoc[0] - rowData.LOC_X), 2) + Math.pow((userLoc[1] - rowData.LOC_Y), 2), 1 / 2),
          score: rowData.SCORE,
          contact: rowData.CONTACT,
          open_hour: rowData.OPEN_HOUR,
          photo_link: rowData.PHOTO_LINK,
          website: rowData.WEBSITE
        })
        )
        setInputData(inputData.concat(_inputData))
      } catch (e) {
        console.error("error!", e.message)
      }
    }
    getUserLoc();
  }, [setInputData])

  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [list, setList] = useState([]);
  const [isHover, setHover] = useState(false);

  const placeHolderRef = useRef(searchValue);
  console.log("searchVal in List", searchValue);

  return (
    <div className="List">
      <div className="stickyHeader" >
        <SearchBar placeholder={searchValue} />
        <div className="CurrentSearch">Current search value: {searchValue}</div>

      </div>
      <div className="ListWrap">
        <div className="CurrentSearch">Search using keyword "{searchValue}"</div>
        <div className="CardList">
          {inputData.map((inputData) => {
            if (inputData.idx != 0 && (inputData.open_hour).length > 3 && (inputData.name).toLowerCase().includes(searchValue.toLowerCase()))
              return (
                <Card className="Card"
                  image={Curly}
                  key={inputData.idx.toString() + Math.random()}
                  name={inputData.name}
                  open_hour={inputData.open_hour}
                  contact={inputData.contact}
                  score={inputData.score}
                  website={inputData.website}
                  address={inputData.address}
                  dist={inputData.distance}
                  loc_x={inputData.loc_x}
                  loc_y={inputData.loc_y}
                >
                </Card>
              );
            else {
              if (searchValue === null) {
                setSearchValue(" ");
              }
              console.log(searchValue, inputData.name);
            }
          })}
          <div className="Card"></div>
        </div>
      </div>
    </div>
  );
}

export default List;
