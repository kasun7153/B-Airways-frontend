import React, { Component } from 'react'
import {axiosGetInstance} from "../axios/axios"
import PulseLoader from "react-spinners/PulseLoader";
import SeatArrangement from './SeatArrangement';
import moment from 'moment';

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
            this.setState({flight:result.data.data[0]})
            console.log(this.state.flight)
        }).catch(err=>{
            console.log("err getting flight details")
        })
    }

    date(date){
            return <div>{moment(date).format('DD-MM-YYYY')}</div>
    }

    render() {
        return (
            <>

        {this.state.flight?
        <div className="flex justify-center m-5 border-2 border-blue-500 p-5 rounded bg-blue-900 text-white">
            <div>
            <div className="text-center text-3xl font-bold">Flight Id - {this.state.flight.flight_id}</div>
            <div className="flex mt-10">
                <div>
                {this.state.flight.origin_city} -{'>'} {this.state.flight.origin_state} -{'>'} {this.state.flight.origin_country}
                <br/>{this.date(this.state.flight.date)}
                {this.state.flight.start_time}
                </div>
                <div className="mr-5 ml-5">
                    <img alt="Img" className="w-20 h-20" src="/assets/white-plan.png"></img>
                </div>
                <div>
                    {this.state.flight.destination_city} -{'>'} {this.state.flight.destination_state} -{'>'} {this.state.flight.destination_country}
                    <br/>{this.date(this.state.flight.date)}
                    {this.state.flight.end_time}
                </div>
            </div>
            
        </div>
        </div>:null}

        {this.state.flight?<SeatArrangement user={this.props.user} flight_id={this.state.flight.flight_id} seat_details={this.state.flight.seat_info}/>:
        

        <div className="text-center mt-10">
                <PulseLoader color={"black"} loading={this.state.loading} size={20} />
            </div> 
            }
        <div>
            
        </div>
        
            </>
        
        )
    }
}

export default FlightDetails
