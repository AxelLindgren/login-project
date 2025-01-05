import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const hostUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleNavigateSignUp = () => {
    navigate("/login-page");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password)
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(username)
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${hostUrl}/signup`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      alert("Signup success");
      navigate("/login-page");
    } catch (err) {
      console.log(err.response.data);
      alert(`Signup Fail: ${err.response?.data?.message}`);
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginBox">
          <h1 className="header">Sign up here</h1>
          <div className="loginDiv">
            <form action="/signup" method="POST" onSubmit={handleSignup}>
              <div className="formGroup">
                <label className="inputLabel">Username </label>
                <input
                  className="inputField"
                  value={username}
                  onChange={handleUsernameChange}
                  type="text"
                  required
                />{" "}
                <br />
                <br />
              </div>

              <div className="formGroup">
                <label className="inputLabel">Password </label>
                <input
                  className="inputField"
                  value={password}
                  type="password"
                  onChange={handlePasswordChange}
                  required
                />{" "}
                <br />
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
};

export default SignUp;
