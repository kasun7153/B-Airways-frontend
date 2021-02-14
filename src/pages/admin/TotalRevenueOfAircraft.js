import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import { axiosGetInstance } from "../../axios/axios";
import Table from "../table/Table";


class TotalRevenueOfAircraft extends Component{
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            errorExists: false,
            aircraftId: null,
            loading: false,
            totalRevenue: null,
            totalRevenueLoaded:false
        }
    
    }

    setValues = (type, e) => {
        if (type === "aircraftId") {
            this.setState({ aircraftId: e.target.value });
        } 
    }

    getTotalRevenue = () => {
        if (this.handleValidation()) {
            this.setState({ loading: true });
            alert("Successfuly Submitted");

            axiosGetInstance()
                .get(`admin/totalrevenue/${this.state.aircraftId}`)
                .then((result) => {
                    this.setState({ loading: false });
                    this.setState({ errorExists: false });                   
                    this.setState({ totalRevenue: result.data.data[0].total_revenue });
                    if (this.state.totalRevenue === null) {
                        let errors = {};
                        errors["aircraftId"] = "Invaid Aircraft ID";
                        this.setState({ errorExists: true })
                        this.setState({ errors: errors });
                    } else (this.setState({ totalRevenueLoaded: true }));
                    console.log(this.state.errors)
                    
                })
                .catch((err) => {                         
                    console.log("Error getting total revenue")                    
                })         

        
        }
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;
        
        if (!this.state.aircraftId) {
            formIsValid = false;
            errors["aircraftId"] = "Aircraft Id cannot be empty!";
        }
        this.setState({errorExists:true})
        this.setState({ errors: errors });
        return formIsValid;
    }

    render() {
        return (
            <div style={{ overflow: "hidden" }}>
                <Nav page={"TotalRevenueOfAircraft"}></Nav>
                <div className="relative flex flex-col h-full">
                    <div
                        className="flex flex-wrap content-center justify-center "
                        style={{ height: "35vh" }}
                    >
                        <div className="text-center w-90 border-2 p-10 rounded ">
                            <div className="flex justify-between">
                                <input
                                    onChange={(e) => this.setValues("aircraftId", e)}
                                    value={this.state.aircraftId}
                                    className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-10"
                                    placeholder="Enter Aircraft ID"
                                    type="text"
                                    style={{ width: "204px" }}
                                >                                 
                                </input>
                                <div className="px-5"></div>
                                <div
                                    onClick={this.getTotalRevenue}
                                    className="w-full py-1  rounded inline-block border-2 bg-blue-900   border-blue-900 mb-5 px-1 text-white hover:shadow-2xl cursor-pointer"
                                >
                                    <PulseLoader
                                        color={"#FFFFFF"}
                                        loading={this.state.loading}
                                        size={5}
                                    />
                                    {!this.state.loading ? "SUBMIT" : null}
                                </div>
                            </div>
                            {this.state.errorExists ?
                                (
                                    <span style={{ color: "red" }}>
                                        {this.state.errors["aircraftId"]}
                                    </span>
                                ) : (this.state.totalRevenueLoaded ?(
                                    <div class="box border-2 border-blue-900 w-100% h-12 py-2" >
                                        <p class="font-mono">Total Revenue : LKR {this.state.totalRevenue}</p>
                                    </div>):null)                             
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TotalRevenueOfAircraft;