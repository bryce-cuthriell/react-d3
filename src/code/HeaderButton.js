import React from "react";

const HeaderButton = (props) => {
  return (
    <button onClick={props.clickAction} className="header-button">
      {props.name}
    </button>
  );
};

export default HeaderButton;
