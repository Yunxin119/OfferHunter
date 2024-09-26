import React, { useEffect, useState } from 'react';
import SingleCompany from './SingleCompany';
import { toast } from 'react-toastify'; 
import Filter from './Filter';
import FunctionalButtons from './FunctionalButtons';
import { useAuth } from '../../hooks/AuthContext';

const CompanyGrid = ({ companies, setCompanies }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const { authUser } = useAuth();
  const validCompanies = Array.isArray(companies) ? companies : [];

  useEffect(() => {
    const getCompanies = async () => {
      setLoading(true);
      try {
        // Ensure the user is authenticated and has a token
        if (!authUser || !authUser.token) {
          toast.error('User is not authenticated.');
          setLoading(false);
          return;
        }

        // Make the API call to fetch companies
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            'Content-Type': 'application/json', // Make sure the content type is set
          },
        });

        // Check if the request was successful
        if (response.status === 401) {
          toast.error('Unauthorized: Please log in again.');
          setLoading(false);
          return;
        }

        // Handle success
        const data = await response.json();
        if (response.ok) {
          setCompanies(data);
        } else {
          toast.error(data.message || 'Error fetching companies');
        }
      } catch (error) {
        console.error("Error fetching company:", error);
        toast.error("Error fetching company");
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, [setCompanies, authUser]);


  // Filter Feature
  const filteredCompanies = validCompanies
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row justify-between items-center">
      {/* Filter Box */}
      <Filter 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter} 
        filteredCompanies={filteredCompanies}
       />
       {/* Functional Buttons */}
       <FunctionalButtons
        isReverse={isReverse}
        setIsReverse={setIsReverse}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        />
    </div>

      {loading ? (
        <span className="loading loading-ring loading-lg"></span>
      ) : 
      isReverse ? (
        <div className="grid gap-6 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
          {reversedCompanies.length > 0 ? (
            reversedCompanies.map((company) => (
              <SingleCompany key={company.id} company={company} setCompanies={setCompanies} />
            ))
          ) : (
            <p className="text-center text-xl">No companies found</p>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
          { filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <SingleCompany key={company.id} company={company} setCompanies={setCompanies} />
            ))
          ):(
            <p className="text-center text-xl">No companies found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyGrid;
