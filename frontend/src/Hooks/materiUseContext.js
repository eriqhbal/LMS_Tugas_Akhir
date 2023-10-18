import {useContext} from "react";
import { MateriContext } from "../Context/MateriPelajaranContext";

export const MateriUseContext = () => {
   const context = useContext(MateriContext);

   if(!context){
      throw Error("MateriContext tidak berada didalam MateriContextProvider");
   }

   return context;
}