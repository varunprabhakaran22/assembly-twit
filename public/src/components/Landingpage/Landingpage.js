import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';
import { withRouter} from "react-router-dom";
import axios from 'axios'
import '../Landingpage/Landingpage.css'

class LandingPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            signInWithTwitter:false,
            assemblyTwitterUrl:""
        }
    }
    
    //redirecting
    loginPage = ()=>{
        // this.props.history.push("/loginPage")
        axios.get("http://localhost:5000/api/twitter/login")
        .then((res,req) =>{
            this.setState({
                assemblyTwitterUrl : res.responseURL,
                signInWithTwitter : true

            })
            console.log(res)
            console.log(this.state.assemblyTwitterUrl)
        })
        .catch((err) => {
            console.log(err)
        })
    } 


    routeChange=()=> {
        let path = this.state.assemblyTwitterUrl
        let history = useHistory();
        history.push(path);
    }

    render(){
        return(
            <div className="container flex">
                <div className="flex1 ">
                    <div className="appName alignCenter">
                        <h1>Assembly <span> </span> </h1> 
                    </div>
                </div>
                <div className="flex1">
                    {this.state.signInWithTwitter ? 
                        (
                            <div className= "form_right">
                                <button type="button" className = "frmBtn"  onClick = {this.routeChange}> Sign in with Twitter </button>
                            </div>
                        )
                        :
                        (
                            <div className= "form_right">
                                <button type="button" className = "frmBtn"  onClick = {this.loginPage}> Sign in </button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default  withRouter(LandingPage)