import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Views/Home";
import List from "./Views/List";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/list" component={List} />
      </Switch>
    </Router>
  );
}

export default App;
