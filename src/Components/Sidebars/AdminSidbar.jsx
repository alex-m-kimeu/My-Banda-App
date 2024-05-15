import React from "react";
import logo from "/src/assets/logo.png";
import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import { RiUserVoiceLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

export const AdminSidbar = () => {

    const handleLogout = () => {
       
      };

      
  return (
    <div className=" flex flex-col justify-between h-screen">
      <div className="gap-[50px] ">
        <div className="flex flex-col items-center gap-[20px]">
          <img
            src={logo}
            alt="logo"
            className="w-[130px] h-[64px] max-w-full"
          />
        </div>
        <div className="flex flex-col gap-[20px] py-[30px] items-center">
          <div>
            <ul className="flex flex-col gap-[25px]">
              <li>
                <a
                  href=""
                  className="flex gap-[10px]  hover:text-Secondary active:text-Secondary"
                >
                  <IoHomeOutline className="w-7 h-7" />
                  <span className="pt-1 text-[15px]">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex gap-[10px]  hover:text-Secondary active:text-Secondary"
                >
                  <HiOutlineUser className="w-7 h-7" />
                  <span className="pt-1 text-[15px]">Users</span>
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex gap-[10px]  hover:text-Secondary active:text-Secondary"
                >
                  <RiUserVoiceLine className="w-7 h-7 hover:text-Secondary" />
                  <span className="pt-1 text-[15px] text-body">Complaints</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='p-[5px] flex flex-col gap-[25px] text-center lg:text-left items-center mb-5'>
        <div className='flex gap-[30px]'>
        <BiLogOut className="w-7 h-7 hover:text-Secondary mt-1 -mr-3" />
          <button
            className='bg-Secondary  hover:cursor-pointer px-[10px] py-[5px] rounded-[5px] text-[15px]'
            onClick=""
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
