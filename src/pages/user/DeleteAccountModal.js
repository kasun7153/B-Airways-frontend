import React, { Component } from 'react'
import {axiosGetInstance} from "../../axios/axios"
import { toast } from 'react-toastify';
import history from "../../utils/history";
import PulseLoader from "react-spinners/PulseLoader";

class DeleteAccountModal extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoading:false,
            password:""
        }
    }

    deleteAccount=()=>{
        this.setState({isLoading:true})
        axiosGetInstance().post("user/deleteAccount",{password:this.state.password}).then(res=>{
            this.setState({isLoading:false})
            if(res.data.success){
                toast.success(res.data.message,{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true
                })
                setTimeout(() => {
                    localStorage.clear();
                    history.push("/")
                    window.location.reload();
                }, 1500);
                
            }else{
                this.setState({isLoading:false})
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

            <div className="mx-24 my-10">
                <input type="password" placeholder="Password" 
                className={`h-12 w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 `}  
                value={this.props.password}
                onChange={(e)=>{this.setState({password:e.target.value})}}
                />
                {this.state.isLoading?
                <div onClick={this.deleteAccount} className="w-full mt-10 p-2 cursor-pointer rounded text-center text-2xl border-2 border-red-600 bg-red-600 text-white">
                    <PulseLoader color={"#FFFFFF"} loading={this.state.isLoading} size={5} />
                </div>
                :<div onClick={this.deleteAccount} className="w-full mt-10 p-2 cursor-pointer rounded text-center text-2xl text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white">
                    Delete Account    
                </div> }
                
            </div>
        )
    }
}

export default DeleteAccountModal
