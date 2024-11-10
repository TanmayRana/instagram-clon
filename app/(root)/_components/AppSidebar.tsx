"use client";

import InstagramLogo from "@/assets/logo/instagram.png";
import InstagramIcon from "@/assets/logo/icon.png";

import SearchLogo from "@/assets/navlogo/search.png";
import ExploreLogo from "@/assets/navlogo/explore.png";
import ReelsLogo from "@/assets/navlogo/reel.png";
import MessagesLogo from "@/assets/navlogo/message.png";
import NotificationsLogo from "@/assets/navlogo/like.png";
import CreateLogo from "@/assets/navlogo/create.png";
import HomeLogo from "@/assets/navlogo/home.png";
import ThreadsLogo from "@/assets/navlogo/threads.png";
import MoreLogo from "@/assets/navlogo/more.png";

import * as React from "react";
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react";

import NavUser from "./NavUser";

import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

import img from "@/home.png";
import Link from "next/link";
import MobileNav from "./MobileNav";

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      name: "Search",
      link: "/search",
      icon: SearchLogo,

      isActive: true,
    },
    {
      name: "Explore",
      link: "/explore",
      icon: ExploreLogo,

      isActive: false,
    },
    {
      name: "Reels",
      link: "/reels",
      icon: ReelsLogo,

      isActive: false,
    },
    {
      name: "Messages",
      link: "/messages",
      icon: MessagesLogo,

      isActive: false,
    },
    {
      name: "Notifications",
      link: "/notifications",
      icon: NotificationsLogo,

      isActive: false,
    },
    {
      name: "Create",
      link: "/create",
      icon: CreateLogo,
      isActive: false,
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const [mails, setMails] = React.useState(data.mails);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row "
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="flex flex-col items-center  justify-between"
      >
        <SidebarHeader className="mt-7 ">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <div className="">
                  <Link
                    href="/"
                    className=" px-2 lg:block md:hidden sm:hidden hidden"
                  >
                    <Image
                      src={InstagramLogo}
                      alt="Instagram Logo"
                      className="w-28 h-auto"
                    />
                  </Link>
                  <Link
                    href="/"
                    className="mb-10 px-2 lg:hidden md:block sm:block block"
                  >
                    <Image
                      src={InstagramIcon}
                      alt="Instagram Logo"
                      className="w-28 h-auto"
                    />
                  </Link>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="mt-7">
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.name} className="">
                    <SidebarMenuButton
                      isActive={activeItem.name === item.name}
                      className="px-2.5 md:px-2"
                    >
                      <Image
                        src={item.icon}
                        alt="home logo"
                        className="w-6 h-6 object-contain group-hover:scale-105 ease-out duration-300 "
                        width={24}
                        height={24}
                      />
                      <span className="hidden lg:block text-xl">
                        {item.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
}
