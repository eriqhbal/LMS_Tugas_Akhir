import React from 'react';

// import modals
import { UseUserContext } from '../Hooks/UseUserContext';

// Navbar Component
import {NavbarAdmin, NavbarStudent} from "./index";
 
const Navbar = () => {
  const { user} = UseUserContext();
  const parseUserNav = JSON.stringify(user)

  return parseUserNav.includes("student") ? <NavbarStudent/> : <NavbarAdmin/>
}

export default Navbar