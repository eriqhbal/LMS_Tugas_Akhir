import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiAcademicCap } from "react-icons/hi"
import { dataLink } from '../assets/dataMenu';

// Hooks
import { UseUserContext } from '../Hooks/UseUserContext';

const Sidebar = () => {

   const { user } = UseUserContext();
   const userStatus = JSON.stringify(user);

   const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-emerald-800";
   const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-800 text-md m-2 hover:bg-emerald-500";
   
   return (
      <div className='h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
         <div className='flex text-center px-8'>
            <h2 className='font-bold text-xl p-3 text-third'>{userStatus.includes("student") ? "Menu Student" : "Menu Admin"}</h2>
            <p className='text-3xl p-2 rounded-full'><HiAcademicCap /></p>
         </div>
         <div className='mt-10'>
            {dataLink.map((datas, i) => {
               return (
                  <div key={i} className='mt-10'>
                     <h3 className='font-bold m-3 mt-4 text-emerald-800'>{datas.title}</h3>
                     {datas.subMenu.map((data, i) => {
                        return <NavLink key={i} to={`/${data.name}`} style={({ isActivate }) => ({ backgroundColor: isActivate ? "#064e3b" : ""})} className={({ isActive }) => { return isActive ? activeLink : normalLink }}>
                           {data.subIcon}
                           <p className='uppercase'>{data.name}</p>
                        </NavLink>
                     })}
                  </div>

               )
            })}
         </div>
      </div>
   )
}

export default Sidebar