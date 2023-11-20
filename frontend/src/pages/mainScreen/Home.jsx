import React from "react";
import { UseUserContext } from "../../Hooks/UseUserContext";
import { PengajarScreen, PelajarScreen, AdminScreen } from "./userPage/index";

const Home = () => {

  // Data User
  const { user } = UseUserContext();
  const parseUser = JSON.stringify(user);

  return parseUser.includes("student") ? <PelajarScreen /> : parseUser.includes("gmail") ? <PengajarScreen /> : <AdminScreen/>
}

export default Home