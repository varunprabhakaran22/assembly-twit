import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap'
import './Cards.css'

export default class Cards extends Component {
    constructor(props) {
        super(props)
    }
    
    openTwitter = ()=> {
        let url  = this.props.val.entities.urls[0].url;
        console.log(url);
        window.open(url);
    }

    render() {
        let text = this.props.val.text
        let newText = text.replace('https', '`');
        let new_text = newText.split('`')[0];
        let time = this.props.val.created_at;
        let created_at = time.split('+')[0];
        return (
            <div className = "card-container"> 
                <Card className = "card-align">
                    <Card.Header>{this.props.val.user.name}</Card.Header>
                    <Card.Body>
                        <Card.Title>{new_text}</Card.Title>
                        <Card.Text>{this.props.val.user.location}</Card.Text>
                        <Card.Text>{created_at}</Card.Text>
                        <Button variant="primary" onClick = {this.openTwitter}>view</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
