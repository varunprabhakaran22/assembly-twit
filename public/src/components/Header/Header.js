import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css"


export default class Header extends Component {
  constructor(props) {
    super(props)
  }

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
    return(
      <div>
        <nav>
          <ul>
            
            {
              authenticated ? 
              (
                <li className="link-style" onClick={this.handleLogoutClick}>Logout</li>
              ) 
              : 
              (
                <li className="link-style"  onClick={this.handleSignInClick}>sign in with Twitter</li>
              )
            }
            <li >
              <Link className="link-style" to="/" >Home</Link>
            </li  >
          </ul>
        </nav>
      </div>
    );
  }
}
