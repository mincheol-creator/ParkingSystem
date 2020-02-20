import React, { Component } from "react";
import Home from "./Home";
import Space from "./Space";
import Fee from "./Fee";
import { Route, NavLink, HashRouter } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <h1>Parking System</h1>
            <ul className="header">
              <li>
                <NavLink exact to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/space">Space</NavLink>
              </li>
              <li>
                <NavLink to="/fee">Fee</NavLink>
              </li>
            </ul>
            <div className="content">
              <Route exact path="/" component={Home}></Route>
              <Route path="/space" component={Space}></Route>
              <Route path="/fee" component={Fee}></Route>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Main;
