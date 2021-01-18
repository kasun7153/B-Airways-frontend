import React, { Component } from 'react'
import history from "../utils/history";
import {axiosGetInstance} from "../axios/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";

class Login extends Component {

    constructor(props) {    
        super(props)
        this.state = {
             email:"",
             password:"",
             loading:false
        }
        
    }
    

    login=()=>{
        this.setState({loading:true})
        axiosGetInstance().post("/user/signin",this.state).then(res=>{
            this.setState({loading:false})
            if(res.data.token){
                localStorage.setItem("token",res.data.token)
                this.props.getProfile()
                history.push("/schedule");
            }
            else{
                toast.error(res.data.message,{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true
                });
                console.log(res.data.message)
            }

        }).catch(err=>{
            this.setState({loading:false})
            console.log(err)
        })
    }

    setValues=(type,e)=>{
        if(type==="email"){
            this.setState({email:e.target.value})
        }else{
            this.setState({password:e.target.value})
        }
    }

    render() {
        return (
            <div className="flex flex-wrap content-center justify-center" style={{height:"90vh"}}>
                
                <div className="text-center w-90 border-2 p-10 rounded">
                    <span className="font-bold block mb-10 text-3xl">Sign in to your account</span>
                    <input onChange={(e)=>this.setValues("email",e)} value={this.state.email} className="w-full py-1  px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Email" type="text"></input>
                    <input onChange={(e)=>this.setValues("password",e)} value={this.state.password} className="w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Password" type="password"></input><br/>
                    <div onClick={this.login} className="rounded py-1 px-3 border-2 border-blue-900 bg-blue-900 text-white hover:shadow-2xl cursor-pointer"><PulseLoader color={"#FFFFFF"} loading={this.state.loading} size={5} />{!this.state.loading?"Sign in":null}</div>
                </div>
                
                <ToastContainer />
            </div>
        )
        
    }
}

export default Login
