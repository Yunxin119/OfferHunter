import CompanyGrid from "./components/companies/CompanyGrid"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  const [companies, setCompanies] = useState([]);
  return (
    <>
    <Navbar setCompanies={setCompanies}/>
    <CompanyGrid setCompanies={setCompanies}/>
    <ToastContainer />
    </>
  )
}

export default App
