import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const userButtonAppearance = {
  elements: {
    userButtonAvatarBox: "w-10 h-10", // Custom width and height
    userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
    // userButtonPopoverActionButton: "text-red-600", // Custom text color for action buttons
  },
};

const ProfileNav = () => {
  const { user } = useUser();
  console.log("user1=", user);

  return (
    <>
      <div className="w-full h-auto flex items-center justify-between">
        <div className="w-full h-auto flex items-center gap-x-3">
          <UserButton appearance={userButtonAppearance}></UserButton>
          {/* UserButton */}
          <div className="flex items-start gap-y-0 flex-col">
            <p className="text-[0.9rem] text-white font-medium mb-0">
              Music_lover
            </p>
            <h6 className="text-[0.935rem] text-gray-500 font-normal">
              {/* {user?.fullName} */}
              user
            </h6>
          </div>
        </div>
        {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
        <Link
          href="/"
          className="text-[0.855rem] text-blue-500 hover:text-gray-200"
        >
          Switch
        </Link>
      </div>
    </>
  );
};

export default ProfileNav;
