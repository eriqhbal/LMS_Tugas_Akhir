import { useContext } from "react";
import { userContext } from "../Context/userContext";


export const UseUserContext = () => {
   const context = useContext(userContext);

   if(!context){
      throw Error("userContext harus didalam UserContextProvider");
   }

   return context;
}