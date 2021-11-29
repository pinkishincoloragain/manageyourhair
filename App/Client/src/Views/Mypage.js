import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import axios from "axios";
import authHeader from "../services/auth-header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function Mypage() {
  const [userData, setUserData] = useState([{
    id: '',
    first_name: '',
    last_name: '',
    email: ''
  }])
  const [bookData, setBookData] = useState([])

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
      try {
        const res = await axios.get('http://localhost:8001/api/myBooking', 
        {headers: authHeader()})
 
        const fetched = await res.data.map((rowData) => ({
          booking_id: rowData.BOOKING_ID,
          shop_id: rowData.SHOP_ID,
          shop_name: rowData.NAME,
          shop_photo: rowData.PHOTO_LINK,
          booking_date: rowData.BOOKING_DATE,
          desc: rowData.DESCRIPTION,
        })
        )
        //const fetched = await res.data()
        setBookData(fetched)
      } catch (e) {
        console.error("error!", e.message)
      }
    }
    fetchData();
  }, [setUserData, setBookData])
  return (
<div>
    <div className="Review">
        <div className="stickyHeader" >
            <div className="Bar">
                <Link to={"/"} className="Logo">
                    <div className="Logo"
                        style={{
                            fontFamily: "Geostar, cursive",
                            fontSize: "3.5vw",
                            textAlign: "center",
                            color: "black",
                            textDecoration: "none"
                        }}>Manageyourhair</div>
                </Link>
            </div>
        </div>
            <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
            >
            <Typography component="h1" variant="h5">
                My Detail
            </Typography>   
                <TextField
                    id="filled-read-only-input"
                    name="id"
                    label="ID"
                    value={userData[0].id}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{
                        width: "40%",
                    }}
                    variant="filled"
                />
                <br />
                <TextField
                    id="filled-read-only-input"
                    name="first_name"
                    label="First Name"
                    value={userData[0].first_name}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{
                        width: "40%",
                    }}
                    variant="filled"
                />
                <br />
                <TextField
                    id="filled-read-only-input"
                    name="last_name"
                    label="Last Name"
                    value={userData[0].last_name}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{
                        width: "40%",
                    }}
                    variant="filled"
                />
                <br />
                <TextField
                    id="filled-read-only-input"
                    name="contact"
                    label="contact"
                    value={userData[0].contact}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{
                        width: "40%",
                    }}
                    variant="filled"
                />
                <br />
                <Typography component="h1" variant="h5">
                My Reservation
                </Typography>  
                {bookData.map((inputData, idx) => {
                  return (
                    <Box
                        sx={{
                            mt: 1,
                            mr: 1,
                            ml: 1,
                            mb: 1,
                            minWidth: "30vh",
                            flexWrap: "wrap",
                            width: "20%",
                            border: "2px solid black",
                            padding: "1vh",
                            borderRadius: "10px",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                        }}
                    >
                        <div style={{ display: "flex" }}>Reservationt# {inputData.booking_id}</div>
                        <br />
                        <br />
                        <TextField
                            id="filled-read-only-input"
                            label="Shop Name"
                            defaultValue={inputData.shop_name}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                width: "100%",
                            }}
                            variant="filled"
                        />
                        <br />
                        <TextField
                            id="filled-read-only-input"
                            label="Photo"
                            defaultValue={inputData.shop_photo}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                width: "100%",
                            }}
                            variant="filled"
                        />
                         <TextField
                            id="filled-read-only-input"
                            label="Reservation Date"
                            defaultValue={inputData.booking_date}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                width: "100%",
                            }}
                            variant="filled"
                        />
                         <TextField
                            id="filled-read-only-input"
                            label="Description"
                            defaultValue={inputData.desc}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                width: "100%",
                            }}
                            variant="filled"
                        />
                        </Box>
                      );})}
                </Box>
            </div>
        </div>
  );
}

export default Mypage;
