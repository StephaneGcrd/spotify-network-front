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

const top2 = [
  ["Snoop Dogg", 0.0539072730070342],
  ["French Montana", 0.04443079126965523],
  ["Chip", 0.043826144856047376],
  ["Busta Rhymes", 0.04085951321764177],
  ["Chris Brown", 0.03942006350587971]
];

const top3 = [
  ["2 Chainz", 0.19251625821691187],
  ["Chris Brown", 0.1906224055289425],
  ["Rick Ross", 0.18035465858523805],
  ["Future", 0.17643733761861471],
  ["Lil Wayne", 0.17520973480840035]
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
          <h3>
            {" "}
            Top 5 artists by{" "}
            <a href="https://en.wikipedia.org/wiki/Betweenness_centrality">
              Betweeness centrality
            </a>
          </h3>
          {top2.map((el, key) => {
            return (
              <React.Fragment>
                <div className="top-element">
                  <span className="top-key">{key + 1}</span>
                  <span className="top-name">{el[0]}</span>
                  <span className="top-score">{el[1].toFixed(3)}</span>
                </div>
              </React.Fragment>
            );
          })}
          <h3>
            {" "}
            Top 5 artists by{" "}
            <a href="https://en.wikipedia.org/wiki/Eigenvector_centrality">
              Eigenvector centrality
            </a>
          </h3>
          {top3.map((el, key) => {
            return (
              <React.Fragment>
                <div className="top-element">
                  <span className="top-key">{key + 1}</span>
                  <span className="top-name">{el[0]}</span>
                  <span className="top-score">{el[1].toFixed(3)}</span>
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
