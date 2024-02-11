import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { user, handleInputLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <>
    <div className="auth--container">
      <div className="form--wrapper">
          <form onSubmit={(e)=> handleInputLogin(e,email,password)}>
            <div className="field--wrapper">
                <label>Email:</label>
                <input 
                      type="email"
                      required
                      name="email"
                      placeholder="Enter your email..."
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div className="field--wrapper">
                <label>Password:</label>
                <input 
                      type="password"
                      required
                      name="password"
                      placeholder="Enter your password..."
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div className="field--wrapper"> 
               <input className="btn btn--lg btn--main" type="submit" value="Login" />
            </div>
          </form>
      </div>
    </div>
    </>
  )
};
