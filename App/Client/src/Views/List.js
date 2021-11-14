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

  const [userLoc, setUserLoc] = useState([53.3429,-6.26099]);

  useEffect(async () => {
    try {
      // 데이터를 받아오는 동안 await 로 대기
      const res = await axios.get('http://localhost:8001/api/getList')
      // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
      // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
      const _inputData = await res.data.map((rowData) => ({
        idx: rowData.SHOP_ID,
        name: rowData.NAME,
        address: rowData.ADDRESS,
        distance : Math.pow(Math.pow((userLoc[0] - rowData.LOC_X),2)+ Math.pow((userLoc[1] - rowData.LOC_Y),2),1/2),
        // loc_x: rowData.LOC_X,
        // loc_y: rowData.LOC_Y,
        score: rowData.SCORE,
        contact: rowData.CONTACT,
        open_hour: rowData.OPEN_HOUR,
        photo_link: rowData.PHOTO_LINK
      })
      )
      // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
      await setInputData(inputData.concat(_inputData))
    } catch (e) {
      console.error("error!", e.message)
    }
  }, [])

  console.log('App :: inputData :: ', inputData)


  // console.log("data in lists", data);
  // let res = JSON.stringify(data);
  // var result = res.split(',')[0].slice(1);
  // console.log("result", result);


  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   if (searchValue) {
  //     setSearchValue("");
  //   }
  // }, [searchValue]);

  const placeHolderRef = useRef(searchValue);

  return (
    <div className="List">
      <div className="ListWrap">
        <SearchBar placeholder={searchValue} />
        <div>{searchValue}</div>
        <div className="CardList">
          {inputData.map((inputData) => {
            if(inputData.idx != 0 && (inputData.open_hour).length > 3)
              return (
                <Card className="Card"
                  image={Curly}
                  key={inputData.idx}
                  name={inputData.name}
                  open_hour={inputData.open_hour}
                  contact={inputData.contact}
                  score={inputData.score}
                  address={inputData.address}
                  dist={inputData.distance}
                  loc_x={inputData.loc_x}
                  loc_y={inputData.loc_y}

                // image={}
                >
                </Card>
              );
            })}
          <div className="Card"></div>
        </div>
      </div>
    </div>
  );
}

export default List;
