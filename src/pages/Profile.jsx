import React from "react";
import { Link, Outlet } from "react-router-dom";
import MyProfile from "../components/profile/MyProfile";

const Profile = () => {
  return (
    <div>
      <div class="drawer drawer-mobile">
        <input id="profileDrawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col items-center ">
          <div className="text-left w-full">
            <label for="profileDrawer" class="btn  drawer-button lg:hidden">
              --
            </label>
          </div>
          {/* <!-- Page content here --> */}
          <Outlet />
          {/* end swap */}
        </div>
        <div class="drawer-side ">
          <label for="profileDrawer" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link to="/profile">My profile</Link>
            </li>
            <li>
              <Link to="/profile/Mycourses">My course</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
