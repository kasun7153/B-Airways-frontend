import React from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  return (
  

          <div className="z-10 flex sticky top-0  justify-between py-1 bg-gray-300 px-4">
          <div></div><div></div>
        <div className="flex">
          <Link
            to="/admin/ageFilter"
            className="flex flex-wrap content-center item-center "
          >
            <div className="flex w-55 mr-2 rounded py-1 px-3 text-blue-900  hover:text-white">
              {props.page==="AgeFilter" ? (
                <>
                  <div style={{ fontWeight: "bold" }}>
                    Passengers details according to age 18
                  </div>
                </>
              ) : (
                <div> Passengers details according to age 18</div>
              )}
            </div>
          </Link>

          <Link
            to="/admin/CountDestination"
            className="flex flex-wrap content-center item-center"
          >
            <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900   hover:text-white">
              {props.page==="CountDestination" ? (
                <>
                  <div style={{ fontWeight: "bold" }}>
                    Number of passengers with given destination
                  </div>
                </>
              ) : (
                <div> Number of passengers with given destination</div>
              )}
            </div>
              </Link>
              
        </div>

       
      </div>
    
  );
}

export default Nav;
