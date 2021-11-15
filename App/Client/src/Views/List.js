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
import { Link } from "react-router-dom";
import Sad from "assets/sad.png"

function List() {
  // const [data] = useFetch("http://localhost:8001/api/getList");
  const [shopData, setShopData] = useState([{
    shop_id: '',
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
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:8001/api/getList')
        const fetched = await res.data.map((rowData) => ({
          shop_id: rowData.SHOP_ID,
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
        setShopData(shopData.concat(fetched))
      } catch (e) {
        console.error("error!", e.message)
      }
    }
    fetchData();
    if (searchValue != null)
      setSearchInput(searchValue);
    else
      setSearchInput("");
  }, [setShopData])

  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState(searchValue);
  // const [list, setList] = useState([]);
  // const [isHover, setHover] = useState(false);

  const placeHolderRef = useRef(searchValue);
  // console.log("searchVal in List", searchValue);
  let cnt = 0;

  return (
    <div className="List">
      <div className="stickyHeader" >
        <div className="Bar">
          <Link to={"./"} className="Logo">
            <div className="Logo">Manageyourhair</div>
          </Link>
          <SearchBar placeholder={searchValue} className="SearchBar" callback={setSearchInput}/>
          <div className="Blank"></div>
        </div>
        <div className="CurrentSearch">Current search value: {searchValue}</div>
      </div>
      <div className="ListWrap">
        <div className="CurrentSearch">Search using keyword "{searchValue}"</div>
        <div className="CardList">
          {shopData.map((inputData) => {
            if (inputData.shop_id != 0 && (inputData.open_hour).length > 3
              && (inputData.name.toLowerCase().includes(searchInput.toLowerCase())
                || inputData.address.toLowerCase().includes(searchInput.toLowerCase()))) {
              cnt++;
              // console.log(cnt);
              return (
                <Card className="Card"
                  image={inputData.photo_link}
                  key={inputData.shop_id.toString() + Math.random()}
                  name={inputData.name}
                  shop_id={inputData.shop_id}
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
            }
            else {
              if (searchValue === null) {
                setSearchValue(" ");
              }
              // console.log(searchValue, inputData.name);
            }

          })}
          {cnt === 0 && <div className="NoResult">
            <img src={Sad} style={{ width: "10vh", height: "10vh" }} />
            No result found</div>}
          <div className="Card"></div>
        </div>
      </div>
    </div>
  );
}

export default List;
