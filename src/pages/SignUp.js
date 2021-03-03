import React, { Component } from 'react'
import history from "../utils/history";
import {axiosGetInstance} from "../axios/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import moment from 'moment';
import {Formik,Form} from "formik"
import TextField from './TextField';
import * as Yup from 'yup';


import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class SignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading:false,
            value:"",
            contact_no:""
        }

    }

    signUp=(values)=>{
        console.log({...values,contact_no:"+"+this.state.contact_no})
        this.setState({loading:true})
        axiosGetInstance().post("/user/signup",{...values,contact_no:this.state.contact_no}).then(res=>{
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
    
    dateValue(date){
        return moment(date).format('YYYY-MM-DD')
    }

    
    render() {
        const validate=Yup.object({
            name:Yup.string().min(3,"Name should have min 3 characters").required("Required"),
            passport_no:Yup.string().min(5,"Invalid Passport Number").required("Required"),
            birthday:Yup.date("Invalid Date").required("Required"),
            country:Yup.string().min(2,"Invalid Country name").required("Required"),
            email: Yup.string().email("Email is invalid").required('Required'),
            password:Yup.string().min(5,"Password should be more than 5 characters").max(15,"Password should be less than 15 characters").required("Required"),
            
        })
        
        return (

            <Formik 
                initialValues={{
                    name:"",
                    passport_no:"",
                    birthday:"",
                    country:"",
                    email:"",
                    password:""
                }}
                validationSchema={validate}
                onSubmit={values=>{this.signUp(values)}}
            >
                {formik=>(
                    <div className="flex flex-wrap content-center justify-center" style={{height:"90vh"}}>
                        <div className="bg-white text-center border-2 p-10 rounded" style={{ width: "50%" }}>
                        <span className="font-bold block mb-10 text-4xl">Create a new account</span>
                        
                        <Form>
                            <div className="mb-5">
                                <TextField placeholder="Full Name" name="name" type="text"/>
                            </div>
                            

                            <div className="mb-5">
                                <PhoneInput 
                                    country={"lk"} 
                                    fullWidth="true"
                                    containerClass="border-2 border-blue-900 text-left rounded" 
                                    inputClass="bg-red-500 " 
                                    inputStyle={{width:"100%",background:"rgba(239, 246, 255, var(--tw-bg-opacity))"}}
                                    placeholder="Contact Number" 
                                    value={this.state.contact_no} 
                                    name="contact_no" 
                                    enableSearch={true} 
                                    onChange={phone=>this.setState({contact_no:phone})}/>
                            </div>
                            <div className="mb-5">
                                <TextField placeholder="Passport No" name="passport_no" type="text"/>
                            </div>
                            <div className="mb-5">
                                <TextField placeholder="Birthday" max={this.dateValue(new Date)} name="birthday" type="date"/>
                            </div>
                            <div className="mb-5">
                                <TextField placeholder="Country" name="country" type="text"/>
                            </div>
                            <div className="mb-5">
                                <TextField placeholder="email" name="email" type="text"/>
                            </div>
                            <div className="mb-5">
                                <TextField placeholder="Password" name="password" type="password"/>
                            </div>

                            <button type='submit' className="w-28 rounded py-1 px-3 border-2 border-blue-900 bg-blue-900 text-white hover:shadow-2xl cursor-pointer mt-5">
                                <PulseLoader color={"#FFFFFF"} loading={this.state.loading} size={5} />{!this.state.loading?"Sign Up":null}
                            </button>
                        </Form>   
                        </div> 
                        <ToastContainer />               
                    </div>
                )}
            </Formik>
        )
    }
}

export default SignUp
