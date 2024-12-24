import { useNavigate } from "react-router-dom";


const Login = ({ handleGoBack }) => {
  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginBox">
          <h1 className="header">Login Project</h1>
          <div className="loginDiv">
            <h2 className="miniHeader">Login</h2>
            <form action="/authenticate" method="post">
              <div className="formGroup">
                <label className="inputLabel">Username </label>
                <input className="inputField" name="username" type="text"/> <br />
                <br />
              </div>

              <div className="formGroup">
                <label className="inputLabel">Password </label>
                <input className="inputField" name="password" type="password"/> <br />
                <br />
              </div>
              <button type="submit" className="submit2">
                Login
              </button>
              <button type="submit" className="submit2">
                Sign in with Oauth
              </button>
              <button type="submit" className="submit2">
                Continue as guest
              </button>
              
              
             
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