import React from "react";
import Header from "./Header";
import Routes from "./Routes";

import "../css/App.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes />
    </div>
  );
};

export default App;
