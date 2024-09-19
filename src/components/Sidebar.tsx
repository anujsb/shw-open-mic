import React from "react";
import { RiHeadphoneLine } from "react-icons/ri";
import {
  IoBookOutline,
  IoCalendarOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import { HiHashtag } from "react-icons/hi2";
import { IoIosLink } from "react-icons/io";
import { useRouter } from "next/router";
import Link from "next/link";

const navBarData = [
  {
    id: 1,
    title: "My AI Agent",
    icon: <RiHeadphoneLine />,
    url: "/dashboard",
    disabled: false,
  },
  {
    id: 2,
    title: "Knowledge Base",
    icon: <IoBookOutline />,
    url: "/knowledgeBase",
    disabled: true,
  },
  {
    id: 3,
    title: "Campaigns",
    icon: <TfiAnnouncement />,
    url: "/campaigns",
    disabled: true,
  },
  {
    id: 5,
    title: "Phone Numbers",
    icon: <HiHashtag />,
    url: "/phone-numbers",
    disabled: true,
  },
  {
    id: 6,
    title: "Call Recordings",
    icon: <IoVideocamOutline />,
    url: "/recordings",
    disabled: true,
  },
  {
    id: 7,
    title: "Contacts",
    icon: <IoCalendarOutline />,
    url: "/contacts",
    disabled: true,
  },
  {
    id: 4,
    title: "Integrations",
    icon: <IoIosLink />,
    url: "/integrations",
    disabled: true,
  },
];

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const router = useRouter();

  return (
    <div
      className={`relative flex h-[92vh] ${
        isCollapsed ? "min-w-[4rem]" : "min-w-[14.5rem]"
      } border-r-[1px] border-solid transition-all duration-300`}
    >
      <div className="b mt-16 w-full p-2">
        {navBarData.map((item) => {
          const isActive = router.pathname === item.url;
          const linkClasses = `m-1 flex items-center rounded-md p-2 transition-colors ${
            isActive
              ? "border-l-4 border-[#9766ED] bg-[#f1f1fd]"
              : item.disabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-200"
          }`;

          const content = (
            <>
              <span className="mr-2">{item.icon}</span>
              {!isCollapsed && (
                <div className="flex items-center">
                  <span>{item.title}</span>
                  {item.disabled && (
                    <span className="ml-2 text-xs text-gray-500">
                      (Coming Soon)
                    </span>
                  )}
                </div>
              )}
            </>
          );

          const commonProps = {
            className: linkClasses,
            title: item.disabled ? "Coming soon" : "",
          };

          return item.disabled ? (
            <div key={item.id} {...commonProps}>
              {content}
            </div>
          ) : (
            <Link key={item.id} href={item.url} {...commonProps}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
