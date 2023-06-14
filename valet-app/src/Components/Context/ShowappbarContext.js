import { useState, createContext } from "react";

export const ShowAppBar = createContext()

export function ShowappbarContext({children}) {
    const [show, setShow] = useState({show:false,display:"none"});
    return (
      <ShowAppBar.Provider value={{show,setShow}}>
       {children}
      </ShowAppBar.Provider>
    );
  }