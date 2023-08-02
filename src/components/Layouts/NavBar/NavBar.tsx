import React, { useState } from "react";
// import { ConnectButton } from '@rainbow-me/rainbowkit'
import SideBarMenu from "../SideBar/SideBarMenu";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  logout,
  selectUser,
  signInWithWalletAsync,
} from "../../../features/auth/authSlice";
// import { useAccount } from 'wagmi'
import discord from "../../../utils/icons/discord2Icon.svg";

const NavBar = () => {
  const [openSideBarMenu, setOpenSideBarMenu] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  // const { isConnected } = useAccount()

  return (
    <>
      <SideBarMenu
        openSideBarMenu={openSideBarMenu}
        setOpenSideBarMenu={setOpenSideBarMenu}
      />
      <div className="flex lg:hidden justify-center items-center pr-2">
        <div className="flex items-center"></div>
      </div>
      {/* <div className="flex items-center justify-between w-full h-full">
        <div className="min-w-max font-semibold text-sm leading-4 pr-4 xl:pr-0">
          User Control Panel
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <div
            className={`${
              id?.value === '1' ? 'bg-#0066FF' : 'bg-#1E1E1E'
            } rounded-full`}
          >
            <PassSection headers={'Bidding'} />
          </div>
          <div
            className={`${
              id?.value === '2' ? 'bg-#0066FF' : 'bg-#1E1E1E'
            } rounded-full`}
          >
            <PassSection headers={'Consulting'} />
          </div>
          <div
            className={`${
              id?.value === '3' ? 'bg-#0066FF' : 'bg-#1E1E1E'
            } rounded-full`}
          >
            <PassSection headers={'Other'} />
          </div>
          <div
            className={`${
              id?.value === '4' ? 'bg-#0066FF' : 'bg-#1E1E1E'
            } rounded-full`}
          >
            <PassSection headers={'Pass'} />
          </div>
        </div>
      </div> */}

      {/* <div className="flex lg:hidden justify-center items-center gap-1">
        <button
          onClick={() => {
            setOpenSideBarMenu(true)
          }}
          className='w-full h-full border rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"'
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div> */}
      {/* <div className="items-center justify-end gap-4 w-full hidden lg:flex">
        <div className="flex items-center justify-center">
          <div className="flex items-center px-1.5">
            <BellModal />
          </div>
        </div>
        <div>
          {isConnected ? (
            user.value ? (
              <div
                className=" rounded-lg has-tooltip relative cursor-pointer px-4 py-1.5 bg-#0066FF text-white font-bold tracking-wide"
                onClick={() => dispatch(logout())}
              >
                {user?.value?.user?.slice(0, 2) +
                  '..' +
                  user?.value?.user?.slice(-4)}
                <div className="tooltip bg-white w-full text-black left-0 top-8 p-2 rounded-md cursor-pointer text-center">
                  Logout
                </div>
              </div>
            ) : (
              <button
                onClick={() => dispatch(signInWithWalletAsync())}
                className=" rounded-lg has-tooltip relative cursor-pointer px-4 py-1.5 bg-#0066FF text-white font-bold tracking-wide"
              >
                Sign In
              </button>
            )
          ) : (
            <ConnectButton showBalance={false} />
          )}
        </div>
      </div> */}
    </>
  );
};

export default NavBar;
