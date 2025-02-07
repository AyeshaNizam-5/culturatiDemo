import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthState from "../hooks/useAuthState"; 
import './login.css'

const Form = () => {
  const { username, setUsername, password, setPassword, error, setError, attempts, setAttempts } = useAuthState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (!username || !password ) {
  //     setError("All fields are required.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post("/api/auth/login", {
  //       username,
  //       password,
  //     });

  //     dispatch(loginUser(response.data)); 
  //     navigate("/dashboard"); 
  //   } catch (err) {
  //     setAttempts(attempts + 1);
  //     setError("Invalid credentials.");
  //     if (attempts + 1 >= 3) {
  //       setError("Account locked. Check your email to unlock.");
  //     }
  //   }
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password ) {
      setError("All fields are required.");
      return;
    }
  
    const mockUser = {
      username: "admin",
      password: "password123",
      token: "fake-jwt-token",
      role: "admin",
    };
  
    if (username === mockUser.username && password === mockUser.password ) {
      dispatch(loginUser({ token: mockUser.token, role: mockUser.role })); // Simulate Redux login
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      setAttempts(attempts + 1);
      setError("Invalid credentials or captcha.");
      if (attempts + 1 >= 3) {
        setError("Account locked. Check your email to unlock.");
      }
    }
  };
  
  return (
    <StyledWrapper>
      <div className="form-container">
        <p className="title">Welcome back</p>
        <form className="form" onSubmit={handleLogin}>
          <input type="text" className="input" placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
          <input type="password" className="input" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}/>
          <p className="page-link">
            <span className="page-link-label">Forgot Password?</span>
          </p>
          <button className="form-btn" type='submit'>Log in</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  
}`;

export default Form;
