import React, { Component } from "react";
import { Link } from "react-router-dom";
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Link to="/create">Create </Link>
        <Link to="upload">Upload </Link>
        <Link to="/my">MY </Link>
        <Link to="/new">NEW </Link>
        <Link to="/myi">MYI </Link>
      </div>
    );
  }
}

export default Routes;
