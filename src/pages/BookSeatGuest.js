import React, { Component } from 'react'
import {MdEmail } from 'react-icons/md';
import {BsPersonFill } from 'react-icons/bs';
import {ImMobile } from 'react-icons/im';
import {BiWorld } from 'react-icons/bi';
import {FaPassport } from 'react-icons/fa';
import {MdToday } from 'react-icons/md';

class BookSeatGuest extends Component {

    constructor(props){
        super(props)
        this.state={
            userProfile:""
        }
    }
    render() {
        return (
            <div className="px-24 py-10">
                
                <div className="flex flex-wrap justify-center align-center">
                    <div>
                    <div className="flex mt-7 justify-center">
                            <img className="w-24 h-24" src="/assets/logo.png"></img>
                        </div>

                    <div className="flex mt-10">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <BsPersonFill size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                                <input placeholder="Full name" className="w-80 border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="text" value={this.state.userProfile.name} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,name:e.target.value}})}}/>
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <MdEmail size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                            <input type="email" placeholder="Email" className="w-80 border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="email" value={this.state.userProfile.email} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,email:e.target.value}})}}/>
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <ImMobile size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                            <input placeholder="Contact Number" className="w-80 border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="text" value={this.state.userProfile.contact_no} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,contact_no:e.target.value}})}}/>
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <BiWorld size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                            <input placeholder="Country" className="w-80 border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="text" value={this.state.userProfile.country} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,country:e.target.value}})}}/>
                                
                            </div>  
                        </div>


                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <FaPassport size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                            <input placeholder="Passport Number" className="w-80 border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="text" value={this.state.userProfile.passport_no} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,passport_no:e.target.value}})}}/>
                               
                            </div>  
                        </div>

                        <div className="px-7 mt-10 flex justify-between">
                            <div onClick={this.props.closeModel} className="p-3 cursor-pointer rounded text-center text-xl text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white">
                                
                                    Cancel
                                
                            </div> 

                            <div className="p-3 cursor-pointer rounded text-center text-xl text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                                
                                   Make Booking
                                
                            </div> 
                        </div>
                </div>
               </div>
            </div>
        )
    }
}

export default BookSeatGuest
