import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
require('dotenv').config();


export const SignUp = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const hostUrl = process.env.hostURL || "https://localhost:5000";

const handleNavigateSignUp = () => {
  navigate("/Login");
};

const handlePasswordChange = passwordInput => {
  setPassword(passwordInput.target.value);
};

const handleUsernameChange = usernameInput => {
  setUsername(usernameInput.target.value);
};

const handleSignup = async () => {
  try {
  const response = await axios.post(`${hostUrl}/signup`, {
    username,
    password,
  });

  console.log(response.data);
  
  alert('Signup success');
} catch (err) {
    console.log(err.response.data);
    alert('Signup Fail: ', err.response.data.message)
  };
};

    return (
      <>
        <div className="loginContainer">
          <div className="loginBox">
            <h1 className="header">Sign up here</h1>
            <div className="loginDiv">
              {/* <h2 className="miniHeader"></h2> */}
              <form action="/signup" method="POST" onSubmit={() => handleSignup}>
                <div className="formGroup">
                  <label className="inputLabel">Username </label>
                  <input className="inputField" value={username} onChange={(e) => handleUsernameChange} required /> <br />
                  <br />
                </div>
  
                <div className="formGroup">
                  <label className="inputLabel">Password </label>
                  <input className="inputField" value={password} onChange={(e) => handlePasswordChange} required /> <br />
                  <br />
                </div>
                <button type="submit" className="submit">
                  Sign up
                </button>
              </form>
            </div>
          </div>
          <div className="goBack" onClick={handleNavigateSignUp}>
            <p className="arrow">&lt;</p>
          </div>
        </div>
      </>
    );
  
  
  // export default SignUp;