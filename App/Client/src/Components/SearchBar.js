import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { UserContext, SearchContext } from "utils/UserContext";
import { Link } from "react-router-dom";


function SearchBar(props) {
    const [textInput, setTextInput] = useState("");
    const { user, setUser } = useContext(UserContext);
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const inputRef = useRef();

    const handleChange = (e) => {
        e.preventDefault();
        setTextInput(e.target.value);
        if (props.callback != undefined)
            props.callback(e.target.value);
        setSearchValue(e.target.value);
        // console.log("searchInput", textInput);
    };

    useEffect(() => {
        // console.log(searchValue);
    }, [searchValue]);

    const handleSubmit = (e) => {
        // setTimeout(() => {
        //   setSearchValue(textInput);
        // }, 10);
        console.log("textInput", textInput);
        if (textInput.length > 0)
            setSearchValue(textInput);
        else {
            setSearchValue(searchValue);
            if (searchValue === null) {
                setSearchValue(" ");
            }
        }
        console.log("searchValue", searchValue);
        // setSearchValue(inputRef.current.value);

    };

    useEffect(() => {
        document
            .getElementById("searchInputId")
            .addEventListener("keydown", function (event) {
                if (event.code === "Enter" || event.code === "NumpadEnter") {
                    event.preventDefault();
                    document.getElementById("submitBtnId").click();
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
        </div>
    );
}
export default SearchBar;