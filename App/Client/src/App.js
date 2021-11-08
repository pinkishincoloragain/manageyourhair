import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "Views/Home";
import List from "Views/List";
import Mypage from "Views/Mypage";
import NotFound from "Views/NotFound";
import "App.css";
import Login from "Views/Login";
import SignUp from "Views/SignUp";
import Reservation from "Views/Reservation/Reservation";
import Parallax from "Views/Parallex";
import StickyFooter from "Views/Footer";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/reservation" component={Reservation} />
        <Route exact path="/Parallax" component={Parallax} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
