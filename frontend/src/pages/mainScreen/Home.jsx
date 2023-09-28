import React from "react";
import { UseUserContext } from "../../Hooks/UseUserContext";
import { PengajarScreen, PelajarScreen } from "./userPage/index";

const Home = () => {

  // Data User
  const { user } = UseUserContext();
  const parseUser = JSON.stringify(user);

  return parseUser.includes("student") ? <PelajarScreen /> : <PengajarScreen />
}

export default Home