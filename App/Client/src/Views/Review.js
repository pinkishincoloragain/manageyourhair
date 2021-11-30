import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "axios";
import Typography from "@mui/material/Typography";
import authHeader from "../services/auth-header";

function Review(props) {
    const { user: currentUser } = useSelector((state) => state.auth);
    console.log(currentUser);
    const [value, setValue] = useState(0);
    const [bookData, setBookData] = useState(0);
    const shop_id = props.match.params.shop_id;
    const shop_name = props.match.params.name;
    const date = new Date();
    const today = date.getFullYear() + "-" + parseInt(date.getMonth()+1) + "-" + date.getDate();
    
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:8001/api/checkBooking/'+ shop_id, 
                {headers: authHeader()})
                const fetched = await res.data.map((rowData) => ({
                    booking_id: rowData.booking_id
                    })
                )

                if (fetched.length==0){
                    alert("Make a reservation at '" + shop_name + "' first!");
                    props.history.push('/')
                }
                setBookData(fetched[0].booking_id);
                
                const response = await axios.get('http://localhost:8001/api/checkComment/' + fetched[0].booking_id)
                const fetched2 = await response.data.map((rowData) => ({
                    count: rowData.count
                })
                )
                console.log(fetched2)
                if (fetched2[0].count!=0){
                    alert("You already wrote a review!");
                    props.history.push('/')
                }
                
            } catch (e) {
                console.error("error!", e.message)
            }
        }
        fetchData();
    }, [setBookData])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        axios.post('http://localhost:8001/api/review/', {
            id: currentUser['id'],
            booking_id: data.get('booking_id'),
            shop_id: data.get('shop_id'),
            booking_date: data.get('booking_date'),
            rating: data.get('rating'),
            comment: data.get('comment')
        }).then(() => {
            props.history.push("/review_list/"+shop_id+"/"+shop_name);
            window.location.reload();
        });
    }
    
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
                        Review
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 1,
                            width: "40%",
                        }}
                    >
                        <TextField
                            id="filled-read-only-input"
                            name="id"
                            label="ID"
                            defaultValue={currentUser['id']}
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
                            name="booking_id"
                            label="Booking ID"
                            value={bookData}
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
                            name="shop_id"
                            label="Shop ID"
                            defaultValue={shop_id}
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
                            label="Place"
                            defaultValue={shop_name}
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
                            name="booking_date"
                            label="Visited Date"
                            defaultValue={today}
                            InputProps={{
                                readOnly: true,
                            }}
                            sx={{
                                width: "100%",
                            }}
                            variant="filled"
                        />
                        <br />
                        <Rating
                            name="rating"
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            sx={{
                                width: "100%",
                                height: "3vh"
                            }}
                            value={value}
                        />
                        <br />
                        <TextField
                            id="outlined-multiline-static"
                            name="comment"
                            label="Comment"
                            multiline
                            rows={4}
                            sx={{
                                width: "100%",
                            }}
                            placeholder="Share your experience"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit!
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default Review;