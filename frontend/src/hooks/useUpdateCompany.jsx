import { useState } from 'react';
import { toast } from 'react-toastify';

const useUpdateCompany = () => {
    const [loading, setLoading] = useState(false);
    const [updatedCompany, setUpdatedCompany] = useState(null); 

    const updateCompany = async (companyId, updatedData) => {
        if (!companyId) {
            toast.error('Invalid company ID');
            return null;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/companies/${companyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || 'Failed to update company');
                throw new Error(errorData.message || 'Failed to update company');
            }

            const data = await response.json();
            setUpdatedCompany(data); 
            toast.success('Company updated successfully');
            return data;
        } catch (err) {
            toast.error('Error updating company');
            console.error('Error updating company:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, updatedCompany, updateCompany }; 
};

export default useUpdateCompany;