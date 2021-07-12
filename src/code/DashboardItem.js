import React from "react";
import { useHistory } from "react-router-dom";

import "../css/Dashboard.css";

const DashboardItem = (props) => {
  const history = useHistory();

  return (
    <div className="dashboard-item" onClick={() => history.push(props.route)}>
      <div className="dashboard-item-title">{props.title}</div>
      <img
        src={props.icon}
        alt="icon"
        style={{ marginTop: "30px", marginBottom: "20px" }}
        width={100}
        height="auto"
      />
    </div>
  );
};

export default DashboardItem;
