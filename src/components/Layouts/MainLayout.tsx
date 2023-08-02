import React from "react";
import SideBar from "./SideBar/SideBar";
import NavBar from "./NavBar/NavBar";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/auth/authSlice";

interface IMainLayout {
  isPrivate?: boolean;
  children: React.ReactNode;
}
export default function MainLayout({ children }: IMainLayout) {
  const user = useAppSelector(selectUser);

  return (
    <>
      <div className="w-screen h-screen flex items-start justify-start overflow-hidden bg-#141414">
        <aside className="lg:w-16 bg-#141414 lg:border-r lg:border-#222222 lg:h-full lg:overflow-auto hidden lg:flex">
          <SideBar />
        </aside>
        <article className="flex flex-col items-center justify-center flex-grow w-full h-full">
          <header
            className={`${"py-2.5"} flex lg:hidden items-center justify-between w-full bg-#141414 border-b border-#222222 px-4 `}
          >
            <NavBar />
          </header>
          <main className="flex-grow h-full w-full overflow-auto mushboomer-container">
            {children}
          </main>
        </article>
      </div>
    </>
  );
}
