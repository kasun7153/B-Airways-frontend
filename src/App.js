import Login from "./pages/Login"
import './App.css';
import { Router, Route} from "react-router-dom";
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
import PassFlights from "./pages/admin/PassFlights";
import CountDestination from "./pages/admin/CountDestination";

class App extends Component{

  constructor(props) {    
    super(props)
    this.state = {
         user:null
    }
  }

  componentDidMount(){
    this.getProfile()
  }

  getProfile=()=>{
    return new Promise((resolve,reject)=>{
      axiosGetInstance().get("user/profile").then(res=>{
        if(res.data.success){
            this.setState({user:res.data.data})
            resolve(res.data.data)
        }
        else{
         this.setState({user:null})
         resolve(null)
        }
    }).catch(err=>{
        reject(err)
        console.log(err)
    })
    })
  }

  render(){
    return(
    <div>
      <Router history={history}>

        <Header getProfile={this.getProfile} user={this.state.user}></Header>

        <Route exact path="/">
          <Home user={this.state.user}/>
        </Route>

        <Route exact path="/login">
          <Login getProfile={this.getProfile}/>
        </Route>

        <Route exact component={SignUp} path="/signup"></Route>

        <Route exact path="/schedule">
          <Schedule user={this.state.user}/>
        </Route>

        <Route exact path="/schedule/:flight_id" component={(match)=><FlightDetails {...match} user={this.state.user}/>}/>
        <Route exact path="/admin/ageFilter">
            <AgeFilter /> </Route>
          
            <Route exact path="/admin/CountDestination">
            <CountDestination/> </Route>

            <Route exact path="/admin/PassCount">
            <PassCount /> </Route>

            <Route exact path="/admin/PassFlights">
            <PassFlights /> </Route>

      </Router>

    </div>
  )}

}

export default App;
