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

function ReviewModify(props) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const comment_id = props.match.params.comment_id;
    const [reviewData, setReviewData] = useState([{
        booking_id: 0,
        shop_id: 0,
        place: '',
        score: 0,
        comment: ''
    }])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:8001/api/review/' + comment_id);
                console.log(res.data)
                const fetched = await res.data.map((rowData) => ({
                    booking_id: rowData.booking_id,
                    shop_id: rowData.shop_id,
                    place: rowData.name,
                    score: rowData.score,
                    comment: rowData.comment_text,
                })
                )
                setValue(fetched[0].score);
                console.log(fetched[0])
                setReviewData(fetched[0]);
            } catch (e) {
                console.error("error!", e.message);
            }
        }
        fetchData();
    }, [setReviewData])
    console.log(value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        axios.put('http://localhost:8001/api/review/'+props.match.params.comment_id, {
            rating: data.get('rating'),
            comment: data.get('comment')
        }).then(() => {
            props.history.push("/review_list/"+reviewData.shop_id+"/"+reviewData.place);
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
                            value={reviewData.booking_id}
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
                            value={reviewData.shop_id}
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
                            value={reviewData.place}
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
                            defaultValue="2021-11-28"
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
                            defaultValue={reviewData.comment}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Modify!
                        </Button>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default ReviewModify;