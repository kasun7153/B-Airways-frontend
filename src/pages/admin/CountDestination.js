import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import history from "../../utils/history";
import { axiosGetInstance } from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";

class CountDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        startDate: "",
        endDate: "",
        destination: "",
      },
      count: "",
      countState: false,
      loading: false,
    };
  }
  setValues = (type, e) => {
    if (type === "startDate") {
      this.setState({ flightId: e.target.value });
    } else if (type === "endDate") {
      this.setState({ endDate: e.target.value });
    } else if (type === "destination") {
      this.setState({ destination: e.target.value });
    }
  };

  getPassengersDetails = () => {
    this.setState({ loading: true });
    console.log(this.state.flightId);
    axiosGetInstance()
      .post(`/passdescount`, this.state.formdata)
      .then((result) => {
        this.setState({ loading: false });
        this.setState({ count: result.data.data });
        this.setState({ countState: true });
        console.log(result.data.data);
      })
      .catch((err) => {
        console.log("Error getting count");
      });
  };

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="relative flex flex-col h-full">
          <Nav page={"CountDestination"}></Nav>

          <div
            className="flex flex-wrap content-center justify-center "
            style={{ height: "50vh" }}
          >
            <div className="text-center w-90 border-2 p-10 rounded ">
              <input
                onChange={(e) => this.setValues("startDate", e)}
                value={this.state.startDate}
                className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                placeholder="Enter Start Date"
                type="text"
              ></input>
              <input
                onChange={(e) => this.setValues("endDate", e)}
                value={this.state.endDate}
                className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                placeholder="Enter End Date"
                type="text"
              ></input>

              <input
                onChange={(e) => this.setValues("destination", e)}
                value={this.state.destination}
                className="w-full py-1   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                placeholder="Enter Destination"
                type="text"
              ></input>

              <div className="flex justify-between">
                <div></div>

                <div
                  onClick={this.getPassengersDetails}
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
        </div>
      </div>
    );
  }
}

export default CountDestination;
