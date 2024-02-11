import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate()

  const handleInputLogin = async (e,email,password)=>{
    e.preventDefault()
    try {
      const response = await account.createEmailSession(email, password);
      console.log("LogIn Done", response)
      const accountdDetails = account.get()
      setUser(accountdDetails)
      navigate("/")
    }catch (error) {
      console.error(error);
    }
  }

  const contextData = {
      user,
      handleInputLogin
  };

  useEffect(()=>{
    setLoading(false); 
  },[])
  
  return <AuthContext.Provider value={contextData}>
          {loading ? <p>Loading...</p>: children}
        </AuthContext.Provider>
};

export const useAuth = () =>{
  return useContext(AuthContext)
}

export default AuthContext
