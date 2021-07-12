import React from "react";
import { useHistory } from "react-router-dom";
import HeaderButton from "./HeaderButton";

import "../css/Header.css";

const Header = () => {
  const history = useHistory();

  return (
    <div className="header">
      <div className="header-title" onClick={() => history.push("/")}>D3 Graphs in React</div>
      <div>
        <HeaderButton name="Data Sources" route="/data-sources" />
        <HeaderButton name="About" route="/about" />
      </div>
    </div>
  );
};

export default Header;
