import  { useContext } from "react";
import { tugasAkhirContext } from "../Context/TugasAkhirContext";

export const UseFileTaskContext = () => {
   const context = useContext(tugasAkhirContext);

   if(!context){
      throw Error("TugasAkhirContext harus didalam TugasAkhirContextProvider");
   }

   return context;
}