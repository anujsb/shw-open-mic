// import React, { useState } from "react";
// import { SignedIn, UserButton } from "@clerk/nextjs";
// import { IoMenu, IoClose } from "react-icons/io5";

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`flex min-h-screen w-64 flex-col bg-white transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed z-30 lg:static lg:translate-x-0`}
//       >
//         <div className="flex items-center justify-between border-b p-4">
//           <h1 className="text-xl font-bold">openmic.ai</h1>
//           <button onClick={toggleSidebar} className="lg:hidden">
//             <IoClose size={24} />
//           </button>
//         </div>
//         <nav className="flex-1 p-4">
//           <ul className="space-y-2">
//             <li className="rounded bg-purple-100 p-2 font-semibold text-purple-700">
//               My AI Agent
//             </li>
//             <li className="p-2">Knowledge Base</li>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         {/* Header */}
//         <header className="z-10 bg-white shadow-sm">
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between py-4">
//               <div className="flex items-center">
//                 <button onClick={toggleSidebar} className="mr-2 lg:hidden">
//                   <IoMenu size={24} />
//                 </button>
//               </div>
//               <div className="flex items-center">
//                 <SignedIn>
//                   <UserButton />
//                 </SignedIn>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main content */}
//         <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
//           <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
