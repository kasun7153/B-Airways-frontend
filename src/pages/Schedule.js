import React, { Component } from 'react'
import {axiosGetInstance} from "../axios/axios"
import PulseLoader from "react-spinners/PulseLoader";
import history from "../utils/history";

class Schedule extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             user:null,
             loginStat:false,
             flights:null,
             loading:true,
        }
    }
    
    componentDidMount(){
        this.getFlightSchedule()
    }

    getFlightSchedule=()=>{
        axiosGetInstance().get("/schedule").then(result=>{
            this.setState({loading:false})
            console.log(result.data.data)
            this.setState({flights:result.data.data})
        }).catch(err=>{
            console.log("err getting flight details")
        })
    }

    renderFlighrSchedules(){
        if(this.state.flights){
            const FlighrSchedules =this.state.flights.map(data=>{
                return(
                    <div key={data.flight_id} onClick={()=>{history.push(`/schedule/${data.flight_id}`);}} className="cursor-pointer m-5 border-2 border-blue-500 p-5 rounded hover:bg-blue-900 hover:text-white">
                        <div>Flight Id :- {data.flight_id}</div>
                        <div>Date :- {new Date(data.date).toDateString()}</div>
                        <div>From :- {data.origin_city}-{'>'}{data.origin_state}-{'>'}{data.origin_country}</div>
                        <div>To :- {data.destination_city}-{'>'}{data.destination_state}-{'>'}{data.destination_country}</div>
                        <div>Start At :- {data.start_time}</div>
                        <div>End At:- {data.end_time}</div>
                    </div>
                )
            })
            return FlighrSchedules
        }
    }

    render() {
        return (
            <div>
                <div className="m-5 font-bold text-xl">
                    Hello {this.props.user?this.props.user.name:"Guest"}
                </div>
                
                <div >
                    <div className="text-center">
                        <PulseLoader color={"black"} loading={this.state.loading} size={20} />
                    </div> 
                    {this.renderFlighrSchedules()}
                </div>
            </div>
        )
    }
}

export default Schedule
