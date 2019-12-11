import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import data_0 from "../data/community_graphs/community_graph_0";
import data_1 from "../data/community_graphs/community_graph_1";
import data_2 from "../data/community_graphs/community_graph_2";
import data_3 from "../data/community_graphs/community_graph_3";
import data_4 from "../data/community_graphs/community_graph_4";
import data_5 from "../data/community_graphs/community_graph_5";
import data_6 from "../data/community_graphs/community_graph_6";
import data_7 from "../data/community_graphs/community_graph_7";
import data_8 from "../data/community_graphs/community_graph_8";
import data_9 from "../data/community_graphs/community_graph_9";

import wc0 from "../wclouds/wordcloud0.png";
import wc1 from "../wclouds/wordcloud1.png";
import wc2 from "../wclouds/wordcloud2.png";
import wc3 from "../wclouds/wordcloud3.png";
import wc4 from "../wclouds/wordcloud4.png";
import wc5 from "../wclouds/wordcloud5.png";
import wc6 from "../wclouds/wordcloud6.png";
import wc7 from "../wclouds/wordcloud7.png";
import wc8 from "../wclouds/wordcloud8.png";
import wc9 from "../wclouds/wordcloud9.png";

const wordclouds = [wc0, wc1, wc2, wc3, wc4, wc5, wc6, wc7, wc8, wc9];

const full_data = [];

full_data.push(data_0);
full_data.push(data_1);
full_data.push(data_2);
full_data.push(data_3);
full_data.push(data_4);
full_data.push(data_5);
full_data.push(data_6);
full_data.push(data_7);
full_data.push(data_8);
full_data.push(data_9);

const height = 2000;
const width = 2000;

