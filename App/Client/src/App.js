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
import { useDispatch, useSelector } from "react-redux";
import { SearchContext, UserContext } from "utils/UserContext";

function App() {
  const [user, setUser] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  
  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/list" component={List} />
            <Route exact path="/reservation" component={Reservation} />
            <Route exact path="/mypage" component={Mypage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </SearchContext.Provider>
          <Route path="*" component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}
export default App;
