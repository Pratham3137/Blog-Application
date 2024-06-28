import { createContext, useContext } from "react";

export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const storeUserDataInLS = (serverToken, userId, userName) => {
    localStorage.setItem("token", serverToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", userName)
  };
  
  return (
    <UserContext.Provider value={{storeUserDataInLS}}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () =>{
    return useContext(UserContext)
}
