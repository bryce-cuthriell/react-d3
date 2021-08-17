import React from "react";

import "../css/About.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-header">About</div>
      <div className="about-body">
        The purpose of this application is to demonstrate the power of several
        types of data visualizaion and the conclusions that can be drawn from
        them. Additionally, it attempts to show how D3.js and React.js, despite
        their reputation of not mixing well, can be seemlessly integrated to
        produce dynamic and responsive single-page applications with powerful,
        native data visualizations.
        <br />
        <br />
        <a href="https://d3js.org/" target="_blank" rel="noopener noreferrer">
          Data Driven Documents
        </a>{" "}
        (D3) is a visualization tool for manipulating the DOM based on data. Its
        applications and abilities are extensive, ranging from simple dots or
        lines on a canvas to complex interactive maps. It is the low-level
        customizability of D3 that gives it its reputation of being a
        challenging tool to work with, but simultaneously very powerful and
        rewarding. At its most basic level, D3 works with very simple building
        blocks like lines or dots, but it also provides the toolkit to create
        highly complex data visualizations using these building blocks; for
        instance, lines and dots together can made into a far more compelling
        visualization known as a <i>knowledge graph</i> using D3's force
        simulation functions.
        <br />
        <br />
        To learn more about D3 in general, the documentation is a very good
        place to start, however, it is difficult in my experience to do much
        with D3 without hands-on experience manipulating code. An excellent
        resource is Observable, a collaboration medium for data visualization,
        founded by the developer of D3 himself, Mike Bostock, and in particular
        Bostock's own{" "}
        <a
          href="https://observablehq.com/@mbostock"
          target="_blank"
          rel="noopener noreferrer"
        >
          work
        </a>
        . Documentation for React.js can be found{" "}
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </div>
    </div>
  );
};

export default About;
