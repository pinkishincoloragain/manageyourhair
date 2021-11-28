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
    const [ value, setValue ] = useState(0);
    const dispatch = useDispatch();
    const shop_id = props.match.params.shop_id;
    const shop_name = props.match.params.name;
    const [reviewData, setReviewData] = useState([{
        login_id: '',
        comment_id: '',
        score: 0,
        comment: ''
      }])

    useEffect(() => {
        async function fetchData() {
            try {
            const res = await axios.get('http://localhost:8001/api/getReview/', { params: { shop_id: shop_id} });
            const fetched = await res.data.map((rowData) => ({
                login_id: rowData.LOGIN_ID,
                comment_id: rowData.COMMENT_ID,
                score: rowData.SCORE,
                comment: rowData.COMMENT_TEXT
            })
            )
            setReviewData(reviewData.concat(fetched))
            } catch (e) {
            console.error("error!", e.message)
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

    return (
    <div>
        <div className="Review">
            <div className="stickyHeader" >
            <div className="Bar">
            <Link to={"/"} className="Logo">
                <div className="Logo">Manageyourhair</div>
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
          {reviewData.map((inputData) => {
              return (
                <Box
                sx={{ mt: 1}}
                >
                <TextField
                    id="filled-read-only-input"
                    label="ID"
                    defaultValue={inputData.login_id}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                />
                <br />
                <TextField
                    id="filled-read-only-input"
                    label="Comment ID"
                    defaultValue={inputData.comment_id}
                    InputProps={{
                        readOnly: true,
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
                    variant="filled"
                />
                {currentUser['login_id'] == inputData.login_id && (
                    <div>
                        <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Modify
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Delete
                    </Button>
                    </div>
                )}
                <hr />
                </Box>
              );
          })}
        </Box>
        </div>
    </div>
    );
}

export default ReviewList;