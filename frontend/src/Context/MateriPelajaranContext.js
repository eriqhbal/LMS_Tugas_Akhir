import React, { createContext, useReducer } from "react";

export const MateriContext = createContext();

export const materiReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        materiFe: action.payload,
      };
    case "REMOVE":
      return {
        materiFe: state.materiFe.filter(
          (dataMateri) => dataMateri._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const MateriContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(materiReducer, {
    materiFe: null,
  });
  return (
    <MateriContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MateriContext.Provider>
  );
};
