import Image from "next/image";
import Link from "next/link";
import React from "react";
// import storiesData from "./Data/StoriesData";
// import TextEllipse from "./TextEllipse";
// lg:max-w-[41vw]

import img from "@/assets/ProfileImage.png";
import storiesData from "./Data/storiesData";
import TextEllipse from "./TextEllipse";

const Stories = () => {
  return (
    <>
      <div className="lg:max-w-[33vw] md:mx-w-[70vw]  sm:max-w-full   w-[100vw] h-auto flex items-center gap-x-3.5 overflow-x-scroll overflow-hidden ">
        <Link
          href="/"
          className="flex items-center justify-center flex-col flex-shrink-0 ml-2"
        >
          <div className="w-16 h-16 rounded-full object-cover p-[2px] bg-green-600">
            <Image
              // src="https://source.unsplash.com/random/?flower"
              src={img}
              alt="story img"
              className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
              width={100}
              height={100}
            />
          </div>
          <TextEllipse username="tanmay" />
        </Link>
        {storiesData.map((item) => (
          <Link
            href="/"
            className="flex items-center justify-center flex-col flex-shrink-0"
            key={item.id}
          >
            <div className="w-16 h-16  rounded-full object-cover p-[2px] bg-gradient-to-r from-[#f02aa6] to-[#ff6f48]">
              <Image
                src={item.imageUrl}
                alt="story img"
                className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
                width={100}
                height={100}
              />
            </div>
            <TextEllipse username={item.username} maxLength={8} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Stories;
