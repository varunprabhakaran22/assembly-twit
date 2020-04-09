import React, { Component } from 'react'
import axios from 'axios'
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    componentDidMount(){
        axios.get("http://localhost:5000/profile/")
        .then((res,req) =>{
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h1>Login page </h1>
            </div>
        )
    }
}
