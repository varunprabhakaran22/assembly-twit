import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../components/Header/Header.css"


export default class Header extends Component {
  handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open("http://localhost:4000/auth/twitter", "_self");
  };

  handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open("http://localhost:4000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };


  render() {
    const { authenticated } = this.props;
    console.log(this.props)
    return(
      <div>
        <nav>
          <ul>
            <li >
              <Link className="link-style" to="/" >Home</Link>
            </li  >
            {
              authenticated ? 
              (
                <li className="link-style" onClick={this.handleLogoutClick}>Logout</li>
              ) 
              : 
              (
                <li className="link-style"  onClick={this.handleSignInClick}>Login with Twitter</li>
              )
            }
          </ul>
        </nav>
      </div>
    );
  }
}
