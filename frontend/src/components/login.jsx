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
            <form>
              <div className="formGroup">
                <label className="inputLabel">Username </label>
                <input className="inputField" /> <br />
                <br />
              </div>

              <div className="formGroup">
                <label className="inputLabel">Password </label>
                <input className="inputField" /> <br />
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
              <button
                type="submit"
                className="submit2"
                onClick={handleNavigateSignUp}
              >
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

export default Login;