import React from 'react'

// import modals
import { UseUserContext } from '../../Hooks/UseUserContext';
import { useActContext } from '../../Context/ActContextProvider';

// Component
import {ItemProfile} from "../index";

// Icons
import { FaUser } from "react-icons/fa";

const NavbarAdmin = () => {
   const { user } = UseUserContext();
   const { handleClicked, initialValue } = useActContext();
  return (
    <div className="px-10 flex w-3/2 py-2 flex-row-reverse justify-between shadow-md rounded-md">
      <div className="photo-user rounded-full w-11 h-11 overflow-hidden">
        <button
          type="button"
          onClick={() => handleClicked("userProfile")}
          className="saturate-150 active:saturate-200"
        >
          <FaUser className="w-10 h-10 object-cover ml-0.5" />
        </button>
      </div>
      <div className="text-third font-bold py-2">
        <h2 className="text-xl">Hai, {user.dataUser.namaDepan}</h2>
      </div>
      {initialValue.userProfile && <ItemProfile />}
    </div>
  );
}

export default NavbarAdmin