import React, { useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import SelectionIcon from "../../../utils/icons/SelectionIcon.svg";
import upArrowIcon from "../../../utils/icons/upArrowIcon.svg";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import avatarIcon from "../../../utils/icons/avatarIcon.svg";

import { logout, selectUser } from "../../../features/auth/authSlice";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const LogoutSelection = () => {
  const dispatch = useAppDispatch();

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="relative inline-flex w-full justify-center items-center rounded-md gap-x-1.5 p-1 text-sm font-semibold text-gray-900 shadow-sm">
          <div className="">{/* <img src={avatarIcon} alt="" /> */}</div>
          {/* <img src={SelectionIcon} alt="" className="w-6 h-6" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="  absolute right-0 top-10 mt-2 w-36 p-2 max-h-96  origin-top-right rounded-md bg-#363636 border border-#404040 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col z-20">
          <div
            onClick={() => dispatch(logout())}
            className=" p-2 text-13px rounded-md flex justify-between items-center  hover:bg-#1F1F1F relative"
          >
            Logout
            <div className="absolute -top-4.5 right-0">
              {/* <img src={upArrowIcon} alt="" /> */}
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LogoutSelection;
