import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import history from "../../utils/history";
import { axiosGetInstance } from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Table from "../table/Table";

class Delay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      formdata: {
        date: "",
        start_time: "",
        end_time: "",
        flight_id: "",
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

  if (!this.state.formdata.flight_id) {
    formIsValid = false;
    errors["flight_id"] = "'Flight Id' cannot be empty !";
  }
   
    
   this.setState({ errors: errors });
   return formIsValid;
 }

  setValues = (type, e) => {
    if (type === "date") {
        this.setState({
          formdata: { ...this.state.formdata, date: e.target.value },
        });
        //console.log(e.target.value);
      }

      else if (type === "start_time") {
        this.setState({
          formdata: { ...this.state.formdata, start_time: e.target.value },
        });
      }

      else if (type === "end_time") {
        this.setState({
          formdata: { ...this.state.formdata, end_time: e.target.value },
        });
      }

      else if (type === "flight_id") {
        this.setState({
          formdata: { ...this.state.formdata, flight_id: e.target.value },
        });
      }

      
  };

  updateDelays = () => {
    if (this.handleValidation()) {

     
      this.setState({ loading: true });
      

    axiosGetInstance()
      .post(`admin/delay`, this.state.formdata)
      .then((result) => {
        this.setState({ loading: false });
        alert("Successfuly Updated");
        
        //console.log(result.data.data.pass_count);
        
      })
      .catch((err) => {
        console.log("Error updating delays");
      });




    } else {

      // alert("Error getting passengers details");
    }

  };

  render() {
    
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="relative flex flex-col h-full">
          <Nav page={"Delays"}></Nav>

          <div
            className="flex flex-wrap content-center justify-center "
            style={{ height: "90vh" }}
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
                    ENTER FLIGHT ID{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("flight_id", e)}
                  value={this.state.flight_id}
                  className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  placeholder="Enter Flight Id"
                  type="text"
                ></input>
              </form>
              < div  className="text-center"> <span style={{ color: "red" }}>
                {this.state.errors["flight_id"]}
              </span></div><br/>
             

              <form className="z-10 flex sticky top-0 w-full justify-between py-1  px-2">
                <div className="z-10 flex sticky top-0 w-full  text-blue-900  justify-between py-1  px-2">
                  {" "}
                  <label
                    style={{
                      fontSize: 15,

                      fontWeight: "bold",
                    }}
                  >
                    SELECT  DATE{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("date", e)}
                  value={this.state.date}
                  className="w-full   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  type="date"
                ></input>
              </form>
              < div  className="text-center"> <span style={{ color: "red" }}>
                {this.state.errors["date"]}
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
              < div  className="text-center"> <span style={{ color: "red" }}>
                {this.state.errors["start_time"]}
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
              < div  className="text-center"> <span style={{ color: "red" }}>
                {this.state.errors["end_time"]}
              </span></div><br/>
              

             

              <div className="flex justify-center">
                <div
                  onClick={this.updateDelays}
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



        </div>
      </div>
    );
  }
}

export default Delay;
