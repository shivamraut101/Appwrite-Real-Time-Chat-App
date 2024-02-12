import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const RegisterPage = () => {
  const {user, handleUserRegister} =useAuth()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState()
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
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={(e) => handleUserRegister(e, email, password,name)}>
          <div className="field--wrapper">
            <label>Name:</label>
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field--wrapper">
            <label>Email:</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <input
              className="btn btn--lg btn--main"
              type="submit"
              value="Signup"
            />
          </div>
        </form>
        <p>
          Have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
