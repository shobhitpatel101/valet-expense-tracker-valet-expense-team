import React from "react";
import { IconContext } from "react-icons";
function ReactIcons({styles,children}) {
  return (
    <IconContext.Provider
      value={{style:styles}}
    >
      {children}
    </IconContext.Provider>
  );
}

export default ReactIcons;
