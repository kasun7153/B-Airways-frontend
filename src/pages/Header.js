import React from 'react'
import { Link } from 'react-router-dom'
import { RiLoginCircleLine } from 'react-icons/ri';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import history from "../utils/history";

function Header(props) {

    const logOut=async ()=>{
        localStorage.clear();
        await props.getProfile();
        history.push("/")
    }

    return (
        <div className="z-10 flex sticky top-0 w-full justify-between py-1 bg-gray-200 px-4">
            <div className="w-screen">
                <div><Link to="/schedule"><img alt="img" className="w-16 h-16" src="/assets/logo.png"></img></Link></div>
            </div>
            <div className="flex">
                
                {!props.user?
                <>
                <Link to="/login" className="flex flex-wrap content-center item-center"> 
                    <div  className="cursor-pointer flex w-55 mr-2 rounded py-1 px-3 text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                            <div style={{width:"52px"}}>Sign-in</div>
                            <div className="flex content-center ml-1 text-yellow-500"><RiLoginCircleLine style={{marginTop:"5px",display:"inline"}}/></div>
                    </div>
                    
                </Link>

                <Link to="/signup" className="flex flex-wrap content-center item-center">
                    <div className="cursor-pointer flex w-50 mr-2 rounded py-1 px-3 text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                            <div>Register</div>
                            <div className="flex content-center ml-1 text-yellow-500"><AiOutlinePlusCircle style={{marginTop:"5px",display:"inline"}}/></div>
                    </div>
                </Link>
                </>
                :
             <>
               <div to="/login" className="flex flex-wrap content-center item-center"> 
                <div className=" cursor-pointer flex justify-center content-center ml-1 text-yellow-500 mr-8">
                    <Link to="/user/profile">
                        <CgProfile size="35"/>
                    </Link>
                    
                </div>
                </div>

                <div className="flex flex-wrap content-center item-center">
                    <div onClick={logOut} className="cursor-pointer flex w-50 mr-2 rounded py-1 px-3 text-blue-900 border-2 border-blue-900 hover:bg-blue-900 hover:text-white">
                            <div>LogOut</div>
                            <div className="flex content-center ml-1 text-yellow-500"><RiLoginCircleLine  style={{marginTop:"5px",display:"inline"}}/></div>
                    </div>
                </div>
                </>
                }
            </div>
        </div>
        
        
               
    )
}

export default Header
