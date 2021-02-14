import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import history from "../../utils/history";
import { axiosGetInstance } from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Table from "../table/Table";

class PassFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      formdata: {
        origin: "",
        destination: "",
      },
      count: "",
      countState: false,
      loading: false,
      FlightDetails: null,
      columns: [
        {
          Header: "Route Id",
          accessor: "route_id",
        },

        {
          Header: "Flight Id",
          accessor: "flight_id",
        },

        {
            Header: "Aircraft Id",
            accessor: "aircraft_id",
          },
          {
            Header: "Date",
            accessor: "date",
          },

          {
            Header: "Start Time",
            accessor: "start_time",
          },
          {
            Header: "End Time",
            accessor: "end_time",
          },
          {
            Header: "Origin",
            accessor: "origin",
          },
          {
            Header: "Destination",
            accessor: "destination",
          },
      ],
    };
  }

  
  handleValidation() {
    let errors = {};
   let formIsValid = true;

  
   if (!this.state.formdata.origin) {
    formIsValid = false;
    errors["origin"] = "'Origin' cannot be empty !";
  }


  if (!this.state.formdata.destination) {
    formIsValid = false;
    errors["destination"] = "'Destination' cannot be empty !";
  }
   
    
   this.setState({ errors: errors });
   return formIsValid;
 }

  setValues = (type, e) => {
    if (type === "origin") {
        this.setState({
          formdata: { ...this.state.formdata, origin: e.target.value },
        });
        //console.log(e.target.value);
      }

      else if (type === "destination") {
        this.setState({
          formdata: { ...this.state.formdata, destination: e.target.value },
        });
      }

      
  };

  getPassFlights = () => {
    if (this.handleValidation()) {

        this.state.FlightDetails = [];
     
      this.setState({ loading: true });
      alert("Successfuly Submitted");

    axiosGetInstance()
      .post(`admin/passcount`, this.state.formdata)
      .then((result) => {
        this.setState({ loading: false });
        
        this.setState({ count: result.data.data.pass_count });
        //console.log(result.data.data.pass_count);
        this.setState({ countState: true });
      })
      .catch((err) => {
        console.log("Error getting count");
      });


      axiosGetInstance()
        .post(`admin/passflights`, this.state.formdata)
        .then((result) => {
          this.setState({ loading: false });
          this.setState({ FlightDetails: result.data.data });
        })
        .catch((err) => {
          console.log("Error getting flight details");
        });




    } else {

      // alert("Error getting passengers details");
    }

  };

  render() {
    
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="relative flex flex-col h-full">
          <Nav page={"PassFlights"}></Nav>

          <div
            className="flex flex-wrap content-center justify-center "
            style={{ height: "70vh" }}
          >
            <div className=" border-2 p-10 rounded ">
            <form className="z-10 flex sticky top-0 w-full justify-between py-1  px-2">
                <div className="z-10 flex sticky top-0 w-full text-blue-900 justify-between py-1  px-2">
                  {" "}
                  <label
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    SELECT ORIGIN{" "}
                  </label>
                </div>
                <select
                  value={this.state.origin}
                  onChange={(e) => this.setValues("origin", e)}
                  className="w-full   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                >
                   <option  value="">origin </option>
                   <option value="bom">BOM </option>
                  <option value="bia">BIA</option>
                  <option value="bkk">BKK</option>
                </select>
              </form>
              < div  className="text-center"> <span style={{ color: "red" }}>
                {this.state.errors["origin"]}
              </span></div><br/>
             

              <form className="z-10 flex sticky top-0 w-full justify-between py-1  px-2">
                <div className="z-10 flex sticky top-0 w-full text-blue-900 justify-between py-1  px-2">
                  {" "}
                  <label
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    SELECT DESTINATION{" "}
                  </label>
                </div>
                <select
                  value={this.state.destination}
                  onChange={(e) => this.setValues("destination", e)}
                  className="w-full   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                >
                   <option  value="">destination </option>
                   <option value="bom">BOM </option>
                  <option value="bia">BIA</option>
                  <option value="bkk">BKK</option>
                </select>
              </form>
              < div  className="text-center"> <span style={{ color: "red" }}>
                {this.state.errors["destination"]}
              </span></div><br/>

             

              <div className="flex justify-center">
                <div
                  onClick={this.getPassFlights}
                  className="flex rounded py-1 px-8 border-2 border-blue-900 bg-blue-900 text-white hover:shadow-2xl cursor-pointer"
                >
                  <PulseLoader
                    color={"#FFFFFF"}
                    loading={this.state.loading}
                    size={5}
                  />
                  {!this.state.loading ? "SUBMIT" : null}
                </div>
                
              </div>
              < div  className="text-center"> <span style={{ color: "red" }}>
               
              </span></div><br/>
            </div>
          </div>




          {this.state.countState ? (
            <div
              className="flex flex-wrap content-center justify-center "
              style={{ height: "30vh" }}
            >
              <div className="text-center w-90 border-2 p-10 rounded ">
                <h1
                  className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  type="text"
                >
                  Number of Passengers : {this.state.count}{" "}
                </h1>
              </div>
            </div>
          ) : null}


        {this.state.FlightDetails == null  ? null : (
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
              All Pass Flights
            </div>
            <div style={{ overflow: "auto" }}>
              <div className="flex flex-wrap content-center rounded py-1 px-3 text-blue-900 item-center">
                <Table
                  data={this.state.FlightDetails}
                  columns={this.state.columns}
                />
              </div>
            </div>{" "}
          </>
        )}



        </div>
      </div>
    );
  }
}

export default PassFlights;
