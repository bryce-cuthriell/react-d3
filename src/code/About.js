import React from "react";

import "../css/About.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-header">About</div>
      <div className="about-body">
        The purpose of this application is to demonstrate the power of several types of data visualizaion and the conclusions
        that can be drawn from them. Additionally, it attempts to show how D3.js and React.js, despite their reputation of not
        mixing well, can be seemlessly integrated to produce dynamic and responsive single-page applications with powerful, 
        native data visualizations.
        <br />
        <br />
        <a href="https://d3js.org/" target="_blank" rel="noopener noreferrer">Data Driven Documents</a> (D3) is a visualization tool for manipulating 
        the DOM based on data. Its applications and abilities are extensive, ranging from simple dots or lines on a canvas to 
        complex interactive maps.
      </div>
    </div>
  );
};

export default About;
