import React from "react";
import "./css/main.scss";
import NetworkRap from "./pages/NetworkRap";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Communities from "./pages/Communities";
import Insigths from "./pages/Insights";
import draw from "./draw.svg";
import Build from "./pages/Build";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        <div className="sp-grid">
          <Switch>
            <Route path="/network">
              <NetworkRap />
            </Route>

            <Route path="/communities">
              <Communities />
            </Route>

            <Route path="/build">
              <Build />
            </Route>

            <Route path="/insigths">
              <Insigths />
            </Route>
            <Route exactPath="/">
              <div className="col-1-6">
                <div>Hi, we are Stéphane, Anelia and Atharva. </div>
                <br />
                <div>
                  For the <b>Social Graphs & Interactions ©</b> course at{" "}
                  <b>DTU</b>, we decided to build a network of U.S Hip-Hop
                  artists, via the <b>Spotify</b> API.
                </div>
                <br />
                <div>
                  On our website, you can get a look at the Network, some useful
                  insights about it, as well as text analysis between the
                  communities of the network.
                </div>
                <br />
                <div>
                  <i>Enjoy your visit </i> 😄
                </div>
                <hr />
                <div>
                  <i>
                    Atharva Bhat (s191397), Anelia Petrova (s191938),Stéphane
                    Guichard (s192576)
                  </i>
                </div>
                <img src={draw} />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
