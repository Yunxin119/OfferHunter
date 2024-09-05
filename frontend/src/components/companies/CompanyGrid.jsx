import React, { useEffect, useState } from 'react';
import SingleCompany from './SingleCompany';
import { toast } from 'react-toastify'; 

const CompanyGrid = ({ companies, setCompanies }) => {
  const [loading, setLoading] = useState(false);

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

  const [statusFilter, setStatusFilter] = useState('All');
  const filteredCompanies = companies.filter((company) => {
    if (statusFilter === 'All') return true;
    return company.status === statusFilter;
  })

  return (
    <div className="container mx-auto p-6">
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
      {loading ? (
        <div className='loading'></div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-1 items-center">
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
