import React , {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from "./Home";


const App = () => {
  const [userEmail, setUserEmail] = useState(""); 
  return (
    <Router>
      <Routes>
        <Route path="*" Component={Login} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/home" Component={Home} />
      </Routes>
    </Router>
  );
};

export default App;
