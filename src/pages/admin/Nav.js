import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  
  function selectedPage(msg, page) {
    return (
      props.page === page ? (
        <>
          <div style={{ fontWeight: "bold" }}>
            {msg}
          </div>
        </>
      ) : (
          <div>{msg}</div>
        ))  

  };

  return (
  

          <div className="z-10 flex sticky top-0  justify-between py-1 bg-gray-300 px-4">
          <div></div><div></div>
      <div className="flex">
      <Link
            to="/admin/adminHome"
            className="flex flex-wrap content-center item-center "
          >
            <div className="flex w-55 mr-2 rounded py-1 px-3 text-blue-900  hover:text-white">
            {selectedPage("Home", "AdminHome")}
            </div>
          </Link>
          <Link
            to="/admin/ageFilter"
            className="flex flex-wrap content-center item-center "
          >
            <div className="flex w-55 mr-2 rounded py-1 px-3 text-blue-900  hover:text-white">
            {selectedPage("Passengers  according to age 18", "AgeFilter")}
            </div>
          </Link>

          <Link
            to="/admin/CountDestination"
            className="flex flex-wrap content-center item-center"
          >
            <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900   hover:text-white">
            {selectedPage("Passengers with  destination","CountDestination")}
          </div>
        </Link>
        
        <Link
            to="/admin/PassCount"
            className="flex flex-wrap content-center item-center"
          >
            <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900   hover:text-white">
            {selectedPage("Number of Bookings by each passenger type with date range","PassCount")}
          </div>
        </Link>

        <Link
            to="/admin/PassFlights"
            className="flex flex-wrap content-center item-center"
          >
            <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900   hover:text-white">
            {selectedPage("Get pass flight details","PassFlights")}
            </div>
        </Link>
        
        <Link
          to="/admin/TotalRevenueOfAircraft"
          className="flex flex-wrap content-center item-center"
        >
          <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900   hover:text-white">
            {selectedPage("Total revenue of a aircraft","TotalRevenueOfAircraft")}
          </div>
        </Link>
        
        <Link
            to="/admin/delay"
            className="flex flex-wrap content-center item-center"
          >
          <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900   hover:text-white">
            {selectedPage("Updating Delays","Delays")}
              
            </div>
              </Link>
              
        </div>

       
      </div>
    
  );
}

export default Nav;
