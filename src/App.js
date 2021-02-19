import Login from "./pages/Login";
import "./App.css";
import { Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Schedule from "./pages/Schedule";
import Header from "./pages/Header";
import FlightDetails from "./pages/FlightDetails";
import history from "./utils/history";
import React, { Component } from 'react'
import {axiosGetInstance} from "./axios/axios"
import AgeFilter from "./pages/admin/AgeFilter";
import PassCount from "./pages/admin/PassCount";
import Delay from "./pages/admin/delay";
import CreateFlight from "./pages/admin/CreateFlight";

import AdminHome from "./pages/admin/AdminHome";

import PassFlights from "./pages/admin/PassFlights";
import CountDestination from "./pages/admin/CountDestination";
import TotalRevenueOfAircraft from "./pages/admin/TotalRevenueOfAircraft";
import Profile from "./pages/user/Profile";
import EditProfile from "./pages/user/EditProfile";
import ChangePassword from "./pages/user/ChangePassword";
import RouteGuard from "./pages/admin/RouteGuard";
import AdminLogin from "./pages/AdminLogin";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    return new Promise((resolve, reject) => {
      axiosGetInstance()
        .get("user/profile")
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            this.setState({ user: res.data.data });
            resolve(res.data.data);
          } else {
            this.setState({ user: null });
            resolve(null);
          }
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  };

  render() {
    return (
      <div>
        <Router history={history}>
          <Header getProfile={this.getProfile} user={this.state.user}></Header>

          <Route exact path="/">
            <Home user={this.state.user} />
          </Route>

          <Route exact path="/login">
            <Login getProfile={this.getProfile} />
          </Route>

          <Route exact path="/signup" component={SignUp}></Route>

          <Route exact path="/schedule">
            <Schedule user={this.state.user} />
          </Route>

          <Route
            exact
            path="/schedule/:flight_id"
            component={(match) => (
              <FlightDetails {...match} user={this.state.user} />
            )}
          />

        
        
        <Route exact path="/user/profile">
            <Profile user={this.state.user}/> </Route>

            <Route exact path="/user/editProfile">
            <EditProfile user={this.state.user}/> </Route>

            <Route exact path="/user/changePassword">
            <ChangePassword user={this.state.user}/> </Route>
        
            <Route exact path="/admin-login">
            <AdminLogin getProfile={this.getProfile}/> </Route>

            <Route path="/admin">
            <RouteGuard /> </Route>

        <Route exact path="/admin/ageFilter">
            <AgeFilter /> </Route>
          
            <Route exact path="/admin/CountDestination">
            <CountDestination /> </Route>
          

            <Route exact path="/admin/AdminHome">
            <AdminHome /> </Route>

            <Route exact path="/admin/PassCount">
            <PassCount /> </Route>
            <Route exact path="/admin/createFlight">
            <CreateFlight /> </Route>

            <Route exact path="/admin/PassFlights">
            <PassFlights /> </Route>
          
            <Route exact path="/admin/TotalRevenueOfAircraft">
            <TotalRevenueOfAircraft /> </Route>

            <Route exact path="/admin/delay">
            <Delay /> </Route>

           

      </Router>

       

     
      </div>
    );
  }
}

export default App;
