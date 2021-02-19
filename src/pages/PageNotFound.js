import React, { Component } from 'react'
import history from "../utils/history";

class PageNotFound extends Component {

    constructor(props) {    
        super(props)
        history.push("/")
        
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default PageNotFound

