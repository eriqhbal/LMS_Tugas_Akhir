import { useEffect, createContext, useReducer } from "react";

export const userContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload
      };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};
