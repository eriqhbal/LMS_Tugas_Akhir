import { UseUserContext } from "./UseUserContext";

export const logOutUser = () => {
  const { dispatch } = UseUserContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
