import React, { Component } from "react";
import Header from "../components/Header/Header";

export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      error: null,
      authenticated: false
    };
  }

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
    .then(response => {
      console.log(response)
      if (response.status === 200) return response.json();
      throw new Error("failed to authenticate user");
    })
    .then(responseJson => {
      console.log(responseJson)
      this.setState({
        authenticated: true,
        user: responseJson.user
      });
    })
    .catch(error => {
      console.log(error)
      this.setState({
        authenticated: false,
        error: "Failed to authenticate user"
      });
    });
  }

  handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <Header
          authenticated={authenticated}
          handleNotAuthenticated={this.handleNotAuthenticated}
        />
        <div>
          {!authenticated ? 
            (
              <h1>Welcome!</h1> 
            ) 
            : 
            (
              <div>
                <h1>You have login succcessfully!</h1>
                <h2>Welcome {this.state.user.name}!</h2>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}