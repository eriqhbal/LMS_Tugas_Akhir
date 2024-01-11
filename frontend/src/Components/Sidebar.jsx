import React from "react";
import { NavLink } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { dataLink } from "../assets/dataMenu";

// Hooks
import { UseUserContext } from "../Hooks/UseUserContext";
import { useActContext } from "../Context/ActContextProvider";

const Sidebar = () => {
  const { user } = UseUserContext();
  const { activeMenu, setActiveMenu, screenSize } = useActContext();
  const userStatus = JSON.stringify(user);

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-emerald-800";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-800 text-md m-2 hover:bg-emerald-500";

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) setActiveMenu(false);
  };

  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div
            className="flex justify-between items-center"
            onClick={() => handleCloseSidebar()}
          >
            <div>
              <h2 className="items-center gap-3 mt-4 flex text-xl font-extrabold tracking-tight">
                {userStatus.includes("student") ? "Menu Student" : "Menu Admin"}
                <HiAcademicCap />
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActiveMenu((prev) => !prev)}
              className="p-3 text-xl rounded-full hover:bg-light-gray md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>

          <div className="mt-10">
            {dataLink.map((datas, i) => {
              return (
                <div key={i} className="mt-10">
                  <h3 className="font-bold m-3 mt-4 text-emerald-800">
                    {datas.title}
                  </h3>
                  {datas.subMenu.map((data, i) => {
                    return (
                      <NavLink
                        key={i}
                        to={`/${data.name}`}
                        onClick={() => handleCloseSidebar()}
                        style={({ isActivate }) => ({
                          backgroundColor: isActivate ? "#064e3b" : "",
                        })}
                        className={({ isActive }) => {
                          return isActive ? activeLink : normalLink;
                        }}
                      >
                        {data.subIcon}
                        <p className="uppercase">{data.name}</p>
                      </NavLink>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
