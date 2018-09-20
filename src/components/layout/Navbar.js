import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm mb-4">
        <div className="container">
          <div className="row">
            <Link className="navbar-brand col-md-3 " to="/">
                <div className="app-logo"/>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
