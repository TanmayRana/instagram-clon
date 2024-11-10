import React from "react";
import TopNav from "./TopNav";
import Stories from "./Stories";
import FeedCard from "./FeedCard";
import RecommendedUser from "./RecommendedUser";

const Feed = () => {
  return (
    <>
      <div
        className="lg:w-[83%] md:w-[83%] sm:w-full min-h-screen lg:py-7 md:py-7
sm:py-4 py-3  flex items-start gap-x-20 justify-between"
      >
        {/* Feed Story Section */}
        <div className="lg:w-[55%] md:w-full sm:w-full w-full h-auto relative">
          {/* Top Navbar */}
          <TopNav />
          {/* stories Section */}
          <Stories />
          {/* Feed Section */}
          {/* lg:w-[73%] */}
          <div className="w-full h-auto flex items-center justify-center mt-6">
            <div className="lg:w-[90%] md:w-[73%] sm:w-[80%] w-[75%] h-auto">
              <FeedCard />
            </div>
          </div>
        </div>
        {/* Recommended user Section */}
        <div className="w-[25%] h-auto lg:block md:hidden sm:hidden hidden ">
          <RecommendedUser />
        </div>
      </div>
    </>
  );
};

export default Feed;
