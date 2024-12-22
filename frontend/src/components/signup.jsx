import { useNavigate } from "react-router-dom";


  const SignUp = () => {

    const navigate = useNavigate();

const handleNavigateSignUp = () => {
  navigate("/Login");
};

    return (
      <>
        <div className="loginContainer">
          <div className="loginBox">
            <h1 className="header">Task Manager</h1>
            <div className="loginDiv">
              <h2 className="miniHeader">Sign Up</h2>
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