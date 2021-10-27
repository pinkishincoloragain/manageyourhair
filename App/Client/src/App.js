import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Views/Home";
import List from "./Views/List";
import { NotFound } from "http-errors";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/list" component={List} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
