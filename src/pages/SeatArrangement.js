import React, { Component } from 'react'
import { AiOutlineClose } from 'react-icons/ai';


class SeatArrangement extends Component {
    constructor(props){
        super(props)
        this.state={
            economy_seats:[],
            business_seats:[],
            platinum_seats:[],
            loading:true
            
        }
        console.log(this.props.seat_details)
    }

    componentDidMount(){
        Object.entries(this.props.seat_details).forEach(([key, value]) => {
            switch(value.CLASS_NAME){
                case "Economy":
                    this.setState({seat_details:this.state.economy_seats.push(value)})
                    break
                case "Business":
                    this.setState({seat_details:this.state.business_seats.push(value)})
                    break
                case "Platinum":
                    this.setState({seat_details:this.state.platinum_seats.push(value)})
                    break
                default:
            }
            
            
          });
    }

    selectSeat(seat){
        this.setState({selectedSeat:{seatID:seat.SEAT_ID}})
        console.log(seat.SEAT_ID)
        console.log(this.state.selectedSeat)
    }

    render() {
        return (  
            <>
            
            
             
            <div className="flex flex-wrap justify-center"> 
            <div style={{width:"60%"}} className="flex flex-wrap justify-center">
            <div>
            <div className="w-80 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="col-span-4 text-xl">Platinum Class</div>
            {
                this.state.platinum_seats.map(seat=>{
                    if(seat.isAvailable){
                    return<div onClick={()=>{this.selectSeat(seat)}} className="transform hover:scale-110 hover:shadow-xl cursor-pointer flex justify-center items-center w-full h-16 border-2 border-blue-900" key={seat.SEAT_ID}>{seat.SEAT_ID}</div>  
                    }
                    return<div className="flex  bg-red-600 text-white justify-center items-center w-full h-16 border-2 border-blue-900" key={seat.SEAT_ID}>{seat.SEAT_ID}</div>
                })
            }
            </div>


            <div className="w-80 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="col-span-4 text-xl mt-5">Business Class</div>
            {
                this.state.business_seats.map(seat=>{
                    if(seat.isAvailable){
                        return<div onClick={()=>{this.selectSeat(seat)}} className="transform hover:scale-110 hover:shadow-xl cursor-pointer flex justify-center items-center w-full h-16 border-2 border-blue-900" key={seat.SEAT_ID}>{seat.SEAT_ID}</div>  
                        }
                        return<div className="flex  bg-red-600 text-white justify-center items-center w-full h-16 border-2 border-blue-900" key={seat.SEAT_ID}>{seat.SEAT_ID}</div>
    
                })
            }
            </div>

        
            <div className="w-80 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="col-span-4 text-xl mt-5">Economy Class</div>
            {
                this.state.economy_seats.map(seat=>{
                    if(seat.isAvailable){
                        return<div onClick={()=>{this.selectSeat(seat)}} className="transform hover:scale-110 hover:shadow-xl cursor-pointer flex justify-center items-center w-full h-16 border-2 border-blue-900" key={seat.SEAT_ID}>{seat.SEAT_ID}</div>  
                        }
                        return<div className="flex  bg-red-600 text-white justify-center items-center w-full h-16 border-2 border-blue-900" key={seat.SEAT_ID}>{seat.SEAT_ID}</div>
    
                })
            }
            </div>
            </div>
            

            
            </div>
            {this.state.selectedSeat?
            <div className="flex flex-wrap content-center justify-center text-center" style={{width:"40%"}}>
                <div className="border-2 border-blue-500 rounded">
                    <div className="flex mt-2 mr-3 justify-end">
                        <AiOutlineClose onClick={()=>{this.setState({selectedSeat:undefined})}}/>
                    </div>
                    <div className="p-10">
                        <div className="text-2xl">Seat Price and Discounts</div>
                        <div className="mt-5">Seat No :- {this.state.selectedSeat.seatID}</div>
                        <div className="mt-3">Price :- Rs 100/=</div>
                        <div className="mt-3">Discounts :- No Discounts for guest users</div>
                        <button className="mt-3 w-55 rounded py-1 px-3 text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">Make a Booking</button>
                    </div>
                    
                </div>
                
            
            </div>
                
            
            :null}
            
            </div> 
            </>
        )
    }
}

export default SeatArrangement
