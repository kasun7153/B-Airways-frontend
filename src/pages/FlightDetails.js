import React, { Component } from 'react'
import {axiosGetInstance} from "../axios/axios"
import PulseLoader from "react-spinners/PulseLoader";
import history from "../utils/history";

class FlightDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
             flight:null,
             loading:true
        }
    }
    componentDidMount(){
        this.getFlightDetails()
    }
    

    getFlightDetails(){
        axiosGetInstance().get(`/schedule/${this.props.match.params.flight_id}`).then(result=>{
            this.setState({loading:false})
            this.setState({flight:result.data.data})
            console.log(result.data.data)
        }).catch(err=>{
            console.log("err getting flight details")
        })
    }

    render() {
        return (
            <>
            {this.state.flight?<div className="cursor-pointer m-5 border-2 border-blue-500 p-5 rounded bg-blue-900 text-white">
            <div>Flight Id :- {this.state.flight.flight_id}</div>
            <div>Date :- {this.state.flight.date}</div>
            <div>From :- {this.state.flight.origin_city}-{'>'}{this.state.flight.origin_state}-{'>'}{this.state.flight.origin_country}</div>
            <div>To :- {this.state.flight.destination_city}-{'>'}{this.state.flight.destination_state}-{'>'}{this.state.flight.destination_country}</div>
            <div>Start At :- {this.state.flight.start_time}</div>
            <div>End At:- {this.state.flight.end_time}</div>
        </div>:null}
            </>
        
        )
    }
}

export default FlightDetails
