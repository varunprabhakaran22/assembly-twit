import React, { Component } from 'react'
import { withRouter} from "react-router-dom";
import '../Landingpage/Landingpage.css'

class LandingPage extends Component {
    
    //redirecting
    loginPage = ()=>{
        this.props.history.push("/loginPage")
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
                    <div>   
                        <div className= "form_right">
                            <button type="button" className = "frmBtn"  onClick = {this.loginPage}> Sign in </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default  withRouter(LandingPage)