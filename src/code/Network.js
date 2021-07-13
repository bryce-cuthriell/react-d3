import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import "../css/Network.css";

const Network = () => {
  const simulationContainer = useRef(null);

  const [graphData, setGraphData] = useState({
    nodes: odysseyCharacters,
    links: physicalInteractionRelationships,
  });
  const [radioValue, setRadioValue] = useState("physical-interaction");
  const [width, setWidth] = useState(window.innerWidth * 0.7);
  const height = window.innerHeight * 0.8;

  useEffect(() => {
    if (graphData) {
      createUpdateSimulation(graphData.nodes, graphData.links, width, height);
    }
  }, [graphData]);

  useEffect(() => {
    if (radioValue === "physical-interaction") {
      setGraphData({
        nodes: odysseyCharacters,
        links: physicalInteractionRelationships,
      });
    }
    if (radioValue === "family") {
      setGraphData({ nodes: odysseyCharacters, links: familyRelationships });
    }
  }, [radioValue]);

  useEffect(() => {
    if (width && height && graphData) {
      createUpdateSimulation(graphData.nodes, graphData.links, width, height);
    }
  }, [width]);

  let resizedFn;
  window.addEventListener("resize", () => {
    clearTimeout(resizedFn);
    resizedFn = setTimeout(() => {
      setWidth(window.innerWidth * 0.7);
    }, 200);
  });

  const r = 20;
  var currClickedNode = null;

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

    svg.selectAll("circle").remove();
    svg.selectAll("line").remove();
    svg.selectAll("text").remove();

    function zoomActions(event) {
      g.attr("transform", event.transform);
    }

    var zoomHandler = d3.zoom().on("zoom", zoomActions);

    const svgInstance = document.getElementById("force-simulation");

    svgInstance.setAttribute("width", width);
    svgInstance.setAttribute("height", height);

    svg.attr("viewBox", [-width / 2, -height / 2, width, height]);

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
      .attr("fill", (d) => {
        return d3.interpolateBlues(d.size / d3.max(dataNodes, (d) => d.size));
      })
      .attr("stroke", "#b3b9c4")
      .attr("stroke-width", 3)
      .style("cursor", "pointer")
      .on("click", clicked);

    function clicked(event, d) {
      if (event.defaultPrevented) return;

      if (currClickedNode !== d.id) {
        d3.selectAll("circle").transition().duration(500).attr("r", r);

        d3.select(this)
          .transition()
          .duration(500)
          .attr("r", r * 1.4);

        currClickedNode = d.id;
      }
      if (event?.path[0]?.r?.animVal?.value === r * 1.4) {
        d3.select(this).transition().duration(500).attr("r", r);
        currClickedNode = null;
      }

      var connectedEdges = getConnectedNodes(d.id, dataLinks);
    }

    function getConnectedNodes(nodeId, edgeList) {
      let connectedEdges = [];
      edgeList.forEach((element) => {
        if (nodeId === element.source?.id || nodeId === element.target?.id) {
          connectedEdges.push(element);
        }
      });
      console.log("list: ", connectedEdges);

      return connectedEdges;
    }

    node
      .append("text")
      .attr("x", 30)
      .attr("dy", ".3em")
      .text((d) => d.id);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }
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

  const handleFormChange = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <div className="network-page-contents">
      <FormControl component="fieldset">
        <FormLabel component="legend">View relationships ordered by:</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={radioValue}
          onChange={handleFormChange}
        >
          <FormControlLabel
            value="physical-interaction"
            control={<Radio color="primary" />}
            label="Physical interaction of characters"
          />
          <FormControlLabel
            value="family"
            control={<Radio color="primary" />}
            label="Family relationships of characters"
          />
        </RadioGroup>
      </FormControl>

      <svg
        ref={simulationContainer}
        id="force-simulation"
        width={width}
        height={height}
        style={{
          boxShadow: "10px 9px 21px #2e385333",
          backgroundColor: "#f7fcff",
        }}
      />
    </div>
  );
};

export default Network;

