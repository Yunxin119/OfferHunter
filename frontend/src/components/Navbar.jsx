import React from 'react'
import logo from '../assets/logo.png'
import ThemeToggle from './ThemeToggle'
import { IoMdLogOut, IoMdSearch } from "react-icons/io";
import { IoMoon, IoSunny, IoMenu } from "react-icons/io5";
import AddCompany from './AddCompany';
import Search from './Search';

const Navbar = ({setCompanies}) => {
  return (
<div className="navbar bg-base-200 bg-opacity-40">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <IoMenu className='w-6 h-6' />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>In Progress</a></li>
        <li><a>Rejected</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">
      <img src={logo} alt="logo" className=" h-12" />
    </a>
  </div>
  <div className="navbar-end">

    <AddCompany setCompanies={setCompanies}/>
    <button className="btn btn-ghost btn-circle">
      <IoMdLogOut className='w-6 h-6' />
    </button>


    {/* TODO: THEME CONTROL */}
    <button className="btn btn-ghost btn-circle">

    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller gap-2" value="forest" />
        <IoSunny className="swap-off h-7 w-7 fill-current" />
        <IoMoon className="swap-on h-7 w-7 fill-current" />

    </label>
    </button>



  </div>
</div>
  )
}

export default Navbar
