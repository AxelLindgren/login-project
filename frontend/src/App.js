import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/signup';
import { Navigate } from 'react-router-dom';

function App() {
  
  return (
    <>
    <Router>
    <div className="App">
      <header className="App-header">
        
        <Routes>
          <Route element={<Navigate to={"/login-page"} />} path='/' />
          <Route element={<Login />} path='/login-page' />
          <Route element={<SignUp />} path='/signup-page' />
        </Routes>
      </header>
    </div>
    </Router>
    </>
  );
}

export default App;
