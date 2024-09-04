import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetCompany = () => {
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const getCompanies = async() => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/api/companies");
            const data = await response.json();
            if (data.error) {
                toast.error(data.error)
                return;
            }
            setCompanies(data);
        } catch (error) {
            toast.error("Error fetching company");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCompanies();
    }, [] )
    return {loading, companies, getCompanies};
}

export default useGetCompany;