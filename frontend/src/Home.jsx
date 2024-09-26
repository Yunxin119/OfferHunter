import React, {useState} from 'react'
import CompanyGrid from "./components/companies/CompanyGrid"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import { useAuth } from './hooks/AuthContext'

const Home = () => {
    const [companies, setCompanies] = useState([]);
  return (
    <>
      <Sidebar companies={companies}/>
      <Navbar setCompanies={setCompanies}/>
      <CompanyGrid companies={companies} setCompanies={setCompanies}/>
    </>

  )
}

export default Home
