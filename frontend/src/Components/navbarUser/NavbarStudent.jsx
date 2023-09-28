import React from 'react';

// import modals
import { UseUserContext } from '../../Hooks/UseUserContext';
import { useActContext } from '../../Context/ActContextProvider';

// Component
import { ItemProfile } from "../index";

// Images
import Photosmp from "../../assets/images/Photo-smp.png";


const NavbarStudent = () => {
   const { user } = UseUserContext();
   const { handleClicked, initialValue } = useActContext();
   console.log(user)
  return (
     <div className='px-10 flex w-3/2 py-2 flex-row-reverse justify-between shadow-md rounded-md'>
        <div className='photo-user rounded-full w-11 h-11 overflow-hidden'>
           <button type="button" onClick={() => handleClicked("userProfile")} className='saturate-150 active:saturate-200'>
              <img src={Photosmp} alt="" className='w-12' />
           </button>
        </div>
        <div className='text-third font-bold py-2'>
           <h2 className='text-xl'>Hai, {user.dataUser.namaDepan}</h2>
        </div>
        {initialValue.userProfile && <ItemProfile />}
     </div >
  )
}

export default NavbarStudent