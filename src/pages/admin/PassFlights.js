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
      loading: false,
      FlightDetails: null,
      AirDetails: null,
      PassDetails: null,
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
      aircolumns: [
        {
          Header: "Airport ID",
          accessor: "airport_id",
        },

        {
          Header: "Country",
          accessor: "country",
        },
        {
          Header: "State",
          accessor: "state",
        },
        {
          Header: "City",
          accessor: "city",
        },
      ],
      passcolumns: [
        {
          Header: "Flight ID",
          accessor: "flight_id",
        },

        {
          Header: "Passenger Count",
          accessor: "pass_count",
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
    
    if (
      this.state.formdata.destination == this.state.formdata.origin &&
      formIsValid
    ) {
      formIsValid = false;
      errors["destination_range"] = "'Origin' and 'Destination' can't be same !";
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
        this.state.AirDetails = [];
        this.state.PassDetails = [];
     
      this.setState({ loading: true });
      alert("Successfuly Submitted");

    axiosGetInstance()
      .post(`admin/passcount`, this.state.formdata)
      .then((result) => {
        this.setState({ loading: false });
        this.setState({ PassDetails: result.data.data });
      })
      .catch((err) => {
        console.log("Error getting passenger details");
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

        axiosGetInstance()
        .post(`admin/airport`, this.state.formdata)
        .then((result) => {
          this.setState({ loading: false });
          this.setState({ AirDetails: result.data.data });
        })
        .catch((err) => {
          console.log("Error getting airport details");
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
                  <option value="cgk">CGK</option>
                  <option value="del">DEL</option>
                  <option value="dmk">DMK</option>
                  <option value="dps">DPS</option>                  
                  <option value="hir">HIR</option>
                  <option value="maa">MAA</option>
                  <option value="sin">SIN</option>
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
                  <option value="cgk">CGK</option>
                  <option value="del">DEL</option>
                  <option value="dmk">DMK</option>
                  <option value="dps">DPS</option>                  
                  <option value="hir">HIR</option>
                  <option value="maa">MAA</option>
                  <option value="sin">SIN</option>
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
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["destination_range"]}
                </span>
              </div>
              <br />
            </div>
          </div>




          {this.state.PassDetails == null ? null : (
            <>
              <div
                className="content-center rounded  px-3 text-blue-900 "
                style={{
                  textAlign: "center",
                  fontSize: 28,
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                <br />
                Number of Passengers in Each Past Flights
              </div>
              <br /> <br />
              <div className="flex flex-wrap content-center justify-center">
                <div style={{ overflow: "auto" }}>
                  <div className="flex flex-wrap content-center rounded py-1 px-3 text-blue-900 item-center">
                    <Table
                      data={this.state.PassDetails}
                      columns={this.state.passcolumns}
                    />
                  </div>
                </div>{" "}
              </div>
              <br /> <br />
            </>
          )}


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
              All Past Flights Details
            </div>
            <div style={{ overflow: "auto" }}>
              <div className="flex flex-wrap content-center rounded py-1 px-3 text-blue-900 item-center">
                <Table
                  data={this.state.FlightDetails}
                  columns={this.state.columns}
                />
              </div>
              </div>{" "}
              <br/> <br/>
          </>
        )}

        {this.state.AirDetails == null ? null : (
            <>
              <div
                className="content-center rounded  px-3 text-blue-900 "
                style={{
                  textAlign: "center",
                  fontSize: 28,
                  fontFamily: "serif",
                  fontWeight: "bold",
                }}
              >
                <br />
                State Details of Origin and Destination
              </div>
              <br /> <br />
              <div className="flex flex-wrap content-center justify-center">
                <div style={{ overflow: "auto" }}>
                  <div className="flex flex-wrap content-center rounded py-1 px-3 text-blue-900 item-center">
                    <Table
                      data={this.state.AirDetails}
                      columns={this.state.aircolumns}
                    />
                  </div>
                </div>{" "}
              </div>
              <br /> <br />
            </>
          )}

        </div>
      </div>
    );
  }
}

export default PassFlights;
