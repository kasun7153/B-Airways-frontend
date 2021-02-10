import React, { Component } from 'react'
import history from "../utils/history";
import {axiosGetInstance} from "../axios/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";

class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading:false,
             formdata:{
                name:"",
                email:"",
                birthday:"",
                contact_no:"",
                passport_no:"",
                country:"",
                password:"",
                user_photo:"my_photo"
             }
        }
    }

    signUp=()=>{
        this.setState({loading:true})
        axiosGetInstance().post("/user/signup",this.state.formdata).then(res=>{
            this.setState({loading:false})
            if(res.data.sucess){
                console.log(res.data.message)
                toast.success("Registration Scuessfull",{
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true
                });
                history.push("/login");
            }else{
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
    
    changeInput=(name,e)=>{
        switch(name){
            case "name":
                
                this.setState({formdata:{...this.state.formdata,name:e.target.value}})
                break;
            case "email":
                
                this.setState({formdata:{...this.state.formdata,email:e.target.value}})
                break;
            case "birthday":
                
                this.setState({formdata:{...this.state.formdata,birthday:e.target.value}})
                break;
            case "contact_no":
                
                this.setState({formdata:{...this.state.formdata,contact_no:e.target.value}})
                break;
            case "passport_no":
                
                this.setState({formdata:{...this.state.formdata,passport_no:e.target.value}})
                break;
            case "country":
                
                this.setState({formdata:{...this.state.formdata,country:e.target.value}})
                break;
            case "password":
                
                this.setState({formdata:{...this.state.formdata,password:e.target.value}})
                break;
            default:
        }
    }
    
    render() {
        return (

            <div className="flex flex-wrap content-center justify-center" style={{height:"90vh"}}>
                <div className="text-center border-2 p-10 rounded" style={{ width: "50%" }}>                    
                    <span className="font-bold block mb-10 text-3xl">Create a new account</span>
                    <input onChange={(e)=>{this.changeInput("name",e)}} value={this.state.formdata.name} className="w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Name" type="text"/>
                    <input onChange={(e)=>{this.changeInput("contact_no",e)}} value={this.state.formdata.contact_no} className="w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Contact no" type="text"/>
                    <input onChange={(e)=>{this.changeInput("passport_no",e)}} value={this.state.formdata.passport_no} className="w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Passport no" type="text"/>
                    <input onChange={(e)=>{this.changeInput("birthday",e)}} value={this.state.formdata.birthday} className="w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Birthday" type="text"/>
                    <input onChange={(e)=>{this.changeInput("country",e)}} value={this.state.formdata.country} className="w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Country" type="text"/>
                    <input onChange={(e)=>{this.changeInput("email",e)}} value={this.state.formdata.email} className="w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Email" type="text"/>
                    <input onChange={(e)=>{this.changeInput("password",e)}} value={this.state.formdata.password} className="w-full py-1 px-2 rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5" placeholder="Password" type="password"/><br/>
                    <div onClick={this.signUp} className="rounded py-1 px-3 border-2 border-blue-900 bg-blue-900 text-white hover:shadow-2xl cursor-pointer"><PulseLoader color={"#FFFFFF"} loading={this.state.loading} size={5} />{!this.state.loading?"Sign Up":null}</div>
                </div>
                <ToastContainer />
            </div>

        )
    }
}

export default SignUp
