import React from "react";
import DashboardItem from "./DashboardItem";

import BarGraphIcon from "../resources/bar_graph.svg";
import NetworkIcon from "../resources/network_graph.svg";
import MapIcon from "../resources/world_map.svg";

import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-row">
        <DashboardItem
          title="Knowledge Graphs"
          icon={NetworkIcon}
          route="/knowledge-graphs"
        />
        <DashboardItem
          title="Bar Graphs"
          icon={BarGraphIcon}
          route="/bar-graphs"
        />
      </div>
      <div className="dashboard-row">
        <DashboardItem title="Maps" icon={MapIcon} />
      </div>
    </div>
  );
};

export default Dashboard;
