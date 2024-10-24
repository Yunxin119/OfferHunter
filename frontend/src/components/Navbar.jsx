import React from 'react'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'
import { IoMdLogOut, IoMdSearch } from "react-icons/io";
import { IoMoon, IoSunny, IoMenu } from "react-icons/io5";
import AddCompany from './AddCompany';
import Search from './Search';
import { useAuth } from '../hooks/AuthContext';
import  useLogout from '../hooks/useLogout';
import EditProfile from '../user/EditProfile';

const Navbar = ({setCompanies}) => {
  const authUser = useAuth();
  const { loading, logout } = useLogout();

  const handleLogOut = async() => {
    await logout();
  }
  return (
<div className="navbar bg-transparent h-[10vh]">
  <div className="navbar-start">
  <AddCompany setCompanies={setCompanies}/>
  < EditProfile />
    {/* <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <IoMenu className='w-6 h-6' />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>In Progress</a></li>
        <li><a>Rejected</a></li>
      </ul>
    </div> */}
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">
      <img src={logo} alt="logo" className=" h-12" />
    </a>
  </div>
  <div className="navbar-end">
  <ThemeToggle />
    <button className="btn btn-ghost btn-circle" onClick={handleLogOut}>
      {loading ? (<div className='loading spin' />): (<IoMdLogOut className='w-6 h-6' />)}
    </button>
    {/* TODO: THEME CONTROL */}
      
    {/* <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller gap-2" value="forest" />
        <IoSunny className="swap-off h-7 w-7 fill-current" />
        <IoMoon className="swap-on h-7 w-7 fill-current" />

    </label> */}



  </div>
</div>
  )
}

export default Navbar
