import React from "react";
import { Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/outline";
import geciciIcon from "../../../utils/icons/geciciIcon.svg";
import homeicon from "../../../utils/icons/homeicon.svg";
import { Link } from "react-router-dom";
import discord from "../../../utils/icons/discord2Icon.svg";
import TrackerSideBarIcon from "../../../utils/icons/TrackerSideBarIcon.svg";
// import { useAccount } from 'wagmi'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  logout,
  selectUser,
  signInWithWalletAsync,
} from "../../../features/auth/authSlice";
// import { ConnectButton } from '@rainbow-me/rainbowkit'

interface ISideBarMenu {
  openSideBarMenu: boolean;
  setOpenSideBarMenu: any;
}
const navigation = [
  { name: "Panel", to: "/", icon: homeicon, current: true },
  { name: "Trackers", to: "/#", icon: TrackerSideBarIcon, current: false },
  // { name: 'Mushboomers', to: '/#', icon: geciciIcon, current: false },
  // { name: 'Mushboomers', to: '/#', icon: geciciIcon, current: false },
  // { name: 'Mushboomers', to: '/#', icon: geciciIcon, current: false },
  // { name: 'Mushboomers', to: '/#', icon: geciciIcon, current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SideBarMenu: React.FC<ISideBarMenu> = ({
  openSideBarMenu,
  setOpenSideBarMenu,
}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  // const { connector: activeConnector, isConnected } = useAccount();

  return (
    <>
      <Transition.Root show={openSideBarMenu} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setOpenSideBarMenu}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 right-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative ml-24 flex w-full max-w-xs flex-1">
                {/* <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 left-full flex w-16 justify-center pt-5 bg-blue-500">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setOpenSideBarMenu(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child> */}
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow w-full flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                  <div className="flex justify-between h-16 shrink-0 items-center gap-4">
                    {/* <span className="flex items-center gap-2">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=white"
                        alt="Your Company"
                      />
                      <span className="uppercase text-xl leading-5.25 font-semibold">
                        Panel
                      </span>
                    </span> */}
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setOpenSideBarMenu(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XCircleIcon
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </button>
                    {/* <UserInfo /> */}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SideBarMenu;
