import React from "react";
import HeaderButton from "./HeaderButton";

import "../css/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">D3 Graphs in React</div>
      <div>
        <HeaderButton name="Data Sources" />
        <HeaderButton name="About" />
      </div>
    </div>
  );
};

export default Header;
