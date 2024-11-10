import React from "react";
// import instagramFeed from "./Data/FeedData";
import Link from "next/link";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

// import Ellipse from "@/Icons/Ellipse/Ellipse";
import LikeIcon from "@/Icons/Like/Like";
import Comment from "@/Icons/Comment/Comment";
import Share from "@/Icons/Share/Share";
import Save from "@/Icons/Save/Save";
import Emoji from "@/Icons/Emoji/Emoji";
import instagramFeed from "./Data/instagramFeed";
const FeedCard = () => {
  return (
    <>
      {instagramFeed.map((feed) => (
        <div className="w-full h-auto mb-6 " key={feed.id}>
          {/* pp and username,time */}
          <div className="w-full h-auto flex items-center justify-between mb-2">
            <div className="flex items-center gap-x-2">
              <Link
                href="/"
                className="flex items-center justify-center flex-col flex-shrink-0"
                key={feed.id}
              >
                <div className="w-10 h-10 rounded-full object-cover p-[2px] bg-gradient-to-r from-[#f02aa6] to-[#ff6f48]">
                  <Image
                    src={feed.profileImg}
                    alt="story img"
                    className="rounded-full w-full h-full object-cover p-[2.5px] bg-black"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
              <div className="flex items-center gap-x-2">
                <p className="text-white text-sm font-medium">
                  {feed.username}
                </p>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <p className="text-white text-sm font-medium">{feed.time}</p>
              </div>
            </div>
            {/* <Ellipse /> */}

            <BsThreeDots className="text-xl text-gray-200" />
          </div>
          {/* feed Img */}
          <div className="w-full lg:max-h-[75vh] md:max-h-[70vh] sm:max-h-[65vh] max-h-[50vh] lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[50vh] lg:min-h-[65vh] md:min-h-[55vh] sm:min-h-[50vh] min-h-[45vh] border border-gray-300 rounded overflow-hidden mb-3">
            <Image
              src={feed.postImg}
              alt={feed.caption}
              className="w-full h-full rounded object-center"
              width={100}
              height={100}
            />
          </div>
          {/*User Action (like ,comment sher & save)  */}
          <div className="w-full h-auto flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <LikeIcon />
              <Comment />
              <Share />
            </div>
            <Save />
          </div>
          {/* Like count */}
          <Link
            href="/"
            className="w-full h-auto items-center gap-x-2 text-base text-gray-200 font-medium my-2"
          >
            <div className="flex items-center">
              <Image
                src={feed.mutualFrndImg1}
                alt={feed.likeCount}
                className="w-5 h-5 rounded-full object-fill p-[1.5px] bg-black"
                width={100}
                height={100}
              />
              <Image
                src={feed.mutualFrndImg2}
                alt={feed.likeCount}
                className="w-5 h-5 rounded-full object-fill p-[1.5px] bg-black -ml-3"
                width={100}
                height={100}
              />
            </div>
          </Link>

          <div className="w-full h-auto flex items-center gap-x-1">
            <div className="w-full h-auto text-sm text-gray-200 font-thin">
              <Link href="/" className="text-white font-medium text-sm me-1">
                {feed.username}
              </Link>
              {feed.caption}
              <Link href="/" className="text-gray-400  text-sm ms-1">
                more
              </Link>
            </div>
          </div>

          <Link href="/" className="text-gray-400 font-normal my-2">
            View all {feed.commentCount} comments
          </Link>

          {/* Comment */}
          <div className="w-full h-auto flex items-center justify-between border-b border-b-gray-500">
            <input
              type="text"
              className="w-[90%] h-auto bg-transparent border-none outline-none focus:outline-none text-sm text-gray-400 py-3 "
              placeholder="Add a comment..."
            />
            <Emoji />
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedCard;
