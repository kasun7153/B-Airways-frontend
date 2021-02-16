import React, { Component } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import {axiosGetInstance} from "../axios/axios"
import Modal from 'react-modal';
import BookSeatGuest from './BookSeatGuest';
import { ToastContainer, toast } from 'react-toastify';
import BookSeatRegisteredUser from './BookSeatRegisteredUser';
import history from "../utils/history";
import PulseLoader from "react-spinners/PulseLoader";

class SeatArrangement extends Component {

    

    constructor(props){
        

        super(props)
        this.state={
            isOpen:false,
            economy_seats:[],
            business_seats:[],
            platinum_seats:[],
            loading:false
            
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
        this.setState({selectedSeat:null,loading:true})
        axiosGetInstance().get(`/schedule/${this.props.flight_id}/${seat.SEAT_ID}`).then(res=>{
            this.setState({selectedSeat:{seatID:seat.SEAT_ID, priceDetails:res.data},loading:false})
            console.log(this.state.selectedSeat)
        }).catch(err=>{
            console.log(err)
        })
        //console.log(seat)
        //console.log(this.state.selectedSeat)
    }

    closeModel=()=>{
        this.setState({isOpen:false})
    }
    
    bookingSuccess=(msg)=>{
        toast.success(msg,{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
        });
        setTimeout(() => {
            history.push("/schedule")
        }, 3000);
    }

    bookingFailed=(msg)=>{
        console.log("Booking Failed")
        toast.error(msg,{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true
        });
    }

    render() {
        const customStyles = {
            content : {
              
              top                   : '55%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            }
          };

        return (  
            <>
            
            
             {this.state.loading?
                    <div >
                    <div className="text-center mb-5">
                        <PulseLoader color={"black"} loading={this.state.loading} size={15} />
                    </div> 
                    
                </div>:null}
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
                        
                        {this.state.selectedSeat.priceDetails.user_id?
                        <div>
                        <div className="mt-3">Price :- Rs {this.state.selectedSeat.priceDetails.default_price}/=</div>
                           
                        {
                        this.state.selectedSeat.priceDetails.package_name==="Basic"?null:
                        
                            <div className="mt-3">Discount Price :- Rs {this.state.selectedSeat.priceDetails.discount_price}/=</div>
                       
                        }

                        <div>Package :- {this.state.selectedSeat.priceDetails.package_name} </div>
                        </div>
                        :
                        <div>
                        <div className="mt-3">Price :- Rs {this.state.selectedSeat.priceDetails.default_price}/=</div>
                        <div className="mt-3">Discounts :- No Discounts for guest users</div>
                        </div>
                        }
                        

                        <button onClick={()=>{
                            this.setState({isOpen:true})}} className="mt-3 w-55 rounded py-1 px-3 text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">Make a Booking</button>
                    </div>
                    
                </div>
                
            
            </div>
                
            
            :null}
            
            </div> 

            <Modal ariaHideApp={false} onRequestClose={()=>this.setState({isOpen:false})} isOpen={this.state.isOpen} style={customStyles}>
                {this.props.user?
                <BookSeatRegisteredUser bookingFailed={this.bookingFailed} bookingSuccess={this.bookingSuccess} user={this.props.user} closeModel={this.closeModel} flight_id={this.props.flight_id} selectedSeat={this.state.selectedSeat}/>
                :
                <BookSeatGuest bookingFailed={this.bookingFailed} bookingSuccess={this.bookingSuccess} user={this.props.user} closeModel={this.closeModel} flight_id={this.props.flight_id} selectedSeat={this.state.selectedSeat}/>}
                
            </Modal>
            <ToastContainer />
            </>
        )
    }
}

export default SeatArrangement
