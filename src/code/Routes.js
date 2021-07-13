import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Network from "./KnowledgeGraphs/Network";
import DataSources from "./DataSources";
import About from "./About";

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Dashboard />} />
        <Route exact path="/knowledge-graphs" render={() => <Network />} />
        <Route exact path="/data-sources" render={() => <DataSources />} />
        <Route exact path="/about" render={() => <About />} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
