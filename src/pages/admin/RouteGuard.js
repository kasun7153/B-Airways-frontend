import React from 'react'
import history from "../../utils/history";

function RouteGuard() {

    if(localStorage.getItem("type")!="Admin"){
        
        history.push("/")
    }
    return(
        <div></div>
    )
}

export default RouteGuard
