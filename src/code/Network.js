import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Network = () => {
  const simulationContainer = useRef(null);

  const [graphData, setGraphData] = useState({
    nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
    links: [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 1 },
    ],
  });

  const [width, setWidth] = useState(window.innerWidth * 0.7);
  const [height, setHeight] = useState(window.innerHeight * 0.8);

  useEffect(() => {
    if (graphData) {
      createUpdateSimulation(graphData.nodes, graphData.links, width, height);
    }
  }, [graphData]);

  useEffect(() => {
    if (width && height && graphData) {
      createUpdateSimulation(graphData.nodes, graphData.links, width, height);
    }
  }, [width, height]);

  let resizedFn;
  window.addEventListener("resize", () => {
    clearTimeout(resizedFn);
    resizedFn = setTimeout(() => {
      setWidth(window.innerWidth * 0.7);
      setHeight(window.innerHeight * 0.8);
    }, 200);
  });

  const r = 15;

  /**
   *
   * @param {list} nodes
   * @param {list} links
   * @param {number} width
   * @param {number} height
   */
  const createUpdateSimulation = (dataNodes, dataLinks, width, height) => {
    var svg = d3.select(simulationContainer.current);
    var g = svg.append("g");

    function zoomActions(event) {
      g.attr("transform", event.transform);
    }

    var zoomHandler = d3.zoom().on("zoom", zoomActions);

    const svgInstance = document.getElementById("force-simulation");

    svgInstance.setAttribute("width", width);
    svgInstance.setAttribute("height", height);

    svg.attr("viewBox", [-width / 2, -height / 2, width, height]);

    // I know this isn't proper D3, but it works
    svg.selectAll("circle").remove();
    svg.selectAll("line").remove();

    const simulation = d3
      .forceSimulation()
      .force("charge", d3.forceManyBody().strength(-1700).distanceMax(700))
      .force(
        "link",
        d3.forceLink().id((d) => d.id)
      )
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .on("tick", ticked);

    simulation.nodes(dataNodes);
    simulation.force("link").links(dataLinks);

    zoomHandler(svg);

    // Create Graph Edges
    var link = g
      .selectAll("line")
      .data(dataLinks)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 1);

    // Create Graph Nodes
    var node = g
      .selectAll("circle")
      .data(dataNodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(drag(simulation));

    // Additional propreties/event interations for graph nodes
    node
      .append("circle")
      .attr("r", r)
      .attr("fill", "#8e9384")
      .attr("stroke", "FFFF00")
      .attr("stroke-width", 3)
      .style("cursor", "pointer");

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    console.log("svg: ", svg);
  };

  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }

  return (
    <svg
      ref={simulationContainer}
      id="force-simulation"
      width={width}
      height={height}
      style={{
        boxShadow: "10px 9px 21px #2e385333",
        backgroundColor: "white",
        marginTop: "40px",
      }}
    />
  );
};

export default Network;
