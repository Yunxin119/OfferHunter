import React from 'react'
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify';

const useGetSingleCompany = () => {
    [loading, setLoading] = useState(false);
    [company, setCompany] = useState({});
    useEffect(() => {
        const getSingleCompany = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies/${selectedCompany.id}`);
                data = await response.json();
                setCompany(data);
            } catch (error) {
                toast.error("Error fetching company");
            } finally {
                setLoading(false);
            }

        getSingleCompany();
        return loading, company;
    }})
}

export default useGetSingleCompany
