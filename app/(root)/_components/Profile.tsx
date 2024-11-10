"use client";

import Image from "next/image";
import React, { useState } from "react";
import profileImg from "@/assets/ProfileImage.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Settings from "@/Icons/Settings/Settings";

import LinkIcon from "@/Icons/LinkIcon/LinkIcon";
// import highlightData from "./HighlightData";

// import Tab from "./Tab";
import PostIcon from "@/Icons/Post/post.png";
import ReelIcon from "@/Icons/Reel/reel.png";
import TagIcon from "@/Icons/Tag/tag.png";
import highlightData from "./Data/HighlightData";
import Tab from "./Tab";
// import Posts from "./Posts";
// import Reels from "./Reels";
// import Tags from "./Tags";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  // const [isContentVisible, setisContentVisible] = useState(true);

  // const handleTabClick = () => {
  //   setisContentVisible(false);

  //   // delay animation
  //   setTimeout(() => {
  //     setActiveTab("tab");
  //     setisContentVisible(true);
  //   }, 300);
  // };

  return (
    <>
      <div className="lg:w-[88%] md:w-[88%] sm:w-full w-full h-auto lg:block md:block sm:hidden hidden">
        {/* Your info section */}
        <div className="w-full h-auto flex items-center lg:gap-x-20 md:gap-x-16 sm:gap-x-12 gap-x-8 justify-center mb-10">
          <Image
            // src="https://socurce.unsplash.com/random/?climber"
            src={profileImg}
            alt="profile img"
            className="rounded-full lg:w-44 md:w-44 sm:w-36 w-32 lg:h-44 md:h-44 sm:h-36 h-36 object-cover"
            width={100}
            height={100}
          />
          <div className="flex items-start flex-col">
            <div className="flex items-center gap-x-5 mb-4">
              <Link href="/" className="text-lg text-gray-200 font-normal">
                mountain.men
              </Link>
              <div className="flex items-center gap-x-2">
                <Button className="bg-[#1d1d1d] rounded-lg px-4 py-1.5 text-base text-white font-normal hover:bg-[#2f2f2f] ease-out duration-150">
                  Edit Profile
                </Button>
                <Button className="bg-[#1d1d1d] rounded-lg px-4 py-1.5 text-base text-white font-normal hover:bg-[#2f2f2f] ease-out duration-150">
                  View archive
                </Button>
              </div>
              <Settings />
            </div>
            {/* post, follower,following */}
            <div className="flex items-center gap-x-6 mb-4">
              <h6 className="text-base text-gray-100 font-normal">10 Posts</h6>
              <Link href="/" className="text-base text-gray-100 font-normal">
                1200 Followers
              </Link>
              <Link href="/" className="text-base text-gray-100 font-normal">
                100 Following
              </Link>
            </div>

            {/* fullname */}
            <p className="text-base text-gray-100 font-normal">Mountain Men</p>

            {/* Bio */}
            <p className="text-base text-gray-100 font-normal">
              Jay Shree <br />
              Profession Account <br />
            </p>
            {/* Link */}
            <p className="text-base text-gray-100 font-normal flex items-center gap-x-2">
              <LinkIcon />
              <Link
                href="/"
                className="text-blue-500 hover:underline font-medium"
              >
                www.mountainmen.com
              </Link>
            </p>
          </div>
        </div>
        {/* Highlights Section */}
        <div className="w-full h-auto flex items-center gap-x-9 mb-10">
          <div className="max-w-[61vw] w-full h-auto flex items-center gap-x-3.5 overflow-x-scroll">
            {highlightData.map((data) => (
              <Link
                href="/profile"
                key={data.id}
                className="flex items-center justify-between flex-col flex-shrink-0"
              >
                <div className="w-28 h-28 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#1d1d1d] to-[#1d1d1d]">
                  <Image
                    src={data.img}
                    alt={data.name}
                    className="rounded-full h-full w-full object-cover p-[2.5px] bg-black"
                    width={100}
                    height={100}
                  />
                </div>
                <p className="text-white text-sm mt-1 ">{data.name}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* Posts Reels Tagged Section */}
        {/* it not work video */}

        <div className="w-full h-auto">
          <div className="w-full h-auto flex items-center justify-center gap-x-6 mb-4 border-t border-[#313131]">
            <Tab
              label="POSTS"
              icon={PostIcon}
              isActive={activeTab === "posts"}
              onclick={() => setActiveTab("posts")}
            />
            <Tab
              label="REELS"
              icon={ReelIcon}
              isActive={activeTab === "reels"}
              onclick={() => setActiveTab("reels")}
            />
            <Tab
              label="TAGGED"
              icon={TagIcon}
              isActive={activeTab === "tagged"}
              onclick={() => setActiveTab("tagged")}
            />
          </div>
          {/* Posts Reels Tagged Section // it not work video */}

          {/* <div
            className={`mt-4 transition-opacity duration-300 ease-out ${
              isContentVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {activeTab === "posts" && <Posts />}
            {activeTab === "reels" && <Reels />}
            {activeTab === "tagged" && <Tags />}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
