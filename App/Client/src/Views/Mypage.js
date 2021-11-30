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
import UserPhoto from "assets/userTemp.png";
import { borderRadius } from "@mui/material/node_modules/@mui/system";
import { Input } from "@mui/material";

// const express = require('express');
// const app = express();
// app.use(express.static('public'));


function Mypage() {

    var fs = require('fs');

    const [userData, setUserData] = useState([{
        customer_id: '',
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        photo: '',
        contact: '',
    }])
    const [bookData, setBookData] = useState([]);
    const [photoData, setPhotoData] = useState(UserPhoto);

    const [photoValid, setPhotoValid] = useState(false);
    const [photo, setPhoto] = useState('');
    const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    const fileTypeValid = (file, fileTypes) => {
        return fileTypes.some((fileType) => fileType === file.type);
    }

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (!fileTypeValid(file, validFileTypes)) {
            alert('Please upload a valid file');
            e.target.files = null;
            setPhotoValid(false);
        }
        else {
            setPhotoValid(true);
            setPhoto(e.target.files[0]);
        }
        console.log(photoValid);
    }
    const onFileUpload = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('photo', photo);
        formdata.append('id', userData[0].customer_id);

        console.log(photo);
        axios.post('http://localhost:8001/api/user_upload', formdata)
        setPhotoData(photo);
    }

    function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');

        return response;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:8001/api/myphoto',
                    { headers: authHeader() })
                console.log(res.data);

                // const fetched = await res.data.map((rowData) => ({
                //     photo: rowData.PHOTO_LINK
                // })
                // )

                setPhotoData(res.data);
                console.log(res.data);
            } catch (e) {
                console.error("error!", e.message)
            }
            try {
                const res = await axios.get('http://localhost:8001/api/mypage',
                    { headers: authHeader() })
                console.log(res.data);

                const fetched = await res.data.map((rowData) => ({
                    customer_id: rowData.CUSTOMER_ID,
                    id: rowData.LOGIN_ID,
                    first_name: rowData.CUSTOMER_FIRST_NAME,
                    last_name: rowData.CUSTOMER_LAST_NAME,
                    contact: rowData.CONTACT_NO,
                    photo: rowData.PHOTO_LINK
                })
                )
                //const fetched = await res.data()
                setUserData(fetched);
            } catch (e) {
                console.error("error!", e.message)
            }
            try {
                const res = await axios.get('http://localhost:8001/api/myBooking',
                    { headers: authHeader() })

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
                setBookData(fetched);
            } catch (e) {
                console.error("error!", e.message)
            }
        }
        fetchData();
    }, [setUserData, setBookData, setPhotoData])
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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        marginTop: "10vh",
                    }}
                >

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",

                        }}>
                            <div style={{ alignItems: "left", textAlign: "left" }}>
                                {/* <Typography component="h2" variant="h3" sx={{ margin: "1vh", mb: "1vh" }}>
                                    User Information
                                </Typography> */}
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", width: "70%" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                    {console.log("assets/" + photoData)}
                                    {userData[0].photo === null ?
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src={photoData} alt="userPhoto" style={{ width: "40%", border: "solid black 1px", borderRadius: "100%" }} />
                                        </div>
                                        :
                                        <div>
                                            <img src={userData[0].photo} style={{ width: "10vh", height: "10vh" }} />
                                        </div>
                                    }
                                    <div style={{ width: "70%" }}>
                                        <Input type="file" onChange={onFileChange} sx={{ width: "90%" }} />
                                        <Button
                                            onClick={onFileUpload} disabled={!photoValid}
                                            sx={{ mt: "1vh" }}
                                            style={{ width: "90%" }}>
                                            upload photo
                                        </Button>
                                    </div>
                                </div>

                                <div style={{ marginLeft: "2vh", width: "100%", display: "flex", flexDirection: "column" }}>

                                    <TextField
                                        id="filled-read-only-input"
                                        name="id"
                                        label="ID"
                                        value={userData[0].id}
                                        InputProps={{
                                            readOnly: false,
                                        }}
                                        sx={{
                                            width: "90%",
                                        }}
                                        variant="filled"
                                    />
                                    <TextField
                                        id="filled-read-only-input"
                                        name="first_name"
                                        label="First Name"
                                        value={userData[0].first_name}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{
                                            width: "90%",
                                        }}
                                        variant="filled"
                                    />
                                    <TextField
                                        id="filled-read-only-input"
                                        name="last_name"
                                        label="Last Name"
                                        value={userData[0].last_name}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{
                                            width: "90%",
                                        }}
                                        variant="filled"
                                    />

                                    <TextField
                                        id="filled-read-only-input"
                                        name="contact"
                                        label="Contact"
                                        value={userData[0].contact}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{
                                            width: "90%",
                                        }}
                                        variant="filled"
                                    />



                                    <br />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            // boxShadow: "0px 0px 5px black",
                            width: "100%",
                            padding: "auto"
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                padding: "auto"
                            }}>
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
                                                width: "70%",
                                                padding: "1vh",
                                                borderRadius: "10px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                display: "flex",
                                            }}
                                            key={idx}
                                        >
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                borderRadius: "1vh",
                                                boxShadow: "0px 0px 5px black",
                                                padding: "1vh"
                                            }}>
                                                <div style={{ display: "flex" }}>
                                                    <Typography component="h1" variant="h5" sx={{ margin: "1vh", mb: "1vh" }}>
                                                        Reservation #{inputData.booking_id}
                                                    </Typography>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <img src={inputData.shop_photo} alt="shopPhoto" style={{ borderRadius: "1vh" }} />
                                                    <div style={{ marginLeft: "2vh", marginRight: "2vh" }}>
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
                                                            label="Shop id"
                                                            defaultValue={inputData.shop_id}
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
                                                            defaultValue={inputData.booking_date.slice(0, 10)}
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
                                                            multiline
                                                            rows={2}
                                                            variant="filled"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>

                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Mypage;
