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
                <label>Reverse</label>
                <input type="checkbox" className="toggle toggle-sm" onChange={handleReverse} />
            </div>
        </div>



    {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-40"
        onClick={handleClick}>
        
            <div className="relative flex flex-row top-[20%]" onClick={handleSearchClick}>
                <label className="input input-bordered w-60 md:w-64 lg:w-72 xl:w-80 h-12 items-center justify-center gap-2">
                  <input type="text" className="grow mt-2.5" placeholder="Search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                </label>
                <button className="btn btn-primary text-white mx-2" onClick={handleSubmit}>
                  Done
                </button>
              </div>
        </div>

    )}
    </>

  )
}

export default FunctionalButtons
