import React, { useEffect, useState } from 'react';
import SingleCompany from './SingleCompany';
import { toast } from 'react-toastify'; 
import { IoMdSearch, IoMdRefresh } from 'react-icons/io';
import Search from '../Search';

const CompanyGrid = ({ companies, setCompanies }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isReverse, setIsReverse] = useState(false);

  useEffect(() => {
    const getCompanies = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:5000/api/companies");
        const data = await response.json();
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setCompanies(data);
      } catch (error) {
        toast.error("Error fetching company");
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, [setCompanies]);

  // Filter Feature
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchInput, setSearchInput] = useState('');

  const filteredCompanies = companies
  .sort((a, b) => {
    if (a.status === 'Rejected' && b.status !== 'Rejected') return 1;
    if (a.status !== 'Rejected' && b.status === 'Rejected') return -1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);})
  .filter((company) => {
    if (statusFilter === 'All') return company.status !== 'Rejected';
    return company.status === statusFilter;
  })
  .filter((company) => {
    return company.name.toLowerCase().includes(searchInput.toLowerCase());
  });

  const reversedCompanies = [...filteredCompanies].reverse();
  
  const handleReverse = () => {
    setIsReverse(!isReverse);
  }

  // Search Feature

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
    <div className="container mx-auto p-6">
      <div className="flex flex-row justify-between items-center">
      {/* Filter Box */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-1"
        >
          <option value="All">All</option>
          <option value="Submitted">Submitted</option>
          <option value="OA">OA</option>
          <option value="Interview1">Interview1</option>
          <option value="Interview2">Interview2</option>
          <option value="Interview3">Interview3</option>
          <option value="Rejected">Rejected</option>
          <option value="In Progress">In Progress</option>
        </select>
        <span className="ml-3 text-gray-500 text-sm">Showing {filteredCompanies.length} companies</span>
      </div>
      <div className='flex flex-row items-center'>

        {/* Search Input */}
        {/* Button */}
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

      </div>

      {loading ? (
        <div className='loading'></div>
      ) : isReverse ? (
        <div className="grid gap-6 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
          {reversedCompanies.length > 0 ? (
            reversedCompanies.map((company) => (
              <SingleCompany key={company.id} company={company} setCompanies={setCompanies} />
            ))
          ) : (
            <p className="text-center text-xl">No companies found</p>
          )}
        </div>
      ):
      (
        <div className="grid gap-6 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <SingleCompany key={company.id} company={company} setCompanies={setCompanies} />
            ))
          ) : (
            <p className="text-center text-xl">No companies found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyGrid;
