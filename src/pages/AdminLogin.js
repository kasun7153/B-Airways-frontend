import React, { Component } from 'react'
import history from "../utils/history";
import {axiosGetInstance} from "../axios/axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import { RiAdminLine } from 'react-icons/ri';
import { AiOutlineUser } from 'react-icons/ai';
import {Formik,Form} from "formik"
import TextField from './TextField';
import * as Yup from 'yup';

class AdminLogin extends Component {
    

    constructor(props) {    
        super(props)
        this.state = {
             email:"",
             password:"",
             loading:false,
             selected:"Admin"
        }
        
    }
    

    login=(values)=>{
        if(this.state.selected==="User"){
            this.setState({loading:true})
        axiosGetInstance().post("/user/signin",values).then(res=>{
            this.setState({loading:false})
            if(res.data.token){
                localStorage.setItem("type","User")
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
        else{
            this.setState({loading:true})
        axiosGetInstance().post("/admin/signin",values).then(res=>{
            console.log(res)
            this.setState({loading:false})
            if(res.data.token){
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("type","Admin")
                this.props.getProfile()
                history.push("/admin/AdminHome");
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
        
    }

    setValues=(type,e)=>{
        if(type==="email"){
            this.setState({email:e.target.value})
        }else{
            this.setState({password:e.target.value})
        }
    }



    render() {

        const validate=Yup.object({
            email: Yup.string().email("Email is invalid").required('Required'),
            password:Yup.string().min(5,"Password should be more than 5 characters").max(15,"Password should be less than 15 characters").required("Required"),
            
        })

        return (
            <div className="flex flex-wrap content-center justify-center" style={{height:"90vh"}}>                
                <div className="w-2/4 text-center w-90 border-2 px-28 py-20 rounded">
                    <div className="flex mb-5 justify-center">
                        <div className={`cursor-pointer w-1/2  text-3xl ${this.state.selected==="Admin"?"font-bold border-red-400 border-b pb-3":""}`} onClick={()=>this.setState({selected:"Admin"})}>Admin</div>
                    </div>
                    {this.state.selected==="User"?
                    <>
                     <AiOutlineUser className="inline-block mt-5" size="100"/>
                     <span className="font-bold block mt-5 mb-10 text-xl">Sign in to your account</span>
                     </>:
                      <>
                      <RiAdminLine className="inline-block mt-5" size="100"/>
                      <span className="font-bold block mt-5 mb-10 text-xl">Admin Login</span>
                      </>
                    }
                    <Formik 
                        initialValues={{
                            email:"",
                            password:""
                        }}
                        validationSchema={validate}
                        onSubmit={values=>{this.login(values)}}
                    >
                {formik=>(
                
                        <Form>
                            <div className="mb-5">
                            <TextField placeholder="email" name="email" type="text"/>
                            </div>
                            <div className="mb-5">
                            <TextField placeholder="Password" name="password" type="password"/>
                            </div>
                            
                            
                            
                            <button type='submit' className="w-full rounded py-1 px-3 border-2 border-blue-900 bg-blue-900 text-white hover:shadow-2xl cursor-pointer">
                            <PulseLoader color={"#FFFFFF"} loading={this.state.loading} size={5} />{!this.state.loading?this.state.selected==="User"?"Sign in":"Admin Login":null}
                            </button>
                        </Form>   
                )}

                    </Formik>
                    
                    
                </div>
                
                <ToastContainer />
            </div>
        )
        
    }
}

export default AdminLogin
