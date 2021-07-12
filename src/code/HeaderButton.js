import React from "react";
import { Link } from "react-router-dom";

const HeaderButton = (props) => {
  return (
    <Link to={props.route}>
      <button className="header-button">{props.name}</button>
    </Link>
  );
};

export default HeaderButton;
