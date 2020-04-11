import React, { Component } from "react";
import Header from "../Header/Header";
import Timeline from '../Timeline/Timeline'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import "./Homepage.css"

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            error: null,
            authenticated: false,
            status :""
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
        console.log("clickn")
        let home_timeline = "http://localhost:4000/auth/user/timeline"
        axios.get(home_timeline)
        .then(res => {
            console.log("satus" + this.state.status)
            this.setState({
                status:res.status
            })
        })
        .catch(e => console.log(e))
    }

    render() {
        const { authenticated, status } = this.state;
        console.log(status)
        return (
            <div>
                <Header
                    authenticated={authenticated}
                    handleNotAuthenticated={this.handleNotAuthenticated}
                />    
                {status =="200" ?
                    (
                        <div>
                            <Timeline />
                        </div>
                    )
                    :
                    (
                        <div className = "hompage-container">
                            {!authenticated ? 
                                (
                                    <h1>Welcome!</h1> 
                                ) 
                                : 
                                (
                                    <div>
                                        <h1>You have login succcessfully!</h1>
                                        <h2>Welcome {this.state.user.name}!</h2> 
                                        <Button  variant="primary"   className = "button-refresh"onClick={this.fetchStatusesHomeTimeline}> Refresh </Button>     
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        );        
    }
}