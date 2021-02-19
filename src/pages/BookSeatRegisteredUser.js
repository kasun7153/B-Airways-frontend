import React, { Component } from 'react'
import {axiosGetInstance} from "../axios/axios"
import PulseLoader from "react-spinners/PulseLoader";

class BookSeatRegisteredUser extends Component {
   

    constructor(props){
        super(props)
        this.state={
            loading:false,
            userProfile:""
        }
    }

    boookSeat=()=>{
        this.setState({loading:true})
        axiosGetInstance().post("/user/bookseat",{
            flight_id:this.props.flight_id,
            seat_id:this.props.selectedSeat.seatID,
            discount_price:this.props.selectedSeat.priceDetails.discount_price,
        }).then(res=>{
            this.setState({loading:false})
            if(res.data.success){
                this.props.bookingSuccess(res.data.message)
                
            }
            else{
                console.log(res.data)
                this.props.bookingFailed(res.data.message)
            }
           
        }).catch(err=>{
            this.setState({loading:false})
            console.log(err)
        })
    }

    render() {
        return (
            <div className="px-24 py-10">
                
                <div className="flex flex-wrap justify-center align-center">
                    <div>
                    <div className="flex mt-7 justify-center">
                            <img className="w-24 h-24" src="/assets/logo.png"></img>
                    </div>

                  
                    {this.state.loading?
                    <div className="mt-10 flex flex-wrap justify-center">
                        <PulseLoader  color={"black"} loading={this.state.loading} size={20} />
                    </div>
                    
                    :
                    
                    <div className="px-7 mt-10 flex justify-between">
                            <div onClick={this.props.closeModel} className="p-3 cursor-pointer rounded text-center text-xl text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white">
                                
                                    Cancel
                                
                            </div> 

                            <div onClick={this.boookSeat} className="ml-5 p-3 cursor-pointer rounded text-center text-xl text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                                
                                   Make Booking
                                
                            </div> 
                        </div>
                    }
                     

                        
                </div>
               </div>
               
            </div>
            
        )
    }
}

export default BookSeatRegisteredUser
