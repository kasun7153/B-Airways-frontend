import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import { axiosGetInstance } from "../../axios/axios";

class CreateFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
        errors: {},
        Status: "",
      formdata: {
        date: "",
        aircraft_id: "",
        start_time: "",
        end_time: "",
        route_id: "",
      },
      loading: false,
    };
  }

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.formdata.date) {
      formIsValid = false;
      errors["date"] = "'Date' cannot be empty !";
    }

    if (!this.state.formdata.start_time) {
      formIsValid = false;
      errors["start_time"] = "'Start Time' cannot be empty !";
    }

    if (!this.state.formdata.end_time) {
      formIsValid = false;
      errors["end_time"] = "'End Time' cannot be empty !";
    }

    if (!this.state.formdata.route_id) {
      formIsValid = false;
      errors["route_id"] = "'Route Id' cannot be empty !";
    }
    if (!this.state.formdata.aircraft_id) {
        formIsValid = false;
        errors["aircraft_id"] = "'Aircraft Id' cannot be empty !";
      }
    this.setState({ errors: errors });
    return formIsValid;
  }

  setValues = (type, e) => {
    if (type === "date") {
      this.setState({
        formdata: { ...this.state.formdata, date: e.target.value },
      });
     
    } else if (type === "start_time") {
      this.setState({
        formdata: { ...this.state.formdata, start_time: e.target.value },
      });
    } else if (type === "end_time") {
      this.setState({
        formdata: { ...this.state.formdata, end_time: e.target.value },
      });
    } else if (type === "aircraft_id") {
      this.setState({
        formdata: { ...this.state.formdata, aircraft_id: e.target.value },
      });
      }
      else if (type === "route_id") {
        this.setState({
          formdata: { ...this.state.formdata, route_id: e.target.value },
        });
      }
  };

  createFlight = () => {
    if (this.handleValidation()) {
      this.setState({ loading: true });

      axiosGetInstance()
        .post(`admin/createflight`, this.state.formdata)
        .then((result) => {
            this.setState({ loading: false });
            this.setState({ Status: result.data.data.Status });
            if (this.Status == "1") {
                alert("Successfuly Created");
            }
            else {
                alert("Can't Create, Please check again input data.");
            }
         

          
        })
        .catch((err) => {
          console.log("Error creating flight");
        });
    } 
  };

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="relative flex flex-col h-full">
          <Nav page={""}></Nav>

          <div
            className="flex flex-wrap content-center justify-center "
            style={{ height: "90vh" }}
                >
                    
               
                    <div className="z-10 flex sticky top-0 w-full text-blue-900 justify-center py-1  px-2" style={{
                textAlign: "center",
                fontSize: 30,
                fontFamily: "serif",
                fontWeight: "bold",
              }}>

                    <h1>Creating  New Flight</h1>
                    
                        <br />
                        <br/></div>

                  
                   

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
                    ENTER AIRCRAFT ID{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("aircraft_id", e)}
                  value={this.state.flight_id}
                  className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  placeholder="Enter Aircraft Id"
                  type="text"
                ></input>
              </form>
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["aircraft_id"]}
                </span>
              </div>
                        <br />
                        
                        
              <form className="z-10 flex sticky top-0 w-full justify-between py-1  px-2">
                <div className="z-10 flex sticky top-0 w-full text-blue-900 justify-between py-1  px-2">
                  {" "}
                  <label
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    ENTER ROUTE ID{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("route_id", e)}
                  value={this.state.route_id}
                  className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  placeholder="Enter Route Id"
                  type="text"
                ></input>
              </form>
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["route_id"]}
                </span>
              </div>
              <br />
              <form className="z-10 flex sticky top-0 w-full justify-between py-1  px-2">
                <div className="z-10 flex sticky top-0 w-full  text-blue-900  justify-between py-1  px-2">
                  {" "}
                  <label
                    style={{
                      fontSize: 15,

                      fontWeight: "bold",
                    }}
                  >
                    SELECT DATE{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("date", e)}
                  value={this.state.date}
                  className="w-full   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  type="date"
                ></input>
              </form>
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["date"]}
                </span>
              </div>
              <br />

              <form className="z-10 flex sticky top-0 w-full justify-between py-1  px-2">
                <div className="z-10 flex sticky top-0 w-full text-blue-900 justify-between py-1  px-2">
                  {" "}
                  <label
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    ENTER START TIME{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("start_time", e)}
                  value={this.state.start_time}
                  className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  //placeholder="HH:mm:ss"
                  type="time"
                ></input>
              </form>
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["start_time"]}
                </span>
              </div>
              <br />

              <form className="z-10 flex sticky top-0 w-full justify-between py-1  px-2">
                <div className="z-10 flex sticky top-0 w-full text-blue-900 justify-between py-1  px-2">
                  {" "}
                  <label
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    ENTER END TIME{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("end_time", e)}
                  value={this.state.end_time}
                  className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  //placeholder="HH:mm:ss"
                  type="time"
                ></input>
              </form>
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["end_time"]}
                </span>
              </div>
              <br />

              <div className="flex justify-center">
                <div
                  onClick={this.createFlight}
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
                <span style={{ color: "red" }}></span>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateFlight;
