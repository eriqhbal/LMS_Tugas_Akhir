import React, { useEffect } from 'react';

// import context
import { UseUserContext } from '../Hooks/UseUserContext';
import { useActContext } from '../Context/ActContextProvider';

// Navbar Component
import {NavbarAdmin, NavbarStudent} from "./index";
 
const Navbar = () => {
  const { user} = UseUserContext();
  const { setScreenSize, screenSize, setActiveMenu } = useActContext();
  const parseUserNav = JSON.stringify(user)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  },[setScreenSize])

    useEffect(() => {
      if (screenSize <= 900) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [setScreenSize, screenSize, setActiveMenu]);

  return parseUserNav.includes("student") ? <NavbarStudent/> : <NavbarAdmin/>
}

export default Navbar