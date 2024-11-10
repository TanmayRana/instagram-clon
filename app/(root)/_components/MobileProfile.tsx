"use client";

import { Button } from "@/components/ui/button";
import LinkIcon from "@/Icons/LinkIcon/LinkIcon";
// import Settings from "@/Icons/Settings/Settings";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import profileImg from "@/assets/ProfileImage.png";
// import highlightData from "./HighlightData";
import Tab from "./Tab";

import PostIcon from "@/Icons/Post/post.png";
import ReelIcon from "@/Icons/Reel/reel.png";
import TagIcon from "@/Icons/Tag/tag.png";
import highlightData from "./Data/HighlightData";
// import Posts from "./Posts";
// import Reels from "./Reels";
// import Tags from "./Tags";

const MobileProfile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  // const [isContentVisible, setisContentVisible] = useState(true);
  return (
    <>
      <div className="w-full h-auto lg:hidden md:hidden sm:block block text-white">
        <div className="w-full h-auto flex items-center gap-x-8 justify-center mb-3">
          <Image
            // src="https://socurce.unsplash.com/random/?climber"
            src={profileImg}
            alt="profile img"
            className="rounded-full  w-20 h-20 object-cover"
            width={100}
            height={100}
          />

          <div className="flex items-start flex-col gap-y-3">
            {/* username */}
            <Link href="/" className="text-lg text-gray-200 font-normal">
              mountain.men
            </Link>

            {/* Button */}

            <div className="flex items-center gap-x-2">
              <Button className="bg-[#1d1d1d] rounded-lg px-4 py-1.5 text-base text-white font-normal hover:bg-[#2f2f2f] ease-out duration-150">
                Edit Profile
              </Button>
              <Button className="bg-[#1d1d1d] rounded-lg px-4 py-1.5 text-base text-white font-normal hover:bg-[#2f2f2f] ease-out duration-150">
                View archive
              </Button>
            </div>
          </div>
        </div>

        {/* Bio */}

        <p className="text-base text-gray-100 font-normal">
          Jay Shree <br />
          Profession Account <br />
        </p>

        {/* Link section */}
        <p className="text-base text-gray-100 font-normal flex items-center gap-x-2 mb-5">
          <LinkIcon />
          <Link href="/" className="text-blue-500 hover:underline font-medium">
            www.mountainmen.com
          </Link>
        </p>

        {/* Highlights */}

        <div className="w-full h-auto flex items-center gap-x-9 mb-10">
          <div className=" w-full h-auto flex items-center gap-x-3.5 overflow-x-scroll">
            {highlightData.map((data) => (
              <Link
                href="/profile"
                key={data.id}
                className="flex items-center justify-between flex-col flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#1d1d1d] to-[#1d1d1d]">
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

        {/* Post Followers Following */}

        <div className="w-full h-auto flex items-center justify-around border-t border-t-gray-500">
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">55</h6>
            <p className="text-sm text-white/40 font-thin">posts</p>
          </div>
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">1200</h6>
            <p className="text-sm text-white/40 font-thin">followers</p>
          </div>
          <div className="flex items-center flex-col py-3">
            <h6 className="text-base text-white font-medium mb-0">100</h6>
            <p className="text-sm text-white/40 font-thin">following</p>
          </div>
        </div>

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

export default MobileProfile;
