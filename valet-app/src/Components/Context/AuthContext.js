import React, { createContext, useState, useEffect } from "react";
// Create the AuthContext
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(
    localStorage.getItem("valet-auth-token") ? true : false
  );
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("valet-auth-token");
    setIsVerified(false);
    navigate("/");
  };

  // Provide the authentication context values
  const authContextValues = {
    isVerified,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};
