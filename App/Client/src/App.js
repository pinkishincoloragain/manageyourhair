import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "Views/Home";
import List from "Views/List";
import { NotFound } from "http-errors";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
        {/* <Route path="*" component={NotFound} /> */}
      </Switch>
    </div>
  );
}

export default App;
