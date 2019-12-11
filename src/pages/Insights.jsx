import React from "react";
import plot1 from "../imgs/plot1.png";
import plot2 from "../imgs/plot2.png";
import plot3 from "../imgs/plot3.png";

const TopArtists = [
  { name: "Snoop Dogg", score: 87 },
  { name: "Chris Brown", score: 83 },
  { name: "2 Chainz", score: 79 },
  { name: "Gucci Mane", score: 76 },
  { name: "Rick Ross", score: 76 }
];

const Insigths = () => {
  return (
    <React.Fragment>
      <div className="col-1-6 in-kp">
        <div>
          <h3> Top 5 artists</h3>
          {TopArtists.map((artist, key) => {
            return (
              <React.Fragment>
                <div className="top-element">
                  <span className="top-key">{key + 1}</span>
                  <span className="top-name">{artist.name}</span>
                  <span className="top-score">
                    {artist.score + " collaborations"}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <div className="component-in">
          <h3> Degree histogram</h3>
          <img src={plot1} />
        </div>

        <div className="component-in">
          <h3> Degree Centrality vs Betweeness Centrality</h3>
          <img src={plot2} />
        </div>

        <div className="component-in">
          <h3> Degree Centrality vs Eigenvector Centrality</h3>
          <img src={plot3} />
        </div>
      </div>
      <iframe
        title="static_html"
        className="pythonFrame col-1-6"
        src="LoadTracks_cleaned.html"
      ></iframe>
    </React.Fragment>
  );
};

export default Insigths;
