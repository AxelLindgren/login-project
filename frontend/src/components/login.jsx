import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleGoBack }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const hostUrl = process.env.REACT_APP_HOST_URL || "http://localhost:5000";

  const handleNavigateSignUp = () => {
    navigate("/signup-page");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${hostUrl}/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      alert("Login Success");
      console.log(response.data);
    } catch (err) {
      console.log(err);
      alert("Login Fail: " + err);
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginBox">
          <h1 className="header">Login Project</h1>
          <div className="loginDiv">
            <h2 className="miniHeader">Login</h2>
            <form action="/login" method="POST" onSubmit={handleSubmit}>
              <div className="formGroup">
                <label className="inputLabel">Username </label>
                <input
                  className="inputField"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />{" "}
                <br />
                <br />
              </div>

              <div className="formGroup">
                <label className="inputLabel">Password </label>
                <input
                  className="inputField"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
                <br />
                <br />
              </div>
              <button type="submit" className="submit2">
                Login
              </button>
              {/* <button type="submit" className="submit2">
                Sign in with Oauth
              </button>
              <button type="submit" className="submit2">
                Continue as guest
              </button> */}
            </form>
            <button
              type="submit"
              className="submit2"
              onClick={handleNavigateSignUp}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="goBack" onClick={handleNavigateSignUp}>
          <p className="arrow">&lt;</p>
        </div>
      </div>
    </>
  );
};

export default Login;
