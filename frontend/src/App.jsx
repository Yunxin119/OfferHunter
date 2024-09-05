import CompanyGrid from "./components/companies/CompanyGrid"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  const [companies, setCompanies] = useState([]);
  return (
    <>
    <Sidebar companies={companies}/>
    <Navbar setCompanies={setCompanies}/>
    <CompanyGrid companies={companies} setCompanies={setCompanies}/>
    <ToastContainer />
    </>
  )
}

export default App
