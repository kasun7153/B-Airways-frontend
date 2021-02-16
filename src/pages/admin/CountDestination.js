import React, { Component } from "react";
import Nav from "./Nav";
import PulseLoader from "react-spinners/PulseLoader";
import { axiosGetInstance } from "../../axios/axios";


class CountDestination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      formdata: {
        start_date: "",
        end_date: "",
        destination: "",
      },
      count: "",
      countState: false,
      loading: false,
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
    if (!this.state.formdata.destination) {
      formIsValid = false;
      errors["destination"] = "'Destination' cannot be empty !";
    }
    if (
      this.state.formdata.end_date <= this.state.formdata.start_date &&
      formIsValid
    ) {
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
    } else if (type === "destination") {
      this.setState({
        formdata: { ...this.state.formdata, destination: e.target.value },
      });
    }
  };

  getPassengersDetails = () => {
    if (this.handleValidation()) {
      this.setState({ loading: true });
      alert("Successfuly Submitted");

      axiosGetInstance()
        .post(`admin/passdescount`, this.state.formdata)
        .then((result) => {
          this.setState({ loading: false });
          this.setState({ count: result.data.data.pass_des_count });
          this.setState({ countState: true });
        })
        .catch((err) => {
          console.log("Error getting count");
        });
    } else {
      // alert("Error getting passengers details");
    }
  };

  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="relative flex flex-col h-full">
          <Nav page={"CountDestination"}></Nav>

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
                      fontWeight: "bold",
                    }}
                  >
                    SELECT START DATE{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("start_date", e)}
                  value={this.state.startDate}
                  className="w-full    rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  type="date"
                ></input>
              </form>
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["start_date"]}
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
                    SELECT END DATE{" "}
                  </label>
                </div>
                <input
                  onChange={(e) => this.setValues("end_date", e)}
                  value={this.state.end_date}
                  className="w-full    rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                  type="date"
                ></input>
              </form>
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["end_date"]}
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
                    SELECT DESTINATION{" "}
                  </label>
                </div>
                <select
                  value={this.state.destination}
                  onChange={(e) => this.setValues("destination", e)}
                  className="w-full   rounded bg-blue-50 inline-block border-2 border-blue-900 mb-5 px-2"
                >
                  <option value="">destination </option>
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




              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["destination"]}
                </span>
              </div>
              <br />

              <div className="flex justify-center">
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
              <div className="text-center">
                {" "}
                <span style={{ color: "red" }}>
                  {this.state.errors["date_range"]}
                </span>
              </div>
              <br />
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
