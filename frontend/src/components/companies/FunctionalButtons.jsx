import React from 'react'
import { IoMdSearch, IoMdRefresh } from 'react-icons/io';

const FunctionalButtons = ({isReverse, setIsReverse, isOpen, setIsOpen, searchInput, setSearchInput}) => {
    const handleReverse = () => {
        setIsReverse(!isReverse);
      }
    
      const handleClick = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
      }
    
      const handleSearchClick = (e) => {
        e.stopPropagation();
      }
    
      const handleSubmit = () => {
        setIsOpen(false);
      }
    
      const handleRefresh = () => {
        setSearchInput('');
        setStatusFilter('All');
      }
    
  return (
    <>
        <div className='flex flex-row items-center'>
            <div className='btn btn-ghost btn-circle' onClick={handleClick}>
                <IoMdSearch className='text-2xl'/>
            </div>

            <div>
            <button
                className="btn btn-ghost btn-circle"
                onClick={handleRefresh}
            >
                <IoMdRefresh className='text-2xl'/>
            </button>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <label className='text-gray-200'>Reverse</label>
                <input type="checkbox" className="toggle toggle-sm" onChange={handleReverse} />
            </div>
        </div>



    {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50"
        onClick={handleClick}>
        
            <div className="relative flex flex-row top-[20%]" onClick={handleSearchClick}>
                <label className="input bg-gray-100 bg-opacity-50 input-bordered w-60 md:w-64 lg:w-72 xl:w-80 h-12 items-center justify-center gap-2">
                  <input type="text" className="grow mt-2.5 text-gray-50 placeholder-gray-200" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                </label>
                <button className="btn btn-ghost mx-2" onClick={handleSubmit}>
                  Done
                </button>
              </div>
        </div>

    )}
    </>

  )
}

export default FunctionalButtons
