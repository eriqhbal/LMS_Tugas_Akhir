import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// icon
import { BsXLg } from "react-icons/bs";
import { UseUserContext } from '../../Hooks/UseUserContext';

const Register = ({ appearScreen, closeScreenComponent }) => {
  const [namaDepan, setNameUserFront] = useState("");
  const [namaBelakang, setNameUserBack] = useState("");
  const [password, setNewPassword] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [buttonSubmit, setButtonSubmit] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { dispatch } = UseUserContext();

  useEffect(() => {
    setNameUserFront('');
    setNameUserBack('');
    setNewPassword('');
    setEmailUser('');
  }, [buttonSubmit])

  async function submitNewData(e) {
    e.preventDefault();

    const response = await fetch("/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ namaDepan, namaBelakang, password, emailUser })
    });

    const dataJson = await response.json();

    if (!response.ok) {
      setError(dataJson.e);
    } else {

      localStorage.setItem('user', JSON.stringify(dataJson));

      dispatch({ type: 'LOGIN', payload: dataJson });
      setButtonSubmit(!buttonSubmit);
    }
  }

  const closeScreen = () => {
    navigate("/login");
    closeScreenComponent(false);
  }

  return appearScreen === true ? (
    <div className='absolute xl:inset-x-[400px] top-24 w-1/3 z-30 bg-white rounded-xl border border-spacing-x-7 overflow-hidden shadow-sm'>
      <div className='relative py-4 flex'>
        <h1 className='font-bold text-2xl ml-4 text-third'>Register New Account</h1>
        <button type="button" className='absolute right-3 top-2' onClick={closeScreen}><BsXLg /></button>
      </div>
      <div className='px-5'>
        <form onSubmit={submitNewData} className='items-center my-7'>

          <div className='flex py-2'>
            <div className='pt-0.5 flex-1 '>
              <input type="text" name='nameFront' className='outline outline-1 outline-black p-2 rounded-sm w-full' value={namaDepan} onChange={(e) => setNameUserFront(e.target.value)} placeholder='Nama Depan' required />
            </div>
            <div className='pt-0.5 flex-1 ml-4'>
              <input type="text" name='nameBack' className='outline outline-1 outline-black p-2 rounded-sm w-full' value={namaBelakang} onChange={(e) => setNameUserBack(e.target.value)} placeholder='Nama Belakang' required />
            </div>
          </div>
          <div className='mb-2'>
            <input type="email" name="email" className='outline outline-1 outline-black p-2 rounded-sm w-full' value={emailUser} onChange={(e) => setEmailUser(e.target.value)} placeholder='Email Address' required />
          </div>
          <div className='mb-3'>
            <input type="password" name="password" className='outline outline-1 outline-black p-2 rounded-sm w-full' value={password} onChange={(e) => setNewPassword(e.target.value)} placeholder='Password' required />
          </div>
          <div className='text-center'>
            <button type="submit" name='buttonSignUp' className='w-1/2 p-1 rounded-sm bg-lime-600 text-third text-white'>Sign Up</button>
            {error && <div className='error'>
              <p className='text-lg'>{error}</p>
            </div>
            }
          </div>

        </form>
      </div>
    </div>

  )
    : "";

}

export default Register