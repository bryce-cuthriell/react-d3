import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Network from "./Network";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Network />} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
