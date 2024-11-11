"use client";
import React, { useEffect } from "react";
import Feed from "./_components/Feed";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const Home = () => {
  const { user } = useUser();
  console.log("user=", user);

  useEffect(() => {
    const getuser = async () => {
      const usersData = await axios.get("/api/getUser");
      console.log("usersData=", usersData);
    };
    getuser();
  }, []);

  return (
    <div>
      <Feed />
    </div>
  );
};

export default Home;
