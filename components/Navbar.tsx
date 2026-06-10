"use client";

import Image from "next/image";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
} from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b">
      
      {/* ================= TOP NAVBAR ================= */}

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-[86px] flex items-center justify-between gap-6">
        
        {/* LOGO */}

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            B
          </div>

          <h2 className="text-2xl font-bold text-blue-600">
            Brand
          </h2>
        </div>

        {/* SEARCH BAR */}

        <div className="hidden lg:flex flex-1 max-w-[720px] h-[44px] border-2 border-blue-500 rounded-lg overflow-hidden">
          
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-4 outline-none"
          />

          <select className="w-[180px] border-l outline-none px-3 text-sm">
            <option>All category</option>
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Gaming</option>
          </select>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-medium transition">
            Search
          </button>
        </div>

        {/* RIGHT ICONS */}

        <div className="flex items-center gap-6">
          
          <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer text-sm">
            <FiUser size={22} />
            <span className="hidden md:block">
              Profile
            </span>
          </div>

          <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer text-sm">
            <FiHeart size={22} />
            <span className="hidden md:block">
              Message
            </span>
          </div>

          <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer text-sm">
            <FiShoppingCart size={22} />
            <span className="hidden md:block">
              Orders
            </span>
          </div>

          <div className="flex flex-col items-center text-gray-500 hover:text-blue-600 cursor-pointer text-sm">
            <FiShoppingCart size={22} />
            <span className="hidden md:block">
              My cart
            </span>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM NAVBAR ================= */}

      <div className="border-t bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-[56px] flex items-center justify-between">
          
          {/* LEFT MENU */}

          <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
            
            <button className="flex items-center gap-2">
              ☰ All category
            </button>

            <button>Hot offers</button>

            <button>Gift boxes</button>

            <button>Projects</button>

            <button>Menu item</button>

            <button>Help</button>
          </div>

          {/* RIGHT SIDE */}

          <div className="hidden lg:flex items-center gap-6 text-sm">
            
            <select className="outline-none">
              <option>English, USD</option>
            </select>

            <select className="outline-none">
              <option>Ship to 🇩🇪</option>
            </select>
          </div>

          {/* MOBILE SEARCH */}

          <div className="lg:hidden w-full relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-[42px] border rounded-lg pl-10 pr-4 outline-none"
            />

            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;