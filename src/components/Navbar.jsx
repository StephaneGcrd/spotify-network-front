import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sp-nav">
      <h3>Spotify Network</h3>
      <Link to="/">
        <h5>Home</h5>
      </Link>
      <Link to="network">
        <h5>Network</h5>
      </Link>
      <Link to="build">
        <h5>Building the network</h5>
      </Link>
      <Link to="insigths">
        <h5>Insigths</h5>
      </Link>
      <Link to="communities">
        <h5>Communities</h5>
      </Link>

      <a href="Master_Explainer_Notebook.ipynb">
        <h5>Notebook</h5>
      </a>
    </div>
  );
}

export default Navbar;
