import React, { Component } from 'react'
import {axiosGetInstance} from "../axios/axios"
import PulseLoader from "react-spinners/PulseLoader";
import history from "../utils/history";
import moment from 'moment';
import { RiPlaneLine } from 'react-icons/ri';
import { FcSearch } from 'react-icons/fc';

class Schedule extends Component {

    constructor(props) {
        super(props)    
        this.state = {
             user:null,
             loginStat:false,
             flights:null,
             loading:true,
             myBookingsArray:[],
             selectedDestination:"",
             selectedOrigin:""
        }
        
    }
    componentDidUpdate() {
        if(this.props.user){
            if(localStorage.getItem("type")==="Admin"){
                history.push("/")
            }
            axiosGetInstance().get("user/getbookings").then(res=>{
                this.setState({myBookingsArray:res.data.bookings})
                
            }).catch(err=>{
                console.log("err getting flight details")
            })
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
        return <div>{moment(date).format('DD-MM-YYYY')}</div>
    }

    renderFlight(data){
        return(
            
            <div key={data.flight_id} onClick={()=>{history.push(`/schedule/${data.flight_id}`);}} 
            className={`cursor-pointer m-5 border-2 border-blue-500 p-5 rounded hover:bg-blue-900 hover:text-white ${this.state.myBookingsArray.includes(data.flight_id)?"bg-gray-500":""}`}
            >
                <div>
                    {this.state.myBookingsArray.includes(data.flight_id) && <b>You have booked</b>}
                    <div className="text-center text-3xl font-bold">Flight ID - {data.flight_id}</div>
                    <div className="flex mt-10 justify-center">
                        <div style={{width:"30%"}} className="text-right">
                                {data.origin_city} -{'>'} {data.origin_state} -{'>'} {data.origin_country}
                                <br/>{this.date(data.date)}
                                {data.start_time}
                        </div>

                        <div className="mx-10">
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
    }

    renderFlightSchedules(){
        if(this.state.flights){
            if(!this.state.selectedOrigin && !this.state.selectedDestination){
                const FlighrSchedules =this.state.flights.map(data=>{
                    return(
                        this.renderFlight(data)
                    )
                })
                return FlighrSchedules
            }  
            if(this.state.selectedOrigin && !this.state.selectedDestination){
                
                const FlighrSchedules =this.state.flights.map(data=>{
                    if(data.origin===this.state.selectedOrigin){
                        return(
                            this.renderFlight(data)
                        )
                    }
                    
                })
                return FlighrSchedules
            }
            if(!this.state.selectedOrigin && this.state.selectedDestination){
                
                const FlighrSchedules =this.state.flights.map(data=>{
                    if(data.destination===this.state.selectedDestination){
                        return(
                            this.renderFlight(data)
                        )
                    }
                    
                })
                return FlighrSchedules
            }
            if(this.state.selectedOrigin && this.state.selectedDestination){
                
                const FlighrSchedules =this.state.flights.map(data=>{
                    if(data.destination===this.state.selectedDestination && data.origin===this.state.selectedOrigin){
                        return(
                            this.renderFlight(data)
                        )
                    }
                    
                })
                return FlighrSchedules
            }
        }
    }

    render() {
        return (
            <div>
                <div className="m-10 font-bold text-2xl">
                    Hello {this.props.user?this.props.user.name:"Guest"} !
                </div>
                <div className="ml-5 text-bold text-xl mt-10 mb-5"> 
                <FcSearch size={40} className="inline-block mr-5"/>
                    <label className="mr-3"><b>Origin :</b></label>
                    <select name="origin" id="origin" className="bg-blue-50 border-2 rounded border-red-200"
                    value={this.state.selectedOrigin} 
                    onChange={(e)=>{this.setState({selectedOrigin:e.target.value})}} >
                        <option value="">All</option>
                        <option value="bia">Katunaya, Sri Lanka</option>
                        <option value="bkk">Samut Prak, Thailand</option>
                        <option value="bom">Mumbai, India</option>
                        <option value="cgk">Tangerang, Indonesia</option>
                        <option value="del">New Delhi, India</option>
                        <option value="dmk">Bangkok, Thailand</option>
                        <option value="dps">Kabupaten, Indonesia</option>
                        <option value="hri">Mattala, Sri lanka</option>
                        <option value="maa">Tamil Nadu, India</option>
                        <option value="sin">Tangerang, Singapore</option>
                    </select>

                    <label className="ml-10 mr-3"><b>Distination :</b></label>
                    <select name="origin" id="origin" className="bg-blue-50 border-2 rounded border-red-200"
                    value={this.state.selectedDestination} 
                    onChange={(e)=>{this.setState({selectedDestination:e.target.value})}} >
                        <option value="">All</option>
                        <option value="bia">Katunaya, Sri Lanka</option>
                        <option value="bkk">Samut Prak, Thailand</option>
                        <option value="bom">Mumbai, India</option>
                        <option value="cgk">Tangerang, Indonesia</option>
                        <option value="del">New Delhi, India</option>
                        <option value="dmk">Bangkok, Thailand</option>
                        <option value="dps">Kabupaten, Indonesia</option>
                        <option value="hri">Mattala, Sri lanka</option>
                        <option value="maa">Tamil Nadu, India</option>
                        <option value="sin">Tangerang, Singapore</option>
                    </select>

                </div>
                <div >
                    <div className="text-center">
                        <PulseLoader color={"black"} loading={this.state.loading} size={20} />
                    </div> 
                    <div className="grid md:grid-cols-1 lg:grid-cols-2">
                        {this.renderFlightSchedules()}
                    </div>
                    
                </div>
            </div>
        )
    }
    
}

export default Schedule
