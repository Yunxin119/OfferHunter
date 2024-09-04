import React, { useEffect } from 'react'
import useGetCompany from '../../hooks/useGetCompany';
import SingleCompany from './SingleCompany';

const CompanyGrid = ({ setCompanies }) => {
    const {loading, companies, getCompanies} = useGetCompany();
    useEffect(() => {
        getCompanies();
    },[companies])

  return (
    <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-1 items-center">

            {companies.map((company) => (
                <SingleCompany key={company.id} company={company} setCompanies={setCompanies}/>
            ))}
        </div>
    </div>

  )
}

export default CompanyGrid
