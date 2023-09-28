import React from 'react';
import {useNavigate} from "react-router-dom";

const ForgetPass = () => {
  const navigate = useNavigate();
  return (
    <div className='py-10 h-screen w-full bg-emerald-100'>
      <div className=' mx-auto w-1/3 my-12 bg-gray-700 pb-3 px-10 rounded-md overflow-hidden'>
        <h1 className='mt-2 text-xl text-white text-third'>Lupa Password</h1>

          <form onSubmit={() => { }} className='my-4'>
            <input type="text" name="emailUser" className='p-2 w-full' onChange={(e) => {}} value="" placeholder='Masukkan Email Anda' />
            <button type="submit" className="bg-lime-400 mt-2 p-1 px-10 rounded-md">Enter</button>
          </form>
        
        <div className='mt-2 text-center'>
          <button type="button" className='px-4 py-1 bg- bg-rose-600 text-white rounded-sm' onClick={() => navigate("/login")}>Cancel</button> 
        </div>
      </div>
    </div>
  )
}

export default ForgetPass