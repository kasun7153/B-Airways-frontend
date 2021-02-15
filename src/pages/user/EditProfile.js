import React, { Component } from 'react'
import {axiosGetInstance} from "../../axios/axios"
import moment from 'moment';
import PulseLoader from "react-spinners/PulseLoader";
import {BsPersonFill } from 'react-icons/bs';
import {MdEmail } from 'react-icons/md';
import {ImMobile } from 'react-icons/im';
import {BiWorld } from 'react-icons/bi';
import {FaPassport } from 'react-icons/fa';
import {MdToday } from 'react-icons/md';
import history from "../../utils/history";
import { ToastContainer, toast } from 'react-toastify';

class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            loading:true
        }
    }

    date(date){
        return <div>{moment(date).utc().format('YYYY-MM-DD')}</div>
    }

    dateValue(date){
        return moment(date).format('YYYY-MM-DD')
    }

    componentDidMount(){

        axiosGetInstance().get("user/profile").then(res=>{
            console.log(res.data)
            this.setState({userProfile:res.data.data,loading:false})
            this.setState({userProfile:{...this.state.userProfile,birthday:this.dateValue(this.state.userProfile.birthday)}})
        }).catch(err=>{
            console.log(err)
        })
    }

    saveChanges=()=>{
        console.log(this.state.userProfile)
        axiosGetInstance().post("user/editprofile",this.state.userProfile).then(res=>{
            if(res.data.success){
                history.push("/user/profile")
            }else{
                toast.error(res.data.message,{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true
                });
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                
            {this.state.loading? <div className="flex justify-center mt-10">
                    <PulseLoader color={"black"}  size={20} />
                </div>
                    :
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <div className="flex flex-wrap justify-center content-center mt-10 h-full">
                    <div>
                        <div className="text-center">
                            <img className="inline rounded-full h-48 w-48 border-black-500 border-2" alt="profile Pic" src="https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png" />
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <BsPersonFill size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                                <input className="border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="text" value={this.state.userProfile.name} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,name:e.target.value}})}}/>
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <MdEmail size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                            <input className="border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="email" value={this.state.userProfile.email} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,email:e.target.value}})}}/>
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <ImMobile size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                            <input className="border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="text" value={this.state.userProfile.contact_no} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,contact_no:e.target.value}})}}/>
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <BiWorld size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                            <input className="border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="text" value={this.state.userProfile.country} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,country:e.target.value}})}}/>
                                
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <MdToday size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">

                            <input type="date" value={this.dateValue(this.state.userProfile.birthday)} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,birthday:e.target.value}})}}/>
                                
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <FaPassport size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                            <input className="border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" type="text" value={this.state.userProfile.passport_no} onChange={(e)=>{this.setState({userProfile:{...this.state.userProfile,passport_no:e.target.value}})}}/>
                               
                            </div>  
                        </div>

                        <div className="mt-10">
                            <div onClick={this.saveChanges} className="p-2 cursor-pointer rounded text-center text-3xl text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                                
                                    Save Changes
                                
                            </div> 
                        </div>

                    </div>
                </div>
                </div>
                }
                <ToastContainer />
            </div>
        )
    }
}

export default EditProfile
