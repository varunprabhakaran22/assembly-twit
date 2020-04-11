import React, { Component } from 'react'
import Cards from '../Cards/Cards'
import {Button} from 'react-bootstrap'
import Input from '../Input/Input'
import axios from 'axios'
import './Timeline.css'
export default class Timeline extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            timeline:false,
            userTimeline:[],
            mostTweets:false,
            mostTweetUser:"",
            result:[]
        }
    }
    componentDidMount = ()=>{
        console.log("clickn")
        let home_timeline = "http://localhost:4000/auth/timeline"
        axios.get(home_timeline)
        .then(res => {
            console.log(res)
            this.setState({
                timeline:true,
                userTimeline:res.data.data
            })
        })
        .catch(e => console.log(e))
    }

    //Method to update the state value
    setResult = (result) => {
        this.setState({
            result
        }) 
    }

    usernames = async()=>{
        let usernameList = []
        usernameList.push(this.state.userTimeline.map(name=> name.user.name))
        let users = await this.userWithMostTweets(usernameList)
        let userWithMostTweets = await this.userWithMostTweets(users)
        console.log(userWithMostTweets)
        this.setState({
            mostTweetUser: userWithMostTweets,
            mostTweets:true
        })
        console.log(this.state.mostTweetUser)
    }

    userWithMostTweets = (array)=>{
        if(array.length == 0)
            return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for(var i = 0; i < array.length; i++)
        {
            var el = array[i];
            if(modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    }

    render() {
        console.log(this.state.list)
        const { userTimeline ,result} = this.state
        let listItems = result.length > 0 ? result : userTimeline
        let val = listItems.map((list) => <Cards id ={list._id} val={list}/>);
        console.log("state")
        console.log(this.state.userTimeline)
        return (
            <div className = "timeline-container">
                <Input data={ userTimeline } setResult={this.setResult} />
                <Button  variant="info" className="most-tweets" onClick = {this.usernames}>User with most link </Button> 
                {this.state.mostTweets &&
                    <h2 className="user">
                        {this.state.mostTweetUser}
                    </h2>
                }
                {val}
            </div>
        )
    }
}
