import React,{useEffect} from 'react'
import history from "../utils/history";


function Home(props) {


    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
          document.body.style.overflow = ""
        }
    }, [])

    useEffect(() => {       
        if(props.user){
            history.push("/schedule");
        }
    }, [props.user])

    return (
        <div style={{overflow:"hidden"}}>
            <div className="relative flex flex-col h-full">
                <div className="overflow-hidden">
                    <img alt="img" className=" h-screen object-cover w-full" src="assets/background.jpeg"/>
                </div>

                

                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                    <div  onClick={()=>{history.push("/schedule");}} style={{width:"200px",height:"50px"}} className="flex-wrap flex justify-center content-center text-white font-bold bg-blue-900 cursor-pointer rounded border-2 border-blue-900 hover:border-white p-1 hover:shadow-2xl">
                        <div>Continue as a Guest</div>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default Home
