import React, { useState, useEffect, useRef } from "react";

const LineGraph = (props) => {
  const lineGraphContainer = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  return <svg ref={lineGraphContainer} width={width} height={height} />;
};

export default LineGraph;
