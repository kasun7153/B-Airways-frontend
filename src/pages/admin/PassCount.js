import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import history from "../../utils/history";
import { axiosGetInstance } from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Table from "../table/Table";

class PassCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      formdata: {
        start_date: "",
        end_date: "",
      },
      count: "",
      countState: false,
      loading: false,
      RegPassDetails: null,
      columns: [
        {
          Header: "Package Name",
          accessor: "package_name",
        },

        {
          Header: "Num of Passengers",
          accessor: "num_of_passengers",
        },
      ],
    };
  }

  
  handleValidation() {
    let errors = {};
   let formIsValid = true;

  
   if (!this.state.formdata.start_date) {
     formIsValid = false;
     errors["start_date"] = "'Start Date' cannot be empty !";
   }

   if (!this.state.formdata.end_date) {
    formIsValid = false;
    errors["end_date"] = "'End Date' cannot be empty !";
    }
   
    if (this.state.formdata.end_date<=this.state.formdata.start_date &&  formIsValid) {
      formIsValid = false;
      errors["date_range"] = "'Start Date' should be less than 'End Date' !";
    }
   this.setState({ errors: errors });
   return formIsValid;
 }

  setValues = (type, e) => {
    if (type === "start_date") {
      console.log(e.target.value);
      this.setState({
        formdata: { ...this.state.formdata, start_date: e.target.value },
      });
    } else if (type === "end_date") {
      this.setState({
        formdata: { ...this.state.formdata, end_date: e.target.value },
      });
    }
    
    //console.log(this.state.formdata);
  };

  getPassengersCount = () => {
    if (this.handleValidation()) {

        this.state.RegPassDetails = [];
     
      this.setState({ loading: true });
      alert("Successfuly Submitted");

    axiosGetInstance()
      .post(`admin/guest`, this.state.formdata)
      .then((result) => {
        this.setState({ loading: false });
        this.setState({ count: result.data.data.guest_count });
        this.setState({ countState: true });
      })
      .catch((err) => {
        console.log("Error getting count");
      });


      axiosGetInstance()
        .post(`admin/register`, this.state.formdata)
        .then((result) => {
          this.setState({ loading: false });
          this.setState({ RegPassDetails: result.data.data });
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
        <div className="relative flex flex-col h-full">
          <Nav page={"PassCount"}></Nav>

          <div
            className="flex flex-wrap content-center justify-center "
            style={{ height: "70vh" }}
          >
            <div className=" border-2 p-10 rounded ">
              <form className="z-10 flex sticky top-0 w-full justify-between py-1  px-2">
                <div className="z-10 flex sticky top-0 w-full   text-blue-900  justify-between py-1  px-2">
                  {" "}
                  <label
                    style={{
                      fontSize: 15,
                      fontWeight: "bold"
                    }}
                  >
                    SELECT START  DATE{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("start_date", e)}
                  value={this.state.startDate}
                  className="w-full    rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  type="date"
                ></input>


              </form>
             < div  className="text-center"> <span style={{ color: "red" }}>
                {this.state.errors["start_date"]}
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
                    SELECT END  DATE{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("end_date", e)}
                  value={this.state.end_date}
                  className="w-full    rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  type="date"
                ></input>
              </form>
              < div  className="text-center"> <span style={{ color: "red" }}>
                {this.state.errors["end_date"]}
              </span></div><br/>
             

             

              <div className="flex justify-center">
                <div
                  onClick={this.getPassengersCount}
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
                {this.state.errors["date_range"]}
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
                  Number of Guest Passengers : {this.state.count}{" "}
                </h1>
              </div>
            </div>
          ) : null}


        {this.state.RegPassDetails == null  ? null : (
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
              Count of Registered passengers 
            </div>
            <div style={{ overflow: "auto"}}>
              <div className="flex flex-wrap content-center rounded py-1 px-3 text-blue-900 item-center">
                <Table
                  data={this.state.RegPassDetails}
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

export default PassCount;
