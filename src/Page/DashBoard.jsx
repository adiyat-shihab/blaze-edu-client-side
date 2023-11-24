import { Outlet } from "react-router-dom";
import { DashboardNav } from "./Dashboard/DashboardNav.jsx";

export const DashBoard = () => {
  return (
    <>
      <div className="flex justify-between">
        {/* navigation*/}
        <div>
          <DashboardNav />
        </div>
        {/*page*/}
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
