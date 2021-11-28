import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import axios from "axios";
import authHeader from "../services/auth-header";

function Mypage() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([{
    id: '',
    first_name: '',
    last_name: '',
    email: ''
  }])
  
  const logOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:8001/api/mypage', 
        {headers: authHeader()})
        console.log(res.data);
 
        const fetched = await res.data.map((rowData) => ({
          id: rowData.LOGIN_ID,
          first_name: rowData.CUSTOMER_FIRST_NAME,
          last_name: rowData.CUSTOMER_LAST_NAME,
          contact: rowData.CONTACT_NO
        })
        )
        //const fetched = await res.data()
        setUserData(fetched)
      } catch (e) {
        console.error("error!", e.message)
      }
    }
    fetchData();
  }, [setUserData])

  return (
    <div>
    <div className="home">
      <div className="header">
        <Link to={"./"}>
            <div className="Logo">Manageyourhair</div>
          </Link>
          <div className="links">
            <Link to={"./mypage"}>
              <div className="linkBtn">My Page</div>
            </Link>
            <div className="linkBtn" onClick={logOut}>
              Logout
            </div>
          </div>
      </div>
    </div>
    <div>
        <p>email: {userData[0].id}</p>
        <p>first name: {userData[0].first_name}</p>
        <p>last name: {userData[0].last_name}</p>
        <p>contact: {userData[0].contact}</p>
      </div>
    </div>
  );
}

export default Mypage;
