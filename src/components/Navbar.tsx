import React from "react";
import { Button } from "./ui/button";
import { GrMenu } from "react-icons/gr";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

const NavBar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className="fixed start-0 z-10 flex min-h-[60px] w-full items-center border-b-[1px] border-solid border-b-[#e1e1e1] bg-white text-black shadow-sm">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center">
          <Button
            onClick={toggleSidebar}
            className="mx-3 items-center bg-inherit text-black hover:bg-slate-50"
            size="icon"
          >
            <GrMenu />
          </Button>
          <div className="flex gap-2">
            <Image
              src="/logo.svg"
              width={30}
              height={30}
              alt="Picture of the author"
            />
            <Image
              src="/logoText.svg"
              width={100}
              height={100}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="mr-2 flex items-center">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
