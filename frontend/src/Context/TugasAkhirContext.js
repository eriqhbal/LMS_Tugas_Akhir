import React, { createContext, useReducer } from "react";

export const tugasAkhirContext = createContext();

export const tugasAkhirReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        fileTask: action.payload,
      };
    case "REMOVE":
      return {
        fileTask: state.fileTask.filter(
          (dataFile) => dataFile._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const TugasAkhirContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tugasAkhirReducer, {
    fileTask: null,
  });

  return (
    <tugasAkhirContext.Provider value={{ ...state, dispatch }}>
      {children}
    </tugasAkhirContext.Provider>
  );
};
