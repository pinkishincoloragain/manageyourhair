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

function ReviewList(props) {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const shop_id = props.match.params.shop_id;
    const shop_name = props.match.params.name;
    const [reviewData, setReviewData] = useState([{
        login_id: 'admin',
        comment_id: '0',
        score: 5,
        comment: 'This is a really good hairshop. I strongly recommend it to you.',
        comment_date: '2021-11-27'
    }]) 
    
    function clickBtn (comment_id) {
        console.log('h')
        axios.delete('http://localhost:8001/api/review/'+comment_id, {
            comment_id: 1
        }).then(() => {
            props.history.push("/review_list/"+shop_id+"/"+shop_name);
            window.location.reload();
        });
    } 
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('http://localhost:8001/api/getReview/', { params: { shop_id: shop_id } });
                const fetched = await res.data.map((rowData) => ({
                    login_id: rowData.LOGIN_ID,
                    comment_id: rowData.COMMENT_ID,
                    score: rowData.SCORE,
                    comment: rowData.COMMENT_TEXT,
                    comment_date: rowData.COMMENT_DATE
                })
                )
                setReviewData(reviewData.concat(fetched));
            } catch (e) {
                console.error("error!", e.message);
            }
        }
        fetchData();
    }, [setReviewData])

    let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    let height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    // reviewData
    return (
        <div>
            <div className="Review">
                <div className="stickyHeader" >
                    <div className="Bar">
                        <Link to={"../../"} className="Logo" style={{
                            textDecoration: "none",
                        }}>
                            <div className="Logo"
                                style={{
                                    fontFamily: "Geostar, cursive",
                                    fontSize: "3.5vw",
                                    textAlign: "center",
                                    color: "black",
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
                        {shop_name}
                    </Typography>
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        {reviewData.map((inputData, idx) => {
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
                                    key={inputData.comment_id}
                                >
                                    <div style={{ display: "flex" }}>Comment# {inputData.comment_id}</div>
                                    <TextField
                                        id="filled-read-only-input"
                                        label="ID"
                                        defaultValue={inputData.login_id}
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
                                        label="Commented date"
                                        defaultValue={reviewData[idx].comment_date ?
                                            reviewData[idx].comment_date.slice(0, 10) : "No date"}
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
                                        label="Score"
                                        defaultValue={inputData.score}
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
                                        value={inputData.score}
                                        readOnly
                                    />
                                    <br />
                                    <TextField
                                        id="filled-read-only-input"
                                        label="Comment"
                                        defaultValue={inputData.comment}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{
                                            width: "100%",
                                            height: "10vh",
                                        }}
                                        variant="filled"
                                        multiline
                                        rows={2}

                                    />
                                    {currentUser['login_id'] == inputData.login_id && (
                                        <div>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                            <Link to={`/review_modify/${inputData.comment_id}`} className="Link" style={{ textDecoration: "none", color: "black" }}>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                sx={{ ml: 7 }}
                                            >  
                                                Modify
                                            </Button>
                                            </Link>
                                        </div>
                                        <br />
                                        <div>
                                            <Button onClick={() => {
                                                clickBtn(inputData.comment_id);
                                                }}
                                                fullWidth
                                                variant="contained"
                                                sx={{
                                                    ml: 6
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                        </div>
                                    )
                                    }
                                    <hr />
                                </Box>
                            );
                        })}
                    </div>
                </Box>
            </div >
        </div >
    );
}

export default ReviewList;