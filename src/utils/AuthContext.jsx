import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleInputLogin = async (e, email, password) => {
    e.preventDefault();
    try {
      const response = await account.createEmailSession(email, password);
      console.log("LogIn Done", response);
      const accountdDetails = await account.get();
      console.log("from handlelogin", accountdDetails);
      setUser(accountdDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserLogOut = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const handleUserRegister = async (e, email, password, name) => {
    e.preventDefault();
    try {
      let response = await account.create(ID.unique(), email, password, name);
      console.log("registered", response);
      await account.createEmailSession(email,password)
      const accountdDetails = await account.get();
      console.log("From UserRegistered", accountdDetails);
      setUser(accountdDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const contextData = {
    user,
    handleInputLogin,
    handleUserLogOut,
    handleUserRegister,
  };

  useEffect(() => {
    getUserOnLoad();
  }, []);

  const getUserOnLoad = async () => {
    try {
      const accountdDetails = await account.get();
      console.log("UserOnload", accountdDetails);
      setUser(accountdDetails);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
