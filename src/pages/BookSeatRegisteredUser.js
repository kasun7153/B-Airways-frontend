import React, { Component } from 'react'
import {MdEmail } from 'react-icons/md';
import {BsPersonFill } from 'react-icons/bs';
import {ImMobile } from 'react-icons/im';
import {BiWorld } from 'react-icons/bi';
import {FaPassport } from 'react-icons/fa';
import {axiosGetInstance} from "../axios/axios"
import history from "../utils/history";
import { ToastContainer, toast } from 'react-toastify';

class BookSeatRegisteredUser extends Component {
   

    constructor(props){
        super(props)
        this.state={
            userProfile:""
        }
    }

    boookSeat=()=>{
        axiosGetInstance().post("/user/bookseat",{
            flight_id:this.props.flight_id,
            seat_id:this.props.selectedSeat.seatID,
            discount_price:this.props.selectedSeat.priceDetails.discount_price,
        }).then(res=>{
            if(res.data.sucess){
                this.props.bookingSuccess(res.data.message)
                
            }
            else{
                console.log(res.data)
                this.props.bookingFailed(res.data.message)
            }
           
        }).catch(err=>{
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

                  

                     

                        <div className="px-7 mt-10 flex justify-between">
                            <div onClick={this.props.closeModel} className="p-3 cursor-pointer rounded text-center text-xl text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white">
                                
                                    Cancel
                                
                            </div> 

                            <div onClick={this.boookSeat} className="ml-5 p-3 cursor-pointer rounded text-center text-xl text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                                
                                   Make Booking
                                
                            </div> 
                        </div>
                </div>
               </div>
               
            </div>
            
        )
    }
}

export default BookSeatRegisteredUser
