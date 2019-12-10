import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import dataJ from "../data/rapGraph.json";

const height = 2000;
const width = 2000;
/* Component */
const NetworkRap = props => {
  const [name, setName] = useState("");

  const handleSubmit = evt => {
    evt.preventDefault();
    alert(`Submitting Name ${name}`);
  };
  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);
  const data = dataJ;

  const [ArtistName, setAName] = useState("");
  const [ratio, setRatio] = useState(1);
  const [modal, toggleModal] = useState(true);

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

  useEffect(() => {
    console.log("ha");
    if (window.innerWidth > 1100) {
      setRatio(1.5);
    }
  }, [window.innerWidth]);

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      if (data && d3Container.current) {
        console.log(data);
        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3
          .forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 3, (1.6 * height) / 3))
          .force("distanceMax", d3.forceManyBody().distanceMin([50]))
          .force("strength", d3.forceManyBody().strength([10]));

        const svg = d3.select(d3Container.current);

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
            return Math.sqrt(d.weight) * 2;
          })
          .style("fill", function(d) {
            return color(d.group);
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
          })
          .on("click", function(d) {
            d3.select(this)
              .transition()
              .duration(550)
              .attr("r", 30)
              .style("fill", "#03a9f4");
            // d3.select(labels["_groups"][0][d.index]).style(
            //   "visibility",
            //   "visible"
            // );
            toggleModal(true);
            setAName(d.id);
            setCollabs(d.collabs);
          })
          .on("mouseout", function(d) {
            d3.select(this)
              .transition()
              .duration(550)
              .attr("r", Math.sqrt(d.weight) * 2)
              .style("fill", "black");
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

        // var labels = node
        //   .append("svg:text")
        //   .text(function(d) {
        //     return d.id;
        //   })
        //   .style("text-anchor", "middle")
        //   .style("fill", "blue")
        //   .style("font-family", "Arial")
        //   .style("font-size", 30)
        //   .style("visibility", "hidden");

        // node.append("title").text(d => d.id);

        simulation.on("tick", () => {
          // labels
          //   .attr("x", function(d) {
          //     return d.x;
          //   })
          //   .attr("y", function(d) {
          //     return d.y - 15;
          //   });
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
        //update.exit().remove();

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
    [data]
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

  return (
    <React.Fragment>
      <div className="col-1-6" style={{ position: "relative" }}>
        <svg
          style={{ position: "absolute" }}
          className="d3-component"
          width={800 * ratio}
          height={600 * ratio}
          viewBox="0 0 2000 2300"
          ref={d3Container}
        />

        {modal ? (
          <Modal
            ArtistName={ArtistName}
            ArtistCollabs={ArtistCollabs}
            filteredCollabs={filteredCollabs}
            setName={setName}
            name={name}
            toggleModal={toggleModal}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};

const Modal = ({
  ArtistName,
  ArtistCollabs,
  filteredCollabs,
  setName,
  name,
  toggleModal
}) => {
  return (
    <div className="collabs-div">
      <button className="close-modal" onClick={() => toggleModal(false)}>
        Close
      </button>
      {ArtistName ? (
        <React.Fragment>
          <div className="artist-name">{ArtistName}</div>
          {ArtistCollabs ? (
            <div className="artist-collab-div-wrap">
              <input
                type="text"
                placeholder="Search collaborator"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <br />
              <div className="artist-collab-div">
                {filteredCollabs.map(el => (
                  <span className="artist-collab">
                    {el[0]}, <i>{el[1]} collabs.</i>
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          <div className="info">💡 Click on another node to change artist</div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="info">💡 Click on a node to look-up an artist</div>
          <div className="info">⚠️ Works best on a computer</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default NetworkRap;
