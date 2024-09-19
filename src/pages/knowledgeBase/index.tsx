import React, { useState } from "react";
import SideBar from "~/components/Sidebar";
import NavBar from "~/components/Navbar";
import { Button } from "~/components/ui/button";
import { BookmarkIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Delete } from "~/lib/icons";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-white">
      <SideBar isCollapsed={!sidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <NavBar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          <div className="ml-22 mx-auto mt-20 flex max-w-7xl">
            <div className="m-2 h-screen w-full overflow-x-hidden overflow-y-hidden rounded-md border bg-white p-2">
              <div className="mt-4 flex justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Knowledge Base</h1>
                  <p className="text-gray-400">Total Knowledge Base: 1</p>
                </div>
                <Button>
                  <BookmarkIcon />
                  New Knowledge Base
                </Button>
              </div>
              <hr className="mt-2" />
              <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Knowledge Base Name </TableHead>
                    <TableHead>Last Edited </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">TempUser199</TableCell>
                    <TableCell>28 days ago</TableCell>
                    <TableCell>
                      <Delete />
                    </TableCell>
                    <TableCell className="text-right">
                      <FaArrowRightFromBracket />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
    // <div>Coming Soon</div>
  );
};

export default Page;
