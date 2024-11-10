"use client";
import React from "react";
import SearchLogo from "@/assets/navlogo/search.png";
import ReelsLogo from "@/assets/navlogo/reel.png";
import CreateLogo from "@/assets/navlogo/create.png";
import HomeLogo from "@/assets/navlogo/home.png";

import Link from "next/link";
import Image from "next/image";
// import { useUser } from "@clerk/nextjs";

const MobileNav = () => {
  const sidebarItems = [
    {
      link: "/search",
      icon: SearchLogo,
      alt: "Search",
    },
    {
      link: "/create",
      icon: CreateLogo,
      alt: "Create",
    },
    {
      link: "/reels",
      icon: ReelsLogo,
      alt: "Reels",
    },
  ];

  //   const { user } = useUser();

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto flex items-center gap-x-2">
        <Link
          href="/"
          className="w-full h-auto flex items-center gap-x-4 p-3 group"
        >
          <Image
            src={HomeLogo}
            alt="Home"
            className="w-6 h-6 object-contain group-hover:scale-105 transition-transform duration-300"
            width={24}
            height={24}
          />
        </Link>
        {sidebarItems.map((item, index) => (
          <Link
            href={item.link}
            className="w-full h-auto flex items-center gap-x-4 p-3 group"
            key={index}
          >
            <Image
              src={item.icon}
              alt={item.alt}
              className="w-6 h-6 object-contain group-hover:scale-105 transition-transform duration-300"
              width={24}
              height={24}
            />
          </Link>
        ))}
        <Link
          href="/profile"
          className="w-full h-auto flex items-center gap-x-4 p-3 group"
        >
          <Image
            // src={user?.imageUrl || "/assets/ProfileImage.png"}
            src={"/assets/ProfileImage.png"}
            alt="User Profile"
            className="w-6 h-6 object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
