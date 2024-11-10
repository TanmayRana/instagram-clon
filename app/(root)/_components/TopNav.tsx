import Image from "next/image";
import Link from "next/link";
import React from "react";

import InstagramLogo from "@/assets/logo/instagram.png";
import SearchLogo from "@/assets/navlogo/search.png";
import MessageLogo from "@/assets/navlogo/message.png";

const TopNav = () => {
  return (
    <>
      <div className="w-full h-auto mb-5 lg:hidden md:hidden sm:block block">
        <div className="w-full h-auto flex items-center justify-between">
          <Link href="/">
            <Image
              src={InstagramLogo}
              alt="Instagram Logo"
              className="w-28 h-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-x-4 pe-2">
            <Link href="/">
              <Image src={SearchLogo} alt="SearchLogo" className="w-6 h-6" />
            </Link>
            <Link href="/" className="relative">
              <Image src={MessageLogo} alt="SearchLogo" className="w-6 h-6" />
              <div className="absolute -right-2 -top-2 bg-red-600 text-sm text-white rounded-full w-5 h-5 flex items-center justify-center">
                9
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
