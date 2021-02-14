import React, { Component } from 'react'
import {RiLockPasswordLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import {axiosGetInstance} from "../../axios/axios"
import history from "../../utils/history";

class ChangePassword extends Component {
    constructor(props){
        super(props)
        this.state={
            old_password:"",
            new_password:"",
            newPasswordConfirm:""
        }
    }

    changePassword=()=>{
        if(this.state.new_password===this.state.newPasswordConfirm){
            if(this.state.new_password){
                axiosGetInstance().post("user/changepassword",this.state).then(res=>{
                    console.log(res.data)
                    if(res.data.success){
                        this.setState({
                            old_password:"",
                            new_password:"",
                            newPasswordConfirm:""
                        })
                        toast.success(res.data.message,{
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true
                        });
                    }else{
                        toast.error(res.data.message,{
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true
                        });
                    }
                }).catch(err=>{
                    console.log(err)
                    toast.error(err.message,{
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true
                    });
                })
            }else{
                toast.error("Password can not be empty !",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true
                });
            }

        }else{
            toast.error("Password confirmation failed",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true
            });
        }
    }
    render() {
        return (
            <>
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <div className="flex flex-wrap justify-center content-center mt-10 h-full">
                   
                   

                    <div className="flex mt-7">
                        <div className="flex flex-wrap w-44 text-right justify-center content-center mb-5">
                            <RiLockPasswordLine size="100"/>
                        </div>
                    </div>

                    <div className="flex mt-7">
                        <div className="flex flex-wrap w-44 text-right justify-center content-center">
                            Current Password :-
                        </div>

                        <div className="flex text-xl flex-wrap align-middle content-center">
                            <input type="password" placeholder="Current password" className="border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" value={this.state.old_password} onChange={(e)=>{this.setState({old_password:e.target.value})}}/>
                        </div>  
                    </div>

                    <div className="flex mt-7">
                        <div className="flex flex-wrap w-44 text-center justify-center content-center">
                            New Password :
                        </div>

                        <div className="flex text-xl flex-wrap align-middle content-center">
                            <input type="password" placeholder="new password" className="border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" value={this.state.new_password} onChange={(e)=>{this.setState({new_password:e.target.value})}}/>
                        </div>  
                    </div>

                    <div className="flex mt-7">
                        <div className="flex flex-wrap w-44 text-center justify-center content-center">
                            New Password again :
                        </div>

                        <div className="flex text-xl flex-wrap align-middle content-center">
                            <input type="password" placeholder="Password Confirmation" className="border border-gray-300 pl-3 p-1 rounded  focus:outline-none focus:ring focus:border-blue-200" value={this.state.newPasswordConfirm} onChange={(e)=>{this.setState({newPasswordConfirm:e.target.value})}}/>
                        </div>  
                    </div>

                    <div className="mt-10 flex">
                            <div onClick={this.changePassword} className="p-2 cursor-pointer rounded text-center text-2xl text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                                
                                    Change Password
                               
                            </div> 

                           
                        </div>

                </div>
                
            </div>
            <ToastContainer />
            </>
        )
    }
}

export default ChangePassword
