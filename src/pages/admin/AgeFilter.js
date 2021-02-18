import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import { axiosGetInstance } from "../../axios/axios";
import Table from "../table/Table";


class AgeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
           errors: {},
      flightId: "",
      abovePassDetails: null,
      belowPassDetails: null,

      loading: false,
      columns: [
        {
          Header: "User Id",
          accessor: "user_id",
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Email",
          accessor: "email",
        },
        {
          Header: "Birthday",
          accessor: "birthday" ,
        },
       
        {
          Header: "Country",
          accessor: "country",
        },
        {
          Header: "Age",
          accessor: "age",
        },
        {
          Header: "Contact No",
          accessor: "contact_no",
        },
        {
          Header: "Booking Id",
          accessor: "booking_id",
        },
        {
          Header: "Seat Id",
          accessor: "seat_id",
        },
        {
          Header: "Package",
          accessor: "package_name",
        },

        {
          Header: "Price",
          accessor: "price",
        },
      ],
    };
  }

  handleValidation() {
     let errors = {};
    let formIsValid = true;

    
    if (!this.state.flightId) {
      formIsValid = false;
      errors["flightId"] = "FlightId cannot be empty!";
    }

    else{
      if (!this.state.flightId.match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["flightId"] = "Only numbers should be in 'FlightId' ";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }


  setValues = (type, e) => {
    if (type === "flightId") {
      this.setState({ flightId: e.target.value });
    } else {
    }
  };

  getPassengersDetails = () => {
   
    if (this.handleValidation()) {
      
    this.state.abovePassDetails = [];
    this.state.belowPassDetails = [];
  
     
      this.setState({ loading: true });
      alert("Successfuly Submitted");


      axiosGetInstance()
        .get(`admin/passagedetails/above/${this.state.flightId}`)
        .then((result) => {
          
          this.setState({ loading: false });
          this.setState({ abovePassDetails: result.data.data });
        })
        .catch((err) => {
          console.log("Error getting passengers details");
        });
  
      axiosGetInstance()
        .get(`admin/passagedetails/below/${this.state.flightId}`)
        .then((result) => {
          
          this.setState({ loading: false });
          this.setState({ belowPassDetails: result.data.data });
        })
        .catch((err) => {
          console.log("Error getting passengers details");
        });



    } else {

      // alert("Error getting passengers details");
    }



  };

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <Nav page={"AgeFilter"}></Nav>
        <div className="relative flex flex-col h-full">
          

          <div
            className="flex flex-wrap content-center justify-center "
            style={{ height: "35vh" }}
          >
            <div className="text-center w-90 border-2 p-10 rounded ">
              <div className="flex justify-between">
                <input
                  onChange={(e) => this.setValues("flightId", e)}
                  value={this.state.flightId}
                  className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-10"
                  placeholder="Enter Flight Id"
                  type="text"
                ></input>
               

             
                <div className="px-5"></div>
                <div
                  onClick={this.getPassengersDetails}
                  
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
              <span style={{ color: "red" }}>
                {this.state.errors["flightId"]}
              </span>
            </div>
          </div>
        </div>



        {this.state.belowPassDetails == null  ? null : (
          <>
            <div
              className="content-center rounded py-1 px-3 text-blue-900 "
              style={{
                textAlign: "center",
                fontSize: 28,
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              Details of passengers below 18 years of age
            </div>
            <div style={{ overflow: "auto" }}>
              <div className="flex flex-wrap content-center rounded py-1 px-3 text-blue-900 item-center">
                <Table
                  data={this.state.belowPassDetails}
                  columns={this.state.columns}
                />
              </div>
            </div>{" "}
          </>
        )}



        
        <br /> <br />
        <br /> <br />




        {this.state.abovePassDetails == null ? null : (
          <>
            <div
              className="content-center rounded py-1 px-3 text-blue-900 "
              style={{
                textAlign: "center",
                fontSize: 28,
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              Details of passengers above 18 years of age
            </div>
            <div style={{ overflow: "auto" }}>
              <div className="flex flex-wrap content-center rounded py-1 px-3 text-blue-900 item-center">
                <Table
                  data={this.state.abovePassDetails}
                  columns={this.state.columns}
                />
              </div>
            </div>{" "}
          </>
        )}
        <br /> <br />
       
      </div>
      
    );
  }
}

export default AgeFilter;
