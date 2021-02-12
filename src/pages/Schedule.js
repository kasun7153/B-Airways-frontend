import React, { Component } from 'react'
import {axiosGetInstance} from "../axios/axios"
import PulseLoader from "react-spinners/PulseLoader";
import history from "../utils/history";
import moment from 'moment';
import { RiPlaneLine } from 'react-icons/ri';
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

    date(date){
        return <div>{moment(date).utc().format('DD-MM-YYYY')}</div>
    }

    renderFlighrSchedules(){
        if(this.state.flights){
            const FlighrSchedules =this.state.flights.map(data=>{
                return(
                    <div key={data.flight_id} onClick={()=>{history.push(`/schedule/${data.flight_id}`);}} className="cursor-pointer m-5 border-2 border-blue-500 p-5 rounded hover:bg-blue-900 hover:text-white">
                        

                        <div>
                    <div className="text-center text-3xl font-bold">Flight Id - {data.flight_id}</div>
                    <div className="flex mt-10 justify-center">
                        <div style={{width:"30%"}}>
                            {data.origin_city} -{'>'} {data.origin_state} -{'>'} {data.origin_country}
                            <br/>{this.date(data.date)}
                            {data.start_time}
                        </div>
                        <div className="mr-5 ml-5">
                            <RiPlaneLine className="w-20 h-20"/>
    
                        </div>
                        <div style={{width:"30%"}}>
                            {data.destination_city} -{'>'} {data.destination_state} -{'>'} {data.destination_country}
                            <br/>{this.date(data.date)}
                            {data.end_time}
                        </div>
                    </div>
            
        </div>
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
