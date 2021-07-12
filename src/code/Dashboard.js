/**
 * Icons used in this component are courtesy of freeicons.io
 */

import React from "react";
import DashboardItem from "./DashboardItem";

import BarGraphIcon from "../resources/bar_graph.svg";
import NetworkIcon from "../resources/network_graph.svg";

import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="top-row">
        <DashboardItem
          title="Knowledge Graphs"
          icon={NetworkIcon}
          route="/knowledge-graphs"
        />
        <DashboardItem title="Bar Graphs" icon={BarGraphIcon} />
      </div>
    </div>
  );
};

export default Dashboard;
