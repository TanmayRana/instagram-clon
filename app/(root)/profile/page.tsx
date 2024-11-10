import React from "react";
import Profile from "../_components/Profile";
import MobileProfile from "../_components/MobileProfile";
// import MobileProfile from "../../_components/MobileProfile";
// import Profile from "../../_components/Profile";

const page = () => {
  return (
    <>
      <div className="md:w-[88%] lg:w-[88%] sm:w-full w-full min-h-screen lg:py-10 md:py-6 sm:py-4 py-4 lg:px-14 md:px-12 sm:px-7 px-2">
        {/* Profile for large screen */}
        <Profile />

        {/* Profile for small screen */}
        <MobileProfile />
      </div>
    </>
  );
};

export default page;
