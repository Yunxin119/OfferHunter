import Login from "./user/Login";
import { ToastContainer } from "react-toastify"
import { Routes, Route, Navigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Home";
import Register from "./user/Register";
import { useAuth } from "./hooks/AuthContext";
import { useState } from "react";
function App() {
  const { authUser } = useAuth();
  const [companies, setCompanies] = useState([]);
  return (
    <>
    <Routes>
      <Route path="/" element={!authUser ? <Navigate to = '/login'/> : <Home />} />
      <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login />} />
      <Route path='/signup' element={authUser ? <Navigate to="/"/> : <Register />} />
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
