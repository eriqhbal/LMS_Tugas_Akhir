import React, { createContext, useContext, useState } from "react";

export const actContext = createContext();

const itemExist = {
  userProfile: false,
};

export const ActContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState("#022c22");
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const activate = true;
  const [initialValue, setInitialValue] = useState(itemExist);

  function handleClicked(clicked) {
    setInitialValue({ ...itemExist, [clicked]: true });
  }

  function cancelClicked(clicked) {
    setInitialValue({ ...itemExist, [clicked]: false });
  }

  return (
    <actContext.Provider
      value={{
        activate,
        activeMenu,
        setActiveMenu,
        currentColor,
        initialValue,
        setCurrentColor,
        handleClicked,
        cancelClicked,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </actContext.Provider>
  );
};

export const useActContext = () => useContext(actContext);
