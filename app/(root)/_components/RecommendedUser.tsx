import React from "react";
// import ProfileNav from "./ProfileNav";
import Link from "next/link";
// import recommendUserData from "./Data/RecommendUserData";
import Image from "next/image";
import ProfileNav from "./ProfileNav";
import recommendUserData from "./Data/recommendUserData";

const RecommendedUser = () => {
  return (
    <>
      <div className="w-full h-auto py-3">
        {/* Profile Navigation */}
        <ProfileNav />
        {/* Suggested User */}
        <div className="w-full h-auto my-8">
          <div className="w-full h-auto flex items-center justify-between mb-4">
            <h6 className="text-sm text-gray-400 font-medium">
              Suggested for you
            </h6>
            <Link
              href="/"
              className="text-xs font-semibold text-gray-300 hover:text-gray-600"
            >
              See All
            </Link>
          </div>
          {/* All user */}
          {recommendUserData.map((user) => (
            <div
              className="w-full h-auto flex items-center justify-between mb-4"
              key={user.id}
            >
              <Link
                href="/profile"
                className="w-full h-auto flex items-center gap-x-2"
              >
                <Image
                  src={user.profileImg}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover"
                  width={100}
                  height={100}
                />
                <div className="flex items-start gap-y-0 flex-col">
                  <p className="text-[0.9rem] text-white font-medium mb-0">
                    {user.username}
                  </p>
                  <h6 className="text-xs text-gray-500 font-normal">
                    Siggested for you
                  </h6>
                </div>
              </Link>
              <Link
                href="/"
                className="text-[0.855rem] text-blue-500 hover:text-gray-200"
              >
                {user.follow}
              </Link>
            </div>
          ))}
        </div>
        {/* footer links */}
      </div>
    </>
  );
};

export default RecommendedUser;
