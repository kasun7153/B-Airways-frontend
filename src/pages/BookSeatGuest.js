import React, { Component } from 'react'
import {MdEmail } from 'react-icons/md';
import {BsPersonFill } from 'react-icons/bs';
import {ImMobile } from 'react-icons/im';
import {BiWorld } from 'react-icons/bi';
import {FaPassport } from 'react-icons/fa';
import {axiosGetInstance} from "../axios/axios"
import moment from 'moment';
import {MdToday } from 'react-icons/md';
import PulseLoader from "react-spinners/PulseLoader";
import {Formik,Form} from "formik"
import TextField from './TextField';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class BookSeatGuest extends Component {

    constructor(props){
        super(props)
        this.state={
            contact_no:"",
            loading:false,
            userProfile:{
                birthday:moment(new Date()).format('YYYY-MM-DD')
            }
        }
    }

    testing=()=>{
        console.log(this.state.userProfile.birthday)
    }

    boookSeat=(values)=>{
        this.setState({loading:true})
        axiosGetInstance().post("/user/bookseat",{
            guest_data:{
                ...values,contact_no:"+"+this.state.contact_no
            },
            flight_id:this.props.flight_id,
            seat_id:this.props.selectedSeat.seatID,
            discount_price:this.props.selectedSeat.priceDetails.default_price,
            
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
        })
        return (
            <Formik 
                initialValues={{
                    name:"",
                    passport_no:"",
                    birthday:"",
                    country:"",
                    email:"",
                }}
                validationSchema={validate}
                onSubmit={values=>{this.boookSeat(values)}}
            >
                {formik=>(
                    <Form>
                        <div className="px-24 py-10">
                
                <div className="flex flex-wrap justify-center align-center">
                    <div >
                    <div className="flex mt-7 justify-center">
                            <img className="w-24 h-24" src="/assets/logo.png"></img>
                        </div>

                    <div className="flex mt-10">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <BsPersonFill size="35"/>
                            </div>

                            <div className="flex text-xl w-96 flex-wrap content-center">
                            <TextField placeholder="Full Name" name="name" type="text"/>
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <MdEmail size="35"/>
                            </div>

                            <div className="flex text-xl w-96 flex-wrap content-center">
                            <TextField placeholder="email" name="email" type="text"/>
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <ImMobile size="35"/>
                            </div>

                            <div className="w-full flex text-xl flex-wrap align-middle content-center">
                            <div className='w-full'>
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
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <BiWorld size="35"/>
                            </div>

                            <div className="flex text-xl w-96 flex-wrap content-center">
                            <TextField placeholder="Country" name="country" type="text"/>
                                
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <MdToday size="35"/>
                            </div>

                            <div className="flex text-xl w-96 flex-wrap content-center">

                            <TextField placeholder="Birthday" max={this.dateValue(new Date)} name="birthday" type="date"/>
                                
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <FaPassport size="35"/>
                            </div>

                            <div className="flex text-xl w-96 flex-wrap content-center">
                            <TextField placeholder="Passport No" name="passport_no" type="text"/>
                               
                            </div>  
                        </div>
                        {this.state.loading?
                    <div className="mt-10 text-center">
                        <PulseLoader  color={"black"} loading={this.state.loading} size={20} />
                    </div>
                    
                    :
                    <div className="px-7 mt-10 flex justify-between">
                            <div onClick={this.props.closeModel} className="p-3 cursor-pointer rounded text-center text-xl text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white">
                                
                                    Cancel
                                
                            </div> 

                            <button type="submit" className="p-3 cursor-pointer rounded text-center text-xl text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                                
                                   Make Booking
                                
                            </button> 
                        </div>
                    }
                        
                </div>
               </div>
               
            </div>
                    </Form>
                )}
            
            </Formik>
        )
    }
}

export default BookSeatGuest