const odysseyCharacters = [
  { id: "Odysseus", size: Math.floor(Math.random() * 1000000) },
  { id: "Penélopê", size: Math.floor(Math.random() * 1000000) },
  { id: "Telémakhos", size: Math.floor(Math.random() * 1000000) },
  { id: "Laërtês", size: Math.floor(Math.random() * 1000000) },
  { id: "Eurykleia", size: Math.floor(Math.random() * 1000000) },
  { id: "Eumaios", size: Math.floor(Math.random() * 1000000) },
  { id: "Nestor", size: Math.floor(Math.random() * 1000000) },
  { id: "Meneláos", size: Math.floor(Math.random() * 1000000) },
  { id: "Helen", size: Math.floor(Math.random() * 1000000) },
  { id: "Achilleus", size: Math.floor(Math.random() * 1000000) },
  { id: "Agamémnon", size: Math.floor(Math.random() * 1000000) },
  { id: "Zeus", size: Math.floor(Math.random() * 1000000) },
  { id: "Athena", size: Math.floor(Math.random() * 1000000) },
  { id: "Poseidon", size: Math.floor(Math.random() * 1000000) },
  { id: "Hermês", size: Math.floor(Math.random() * 1000000) },
  { id: "Kalypso", size: Math.floor(Math.random() * 1000000) },
  { id: "Kirkê", size: Math.floor(Math.random() * 1000000) },
  { id: "Teirêsias", size: Math.floor(Math.random() * 1000000) },
  { id: "Polyphemus", size: Math.floor(Math.random() * 1000000) },
  { id: "Alkínoös", size: Math.floor(Math.random() * 1000000) },
  { id: "Arêtê", size: Math.floor(Math.random() * 1000000) },
  { id: "Nausikaa", size: Math.floor(Math.random() * 1000000) },
  { id: "Skylla", size: Math.floor(Math.random() * 1000000) },
  { id: "Antínoös", size: Math.floor(Math.random() * 1000000) },
  { id: "Eurymakhos", size: Math.floor(Math.random() * 1000000) },
  { id: "Melánthios", size: Math.floor(Math.random() * 1000000) },
];

const physicalInteractionRelationships = [
  { source: "Odysseus", target: "Penélopê" },
  { source: "Odysseus", target: "Telémakhos" },
  { source: "Penélopê", target: "Telémakhos" },
  { source: "Odysseus", target: "Laërtês" },
  { source: "Telémakhos", target: "Laërtês" },
  { source: "Telémakhos", target: "Nestor" },
  { source: "Telémakhos", target: "Meneláos" },
  { source: "Telémakhos", target: "Helen" },
  { source: "Eurykleia", target: "Odysseus" },
  { source: "Eurykleia", target: "Penélopê" },
  { source: "Eurykleia", target: "Telémakhos" },
  { source: "Meneláos", target: "Helen" },
  { source: "Athena", target: "Odysseus" },
  { source: "Athena", target: "Telémakhos" },
  { source: "Athena", target: "Zeus" },
  { source: "Zeus", target: "Poseidon" },
  { source: "Zeus", target: "Hermês" },
  { source: "Kalypso", target: "Hermês" },
  { source: "Odysseus", target: "Polyphemus" },
  { source: "Odysseus", target: "Kalypso" },
  { source: "Odysseus", target: "Kirkê" },
  { source: "Odysseus", target: "Teirêsias" },
  { source: "Odysseus", target: "Agamémnon" },
  { source: "Odysseus", target: "Achilleus" },
  { source: "Odysseus", target: "Skylla" },
  { source: "Odysseus", target: "Alkínoös" },
  { source: "Odysseus", target: "Arêtê" },
  { source: "Odysseus", target: "Nausikaa" },
  { source: "Alkínoös", target: "Arêtê" },
  { source: "Alkínoös", target: "Nausikaa" },
  { source: "Arêtê", target: "Nausikaa" },
  { source: "Eumaios", target: "Odysseus" },
  { source: "Eumaios", target: "Telémakhos" },
  { source: "Eumaios", target: "Penélopê" },
  { source: "Eumaios", target: "Antínoös" },
  { source: "Eumaios", target: "Eurymakhos" },
  { source: "Eumaios", target: "Melánthios" },
  { source: "Melánthios", target: "Odysseus" },
  { source: "Melánthios", target: "Telémakhos" },
  { source: "Melánthios", target: "Antínoös" },
  { source: "Melánthios", target: "Eurymakhos" },
  { source: "Eurymakhos", target: "Odysseus" },
  { source: "Eurymakhos", target: "Telémakhos" },
  { source: "Eurymakhos", target: "Penélopê" },
  { source: "Eurymakhos", target: "Antínoös" },
  { source: "Eurymakhos", target: "Eurykleia" },
  { source: "Antínoös", target: "Eurykleia" },
  { source: "Antínoös", target: "Telémakhos" },
  { source: "Antínoös", target: "Odysseus" },
  { source: "Antínoös", target: "Penélopê" },
];

const familyRelationships = [
  { source: "Odysseus", target: "Penélopê" },
  { source: "Odysseus", target: "Telémakhos" },
  { source: "Penélopê", target: "Telémakhos" },
  { source: "Laërtês", target: "Odysseus" },
  { source: "Alkínoös", target: "Arêtê" },
  { source: "Nausikaa", target: "Arêtê" },
  { source: "Nausikaa", target: "Alkínoös" },
  { source: "Zeus", target: "Athena" },
  { source: "Zeus", target: "Poseidon" },
  { source: "Hermês", target: "Zeus" },
  { source: "Poseidon", target: "Polyphemus" },
  { source: "Agamémnon", target: "Meneláos" },
  { source: "Meneláos", target: "Helen" },
];
