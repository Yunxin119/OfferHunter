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

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <div className='loading'></div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-1 items-center">
          {companies.length > 0 ? (
            companies.map((company) => (
              <SingleCompany key={company.id} company={company} setCompanies={setCompanies} />
            ))
          ) : (
            <p>No companies available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyGrid;
