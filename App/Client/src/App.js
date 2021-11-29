import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "Views/Home";
import List from "Views/List";
import Mypage from "Views/Mypage";
import NotFound from "Views/NotFound";
import "App.css";
import Login from "Views/Login";
import SignUp from "Views/SignUp";
import Reservation from "Views/Reservation/Reservation";
import Review from "Views/Review";
import ReviewList from "Views/ReviewList";
import ReviewModify from "Views/ReviewModify";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext, UserContext } from "utils/UserContext";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


function App() {
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
              <Route exact path="/" component={Home} />
              <Route exact path="/list" component={List} />
              <Route exact path="/reservation/:shop_id/:name" component={Reservation} />
              <Route exact path="/review/:shop_id/:name" component={Review} />
              <Route exact path="/review_list/:shop_id/:name" component={ReviewList} />
              <Route exact path="/review_modify/:comment_id" component={ReviewModify} />
              <Route exact path="/mypage" component={Mypage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </SearchContext.Provider>
            <Route path="*" component={NotFound} />
          </Switch>
        </UserContext.Provider>
      </LocalizationProvider>
    </div>
  );
}
export default App;
