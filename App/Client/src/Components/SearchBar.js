import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { UserContext, SearchContext } from "utils/UserContext";
import { Link } from "react-router-dom";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';


function SearchBar(props) {
    const [textInput, setTextInput] = useState("");
    const { user, setUser } = useContext(UserContext);
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const inputRef = useRef();
    const [listpage, setListpage] = useState(false);

    const handleChange = (e) => {
        e.preventDefault();
        handleSubmit();
        setTextInput(e.target.value);
        if (props.callback != undefined)
            props.callback(e.target.value);
        setSearchValue(e.target.value);
        // console.log("searchInput", textInput);
    };

    const [mode, setMode] = useState("score");
    const handleModeChange = (e) => {
        setMode(e.target.value);
        props.callback(mode);
        console.log(mode);
    };

    useEffect(() => {
        // console.log(searchValue);

    }, [searchValue]);

    const handleSubmit = (e) => {
        // setTimeout(() => {
        //   setSearchValue(textInput);
        // }, 10);
        // console.log("textInput", textInput);
        if (textInput.length > 0)
            setSearchValue(textInput);
        else {
            setSearchValue(searchValue);
            if (searchValue === null) {
                setSearchValue(" ");
            }
        }
        // console.log("searchValue", searchValue);
        // setSearchValue(inputRef.current.value);

    };

    useEffect(() => {
        document
            .getElementById("searchInputId")
            .addEventListener("keydown", function (event) {
                if (event.code === "Enter" || event.code === "NumpadEnter") {
                    event.preventDefault();
                    document.getElementById("submitBtnId").click();
                }
            });
    }, []);

    return (
        <div className="searchBar">
            <input
                id="searchInputId"
                autoFocus={true}
                type="textarea"
                value={textInput}
                onChange={handleChange}
                className="searchInput"
                placeholder={props.placeholder}
                style={{ color: props.color }}
            />
            <Link to={"./list"}>
                <button id="submitBtnId" className="submitBtn" onClick={handleSubmit}>
                    Search
                </button>
            </Link>
            {props.listpage ? <div style={{ marginLeft: "4vw", display: "flex", marginTop: "1vh", flexDirection: "column" }}>
                <div>Sort by:</div>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="mode" name="row-radio-buttons-group">
                        <FormControlLabel value="score" checked={mode === 'score'} control={<Radio onChange={handleModeChange} />} label="score" />
                        <FormControlLabel value="name" checked={mode === 'name'} control={<Radio onChange={handleModeChange} />} label="name" />
                        <FormControlLabel value="id" checked={mode === 'id'} control={<Radio onChange={handleModeChange} />} label="id" />
                    </RadioGroup>
                </FormControl>
            </div>
                : null}
        </div>
    );
}
export default SearchBar;