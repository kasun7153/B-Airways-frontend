import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import history from "../../utils/history";
import { axiosGetInstance } from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";

class AgeFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightId: "",
      passDetails: "",
      loading: false,
    };
  }

  setValues = (type, e) => {
    if (type === "flightId") {
      this.setState({ flightId: e.target.value });
    } else {
    }
  };

  getPassengersDetails = () => {
    this.setState({ loading: true });
    axiosGetInstance()
      .get(`/passagedetails/${this.state.flightId}`)
      .then((result) => {
        this.setState({ loading: false });
        this.setState({ passDetails: result.data.data });
        console.log(result.data.data);
      })
      .catch((err) => {
        console.log("Error getting passengers details");
      });
  };

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="relative flex flex-col h-full">
          <Nav page={"AgeFilter"}></Nav>

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
                
                <div  className="px-5"></div>
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
            </div>

            
          </div>
        </div>
      </div>
    );
  }
}

export default AgeFilter;
