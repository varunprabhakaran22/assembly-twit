import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import '../Header/Header.css'

class Header extends Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to="/homepage" className="link-style" > Home </Link></li>
                        <li><Link to="#" className="link-style" > About </Link></li>
                        <li><Link to="#" className="link-style" > Contact </Link></li>
                    </ul>
                </nav>
            </div>
        ) 
    }
}

export default withRouter(Header)