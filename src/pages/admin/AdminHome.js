import React, { useEffect } from "react";
import history from "../../utils/history";
import Nav from "./Nav";

function AdminHome(props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (props.user) {
      history.push("/schedule");
    }
  }, [props.user]);

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="relative flex flex-col h-full">
        <Nav page={"AdminHome"}></Nav>

        <div className=" flex sticky top-0 w-full justify-between">
          <div>
            <img
              alt="img"
              className=" h-screen  w-25 px-1"
              src="/assets/background - admin.jpeg"
            />
          </div>

                  <div className="flex flex-wrap content-center justify-center">
                      
            <div
              onClick={() => {
                history.push("/admin/CreateFlight");
              }}
              style={{ width: "200px", height: "50px" }}
              className=" flex-wrap flex justify-center  text-white font-bold bg-blue-900 cursor-pointer rounded border-2 border-blue-900 hover:border-white p-1 hover:shadow-2xl"
            >
              <div>Create New Flight</div>
            </div>
                  </div>
                  
                  <div></div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
