import React from "react";

import "../css/DataSources.css";

const DataSources = () => {
  return (
    <div className="data-sources-wrapper">
      <div className="data-sources-header">Where the Data Comes From</div>
      <div className="data-sources-body">
        {/* <div className="data-section">
          <div className="data-section-header">COV-SARS-2 Data</div>
          <div className="data-section-body">About SARS-COV-2 data</div>
        </div> */}
        <div className="data-section">
          <div className="data-section-header">Odyssey Data</div>
          <div className="data-section-body">
            This data was entirely compiled by myself, based on the English
            translation of Homer's <i>Odyssey</i> by Robert Fitzgerald. The
            intention with this data was to take the most major characters and
            show how they relate to one another using a knowledge graph with
            different kinds of relationships. However, since this data was
            compiled by hand and without a terribly particular criteria, there
            are possibly some inconsistencies in what data is displayed.
            I don't claim these relationships to always be complete or 100%
            accurate. The important part is that they can hopefully be used to
            get a good idea of how a knowledge graph works, and for those of you
            who are Homer fanatics like me, maybe also provide an interesting
            visual on how the characters interact.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSources;
