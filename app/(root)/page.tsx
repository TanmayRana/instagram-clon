"use client";
import React from "react";
import Feed from "./_components/Feed";
import { useUser } from "@clerk/nextjs";

const Home = () => {
  const { user } = useUser();
  console.log("user=", user);

  return (
    <div>
      <Feed />
    </div>
  );
};

export default Home;
