import { Link } from "react-router-dom";
import { useState } from "react";

function TopBar({ selectedTab, setSelectedTab }) {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   return (
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
               <div className="flex items-center">
                  <Link to="/" className="flex-shrink-0">
                     <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-md">
                           <span className="text-blue-700 font-bold text-xl">A</span>
                        </div>
                        <span className="ml-2 text-white font-bold text-xl">ASJ</span>
                     </div>
                  </Link>
               </div>

               <div className="hidden md:flex items-center space-x-8">
                  <Link
                     to="/"
                     onClick={() => { setSelectedTab("equipments") }}
                     className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${selectedTab === "equipments"
                           ? "bg-white text-blue-700 shadow-md"
                           : "text-blue-100 hover:bg-blue-500 hover:text-white"
                        }`}
                  >
                     Equipamentos
                  </Link>
                  <Link
                     to="/clients"
                     onClick={() => { setSelectedTab("clients") }}
                     className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${selectedTab === "clients"
                           ? "bg-white text-blue-700 shadow-md"
                           : "text-blue-100 hover:bg-blue-500 hover:text-white"
                        }`}
                  >
                     Clientes
                  </Link>
               </div>

               {/* Mobile menu button */}
               <div className="md:hidden flex items-center">
                  <button
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                     className="text-white hover:text-gray-200 focus:outline-none"
                  >
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                     </svg>
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile menu */}
         {mobileMenuOpen && (
            <div className="md:hidden bg-blue-700">
               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                     to="/"
                     onClick={() => {
                        setSelectedTab("equipments");
                        setMobileMenuOpen(false);
                     }}
                     className={`block px-3 py-2 rounded-md text-base font-medium ${selectedTab === "equipments"
                           ? "bg-white text-blue-700"
                           : "text-white hover:bg-blue-500"
                        }`}
                  >
                     Equipamentos
                  </Link>
                  <Link
                     to="/clients"
                     onClick={() => {
                        setSelectedTab("clients");
                        setMobileMenuOpen(false);
                     }}
                     className={`block px-3 py-2 rounded-md text-base font-medium ${selectedTab === "clients"
                           ? "bg-white text-blue-700"
                           : "text-white hover:bg-blue-500"
                        }`}
                  >
                     Clientes
                  </Link>
               </div>
            </div>
         )}
      </nav>
   );
}

export default TopBar;