const colorsCom = [
  "#c62828",
  "#8e24aa",
  "#2196f3",
  "#304ffe",
  "#4dd0e1",
  "#1de9b6",
  "#00e676",
  "#fbc02d",
  "#ff5722",
  "#2e7d32"
];
/* Component */
const Communities = props => {
  const [name, setName] = useState("");
  const [view, toggleView] = useState(false);

  const [displayedData, setDisplayed] = useState(0);

  const handleSubmit = evt => {
    evt.preventDefault();
    alert(`Submitting Name ${name}`);
  };
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);
  const data = full_data[displayedData];

  const [ArtistName, setAName] = useState("");

  const [ArtistCollabs, setCollabs] = useState([]);

  const [filteredCollabs, setFilteredCollabs] = useState([]);

  const color = () => {
    const scale = d3.scaleOrdinal(d3.schemeCategory10);
    return d => scale(d.group);
  };

  const drag = simulation => {
    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      if (data && d3Container.current) {
        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3
          .forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2))
          .force("distanceMax", d3.forceManyBody().distanceMin([50]))
          .force("strength", d3.forceManyBody().strength([10]));

        const svg = d3.select(d3Container.current);
        svg.selectAll("*").remove();

        const link = svg
          .append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.2)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", d => Math.sqrt(d.weight));

        var node = svg
          .selectAll(".node")
          .data(nodes)
          .enter()
          .append("g");

        var circle = node
          .append("circle")
          .attr("class", "node")
          .attr("id", function(d) {
            return d.id;
          })
          .attr("r", function(d) {
            return Math.sqrt(d.weight) * 5;
          })
          .style("fill", function(d) {
            return colorsCom[d.community];
          })
          .on("mouseover", function(d) {
            d3.select(this)
              .transition()
              .duration(550)
              .attr("r", 30)
              .style("fill", "#1db954");
            // d3.select(labels["_groups"][0][d.index]).style(
            //   "visibility",
            //   "visible"
            // );

            setAName(d.id);
            setCollabs(d.collabs);
          })
          .on("mouseout", function(d) {
            d3.select(this)
              .transition()
              .duration(550)
              .attr("r", Math.sqrt(d.weight) * 2)
              .style("fill", colorsCom[d.community]);
            // d3.select(labels["_groups"][0][d.index]).style(
            //   "visibility",
            //   "hidden"
            // ); //})

            var e = window.event;
            let x = e.clientX; // Get the horizontal coordinate
            let y = e.clientY;
            //setAName("");
            //setCollabs([]);
          })
          .call(drag(simulation));

        simulation.on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          circle
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            });

          node.attr("cx", d => d.x).attr("cy", d => d.y);
        });

        //update.attr("x", (d, i) => i * 40).text(d => d);

        // // Remove old D3 elements
        node.exit().remove();

        // ////
        // ///////
        // ///////
        // console.log(data);
        // const svg = d3.select(d3Container.current);

        // // Bind D3 data
        // const update = svg
        //   .append("g")
        //   .selectAll("text")
        //   .data(data);

        // // Enter new D3 elements
        // update
        //   .enter()
        //   .append("text")
        //   .attr("x", (d, i) => i * 25)
        //   .attr("y", 40)
        //   .style("font-size", 24)
        //   .text(d => d);

        // // Update existing D3 elements
        // update.attr("x", (d, i) => i * 40).text(d => d);

        // // Remove old D3 elements
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [data, displayedData]
  );

  useEffect(() => {
    let newArray = [];

    ArtistCollabs.forEach(artist => {
      if (artist[0].includes(name)) {
        newArray.push(artist);
      }
    });

    setFilteredCollabs(newArray);
  }, [ArtistCollabs, name]);

  useEffect(() => {}, [displayedData]);

  return (
    <React.Fragment>
      <div className="network-com col-1-3">
        <svg
          className="d3-component "
          width={300}
          height={300}
          viewBox="0 0 2000 2000"
          ref={d3Container}
        />
      </div>

      <div className="col-3-6 ">
        <div className="selection-comm">
          <h5 style={{ "margin-bottom": 3 }}>Select a community number:</h5>{" "}
          <button
            className={"change_btn " + (displayedData == 0 ? "active-c" : "")}
            onClick={() => setDisplayed(0)}
          >
            0
          </button>
          <button
            className={"change_btn " + (displayedData === 1 ? "active-c" : "")}
            onClick={() => setDisplayed(1)}
          >
            1
          </button>
          <button
            className={"change_btn " + (displayedData === 2 ? "active-c" : "")}
            onClick={() => setDisplayed(2)}
          >
            2
          </button>
          <button
            className={"change_btn " + (displayedData === 3 ? "active-c" : "")}
            onClick={() => setDisplayed(3)}
          >
            3
          </button>
          <button
            className={"change_btn " + (displayedData === 4 ? "active-c" : "")}
            onClick={() => setDisplayed(4)}
          >
            4
          </button>
          <button
            className={"change_btn " + (displayedData === 5 ? "active-c" : "")}
            onClick={() => setDisplayed(5)}
          >
            5
          </button>
          <button
            className={"change_btn " + (displayedData === 6 ? "active-c" : "")}
            onClick={() => setDisplayed(6)}
          >
            6
          </button>
          <button
            className={"change_btn " + (displayedData === 7 ? "active-c" : "")}
            onClick={() => setDisplayed(7)}
          >
            7
          </button>
          <button
            className={"change_btn " + (displayedData === 8 ? "active-c" : "")}
            onClick={() => setDisplayed(8)}
          >
            8
          </button>
          <button
            className={"change_btn " + (displayedData === 9 ? "active-c" : "")}
            onClick={() => setDisplayed(9)}
          >
            9
          </button>
        </div>
        <br />
        <div className="community-content">
          <div className="nav-communities">
            <button
              onClick={() => toggleView(false)}
              className={view ? "btn-active" : ""}
            >
              List
            </button>
            <button
              className={view ? "" : "btn-active"}
              onClick={() => toggleView(true)}
            >
              Text Analysis
            </button>
          </div>

          {view ? (
            <ArtistStats displayedData={displayedData} />
          ) : (
            <ArtistList displayedData={displayedData} full_data={full_data} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const ArtistList = ({ displayedData, full_data }) => {
  return (
    <React.Fragment>
      <h5 style={{ "margin-top": 3, "margin-bottom": 3 }}>
        Artists in the community n°{displayedData}
      </h5>
      <div>
        <div className="artist-collab-div">
          {full_data[displayedData].nodes.map(node => {
            if (node.weight) {
              return (
                <span className="artist-collab">
                  {node.id} <span className="nb-icon">{node.weight}</span>
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

const ArtistStats = ({ displayedData }) => {
  const sentimentScore = {
    "0": 4.258,
    "1": 4.314,
    "2": 4.307,
    "3": 4.305,
    "4": 4.088,
    "5": 4.098,
    "6": 4.969,
    "7": 4.5,
    "8": 4.589,
    "9": "N/A"
  };

  const medianYear = [
    2018,
    2018,
    2018,
    2018,
    2003,
    1999,
    2018,
    2017,
    2018,
    2017
  ];
  return (
    <React.Fragment>
      <h3>Statistics</h3>
      <div>
        <span className="kpi">
          Happiness Score :{" "}
          <b>{(sentimentScore[displayedData] * 10).toFixed(2)} % </b>
        </span>
        <span className="kpi">
          Median year : <b>{medianYear[displayedData]}</b>
        </span>
      </div>
      <br />
      <h3>Word Cloud</h3>
      <img className="wordcloud-img" src={wordclouds[displayedData]} />
    </React.Fragment>
  );
};

export default Communities;
