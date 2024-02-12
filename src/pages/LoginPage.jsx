import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";

export const LoginPage = () => {
  const { user, handleInputLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

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
                <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                placeholder="Enter your password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginRight: "5px" }}
              />
              {showPassword ? (
                <EyeOff
                  onClick={handleTogglePassword}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <Eye
                  onClick={handleTogglePassword}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            </div>
            <div className="field--wrapper"> 
               <input className="btn btn--lg btn--main" type="submit" value="Login" />
            </div>
          </form>
          <p>Don't have an account? <Link to="/signup">Register here</Link></p>
      </div>
    </div>
    </>
  )
};
