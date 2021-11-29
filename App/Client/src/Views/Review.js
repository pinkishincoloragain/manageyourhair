import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "styles/Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import StickyFooter from "../Components/Footer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import axios from "axios";
import Typography from "@mui/material/Typography";

function Review(props) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const [position, setPosition] = useState(0);
    const shop_id = props.match.params.shop_id;
    const shop_name = props.match.params.name;
    const date = new Date();
    const today = date.getFullYear() + "-" + parseInt(date.getMonth()+1) + "-" + date.getDate();
    const booking_id = 1;

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        axios.post('http://localhost:8001/api/review/', {
            customer_id: currentUser['customer_id'],
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

    function onScroll() {
        setPosition(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const logOut = () => {
        dispatch(logout());
    };

    let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    let height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

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
                        Comment
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
                            defaultValue={currentUser['login_id']}
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
                            defaultValue={booking_id}
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