import React, {useState} from 'react'
import { IoMdSearch  } from "react-icons/io";

const Search = ({companies, setCompanies}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const handleClick = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    const handleSearchClick = (e) => {
        e.stopPropagation();
    }

    const handleSubmit = () => {
      setIsOpen(false);
      return searchInput;
    }

  return (
    <>
    {/* Button */}
    <div className='btn btn-ghost btn-circle' onClick={handleClick}>
        <IoMdSearch className='text-2xl'/>
    </div>

    {/* Search Feature */}
    {isOpen && (
    <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-40"
    onClick={handleClick}>
    
        <div className="relative flex flex-row top-[20%]" onClick={handleSearchClick}>
            <label className="input input-bordered w-60 md:w-64 lg:w-72 xl:w-80 h-12 items-center justify-center gap-2">
              <input type="text" className="grow mt-2.5" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            </label>
            <button className="btn btn-ghost text-white mx-2" onClick={handleSubmit}>
              <IoMdSearch className="text-2xl" />
            </button>
          </div>
    </div>

    )}
    </>

  )
}

export default Search
