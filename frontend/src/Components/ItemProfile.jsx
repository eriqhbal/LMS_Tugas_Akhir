import React from 'react';
import {useNavigate} from "react-router-dom";
import Button from './Button';

// context
import { useActContext } from '../Context/ActContextProvider';
import { UseUserContext } from '../Hooks/UseUserContext';
import { logOutUser } from '../Hooks/logOutUser';

// images
import PhotoSmp from "../assets/images/Photo-smp.png";

// icons
import { MdOutlineCancel, MdOutlineExitToApp } from "react-icons/md";


const ItemProfile = () => {
  // React Hooks


  // Package & data
  const {cancelClicked} = useActContext();
  const navigate = useNavigate()
  const { user } = UseUserContext();
  const { logout } = logOutUser();

  // Fetch Data


  const changeDataPage = () => {

    navigate(`home/${user.dataUser._id}`);
    cancelClicked("userProfile");
  }

  
  const handleCloseAccount = () => {
    logout();
    cancelClicked("userProfile");
  }
  return (
    <div className='z-50 absolute w-96 top-20 right-32 p-4 shadow-md rounded-lg bg-slate-100'>
      <div className='flex justify-between items-center'>
        <h3 className='font-semibold text-xl text-third'>Profile Settings</h3>
        <Button text={<MdOutlineCancel />} size="3xl" bgHoverColor="light-gray" borderRadius="50%" color="#166534" currentFunction={() => cancelClicked("userProfile")} />
      </div>
      
      <div className='mt-3 flex pb-3 border-b-2 border-green-900'>
        <img src={PhotoSmp} alt="YourPict" className='w-28 h-28 rounded-full object-cover' />
        <div className='h-14 mt-4 pl-2 pr-8 ml-4 bg-emerald-800 rounded-md text-white'>
          <p className='text-third text-base tracking-normal mt-1'>{user.dataUser.namaDepan} {user.dataUser.namaBelakang}</p>
          <p>{user.dataUser.email}</p>
        </div>
      </div>
      <div className='md:h-10 bg-green-800 active:bg-green-700 rounded-sm overflow-hidden shadow-md text-third mt-3 w-[14rem]'>
        <button type="button" className='uppercase h-10 text-sm w-full text-gray-200 hover:text-white text-start pl-3' onClick={changeDataPage}>Ubah Data</button>
      </div>

      <button type="button" onClick={handleCloseAccount} className='text-center mt-12 w-[150px] py-1 flex justify-center items-center overflow-hidden text-xl mx-auto rounded-sm text-white  bg-red-800  hover:bg-red-700 active:bg-red-600 focus:outline-none focus:ring focus:ring-red-900'><p className='mr-3'>Keluar</p>{<MdOutlineExitToApp />}</button>
    </div>

  )
}

export default ItemProfile;