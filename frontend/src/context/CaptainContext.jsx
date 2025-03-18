import { createContext, useState, useEffect } from "react";
import axios from "axios"; // For API calls

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };
  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError, // Added setError
  };
  

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
