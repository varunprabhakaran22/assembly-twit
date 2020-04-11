import React, { Component } from "react";
import Header from "../Header/Header";
import axios from 'axios'
import "./Homepage.css"

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

    fetchStatusesHomeTimeline =  () =>{
        // let homeTimeUrl = "https://api.twitter.com/1.1/statuses/home_timeline.json"
        // let screenName = "iamvarun2209"
        // let countValue = 2
        // const home_time_api_params = {
        //     params: {
        //         screen_name : screenName,
        //         count : countValue
        //     }, 
        //     headers:{
        //             "oauth_Consumer_key":"yUT02IJbXkmh4pzh2uZcw1jX8",
        //             "oauth_Consumer_Secret":"6ddvXruhDlmxLTu6UipunJaPCaQqe4RdRn4GAcJw6nE7IH6nhR",
        //             "oauth_Access_Token":"4326378313-Hp5kCrlc4LxM0Mjg5EOY2znhz4NGrLrrU1rkI5z",
        //             "oauth_Token_Secret":"LMsFzF2K69RzmcNnO4XSfqCLd8RLvnaRnhDWiz9kLTA1M",
        //             "Access-Control-Allow-Credentials": true,
        //             "Access-Control-Allow-Origin": "*"
        //     }
        //     // Authorization: {
        //         //     Consumer_key:"yUT02IJbXkmh4pzh2uZcw1jX8",
        //         //     Consumer_Secret:"6ddvXruhDlmxLTu6UipunJaPCaQqe4RdRn4GAcJw6nE7IH6nhR",
        //         //     Access_Token:"4326378313-Hp5kCrlc4LxM0Mjg5EOY2znhz4NGrLrrU1rkI5z",
        //         //     Token_Secret:"LMsFzF2K69RzmcNnO4XSfqCLd8RLvnaRnhDWiz9kLTA1M"
        //         // },
            
        // };

        let home_timeline = "http://localhost:4000/auth/user/timeline"
        axios.get(home_timeline)
        .then(res => console.log(res.data))
        .catch(e => console.log(e))
    }

    render() {
        const { authenticated } = this.state;
        return (
            <div>
                <Header
                    authenticated={authenticated}
                    handleNotAuthenticated={this.handleNotAuthenticated}
                />
                <div className="hompage-container">
                    {!authenticated ? 
                    (
                        <h1>Welcome!</h1> 
                    ) 
                    : 
                    (
                        <div>
                            <h1>You have login succcessfully!</h1>
                            <h2>Welcome {this.state.user.name}!</h2> 
                            {this.fetchStatusesHomeTimeline()}
                        </div>
                    )
                    }
                </div>
            </div>
        );        
    }
}