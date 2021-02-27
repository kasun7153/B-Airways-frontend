import React, { Component } from 'react'
import {axiosGetInstance} from "../../axios/axios"
import moment from 'moment';
import PulseLoader from "react-spinners/PulseLoader";
import {BsPersonFill } from 'react-icons/bs';
import {MdEmail } from 'react-icons/md';
import {ImMobile } from 'react-icons/im';
import {BiWorld } from 'react-icons/bi';
import {FaPassport } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {MdToday } from 'react-icons/md';
import history from "../../utils/history";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import DeleteAccountModal from './DeleteAccountModal';

class profile extends Component {
    constructor(props){
        super(props)
        this.state={
            isOpen:false,
            loading:true
        }
    }

    date(date){
        return <div>{moment(date).utc().format('DD-MM-YYYY')}</div>
    }

    arrayBufferToBase64=(buffer)=> {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount(){
        axiosGetInstance().get("user/profile").then(res=>{
            if(res.data.data.user_photo){
                var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(res.data.data.user_photo.data);
            this.setState({img: base64Flag + imageStr})
            }
            this.setState({userProfile:res.data.data,loading:false})
            
        }).catch(err=>{
            console.log(err)
        })
    }

    componentDidUpdate(){
        if(this.props.user){
            if(localStorage.getItem("type")==="Admin"){
                history.push("/")
            }
    }  
    }

    deleteAccount=()=>{
        this.setState({isOpen:true})
    }

    render() {
        const customStyles = {
            content : {
              
              top                   : '55%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            }
          };
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
                            <img className="object-cover inline rounded-full h-48 w-48 border-black-500 border-2" alt="profile Pic" src={this.state.img||"https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image-715x657.png"} />
                        </div>

                        <div className="mt-7">
                            <div className="p-2 rounded text-center text-3xl text-yellow-500">
                                {this.state.userProfile.package_name}
                            </div> 
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <BsPersonFill size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                                {this.state.userProfile.name}
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <MdEmail size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                                {this.state.userProfile.email}
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <ImMobile size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                                {this.state.userProfile.contact_no}
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <BiWorld size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                                {this.state.userProfile.country}
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <MdToday size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                                {this.date(this.state.userProfile.birthday)}
                            </div>  
                        </div>

                        <div className="flex mt-7">
                            <div className="flex flex-wrap w-14 text-center justify-center content-center">
                                <FaPassport size="35"/>
                            </div>

                            <div className="flex text-xl flex-wrap align-middle content-center">
                                {this.state.userProfile.passport_no}
                            </div>  
                        </div>

                        <div className="mt-10 flex">
                            <div className="p-2 cursor-pointer rounded text-center text-2xl text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                                <Link to="/user/changePassword">
                                    Change Password
                                </Link>
                            </div> 

                            <div className="ml-4 p-2 cursor-pointer rounded text-center text-2xl text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                                <Link to="/user/editProfile">
                                    Edit Profile
                                </Link>
                            </div> 
                        </div>

                        <div className="mt-10 flex">
                            <div onClick={this.deleteAccount} className="w-full p-2 cursor-pointer rounded text-center text-2xl text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white">
                                    Delete Account    
                            </div> 
                        </div>

                    </div>
                </div>
                </div>
                }
                <Modal ariaHideApp={false} onRequestClose={()=>this.setState({isOpen:false})} isOpen={this.state.isOpen} style={customStyles}>

                <DeleteAccountModal/>
            </Modal>
                <ToastContainer />
            </div>
        )
    }
}

export default profile

