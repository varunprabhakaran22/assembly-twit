//Importing the required packages for this component
import React,{ useState } from 'react'
import './Input.css'

const Input = (props) => {
    const [input,setInput] = useState('');
    const datas = props.data
    let { setResult } = props;

    let filterData = async () => {
        console.log("filter function")
        console.log(input)
        let result = ""
        //If  user search input is not empty then try to match the search result with api data   
        if(input !== ''){
            console.log(datas)
            result = await datas.filter( data => data.user.location.toLowerCase().includes(input))
            console.log(result)

            //If the user input is not matching with api provider (attribute) then search with hastage (attribute)
            // if(result.length <= 0){
            //     result = await datas.entities.hashtag.filter(data => data.text.toLowerCase().includes(input))
            // }
            setResult(result)
        }   
    }
    return (

        //User input search box 
        <div className="input">
            <input type="text" 
            className="inputBox" 
            placeholder="Search Provider or Subject " 
            onChange={event => setInput(event.target.value)}/>
            <button className="button" onClick={filterData}><i className="fa fa-search"></i></button>
        </div>
    )
}

export default Input