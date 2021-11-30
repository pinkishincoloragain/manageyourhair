import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { SearchContext } from "utils/UserContext";
import Card from "Components/Card";
import "styles/List.scss";
import SearchBar from "Components/SearchBar";
import axios from "axios";
import { Link } from "react-router-dom";
import Sad from "assets/sad.png"
import { convertDistance, getPreciseDistance } from 'geolib'

function List(props) {
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

  // const [apiLoc, setApiLoc] = useState('http://localhost:8001/api/getListByScore');
  const [searchMode, setSearchMode] = useState("score");
  console.log(searchMode);
  // score, id , name

  async function fetchData() {
    try {
      const res = await axios.get('http://localhost:8001/api/getListByScore')
      const fetched = await res.data.map((rowData) => ({
        shop_id: rowData.SHOP_ID,
        name: rowData.NAME,
        address: rowData.ADDRESS,
        loc_x: rowData.LOC_X,
        loc_y: rowData.LOC_Y,
        distance: convertDistance(getPreciseDistance(
          { latitude: userLoc[0], longitude: userLoc[1] },
          { latitude: parseFloat(rowData.LOC_X), longitude: parseFloat(rowData.LOC_Y) }
          , 1), "km"),
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

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLoc([position.coords.latitude, position.coords.longitude]);
    });

    console.log(userLoc);

    // let distance = getDistance(
    //   { latitude: userLoc[0], longitude: userLoc[1] },
    //   { latitude: shopData.loc_x, longitude: shopData.loc_y }
    // )

    // console.log(distance);

    fetchData();
    if (searchValue != null)
      setSearchInput(searchValue);
    else
      setSearchInput("");
  }, [])

  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState(searchValue);

  // console.log("searchVal in List", searchValue);
  let cnt = 0;

  const showCard = (inputData) => {
    if (inputData.shop_id !== 0 && (inputData.open_hour).length > 3
      && (inputData.name.toLowerCase().includes(searchInput.toLowerCase())
        || inputData.address.toLowerCase().includes(searchInput.toLowerCase()))) {
      cnt++;
      // console.log(cnt);
      return (
        <Card className="Card"
          image={inputData.photo_link}
          key={inputData.shop_id.toString() + inputData.distance}
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
          distance={inputData.distance}
        />
      );
    }
  }

  const showModeResult = () => {
    if (searchMode === "name") {
      return (shopData.map(showCard).sort((a, b) => { return a.props.name[0].charCodeAt(0) - b.props.name[0].charCodeAt(0); }));
    }
    else if (searchMode === "id") {
      return (shopData.map(showCard).sort((a, b) => { return a.props.shop_id - b.props.shop_id; }));
    }
    else if (searchMode === "distance") {
      return (shopData.map(showCard).sort((a, b) => { return a.props.distance - b.props.distance; }));
    }
    else {
      return (shopData.map(showCard));
    }
  }


  return (
    <div className="List">
      <div className="stickyHeader" >
        <div className="Bar">
          <Link to={"../"} className="Logo">
            <div className="Logo">Manageyourhair</div>
          </Link>
          <SearchBar setSearchMode={setSearchMode} listpage={true} placeholder={searchValue} className="SearchBar" callback={setSearchInput}
            style={{ placeHolder: "black" }} />
          <div className="Blank"></div>
        </div>
        <div className="CurrentSearch">Current search value: {searchValue}</div>
      </div>
      <div className="ListWrap">
        <div className="CurrentSearch">Search using keyword "{searchValue}"</div>
        <div className="CardList">
          {showModeResult()}
          {cnt === 0 && <div className="NoResult">
            <img src={Sad} alt="sad emoji" style={{ width: "10vh", height: "10vh" }} />
            No result found</div>}
          <div className="Card"></div>
        </div>
      </div>
    </div>
  );
}

export default List;
