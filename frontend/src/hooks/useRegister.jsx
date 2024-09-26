import { useAuth } from "./AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";

const useRegister = () => {
    const [loading, setLoading]  = useState(false);
    const { setAuthUser } = useAuth();

    const register = async ({ email, username, password, confirmPassword }) => {
        if (!email || !username || !password || !confirmPassword) {
            toast.error('Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password, confirmPassword })
            });

            const data = await res.json();
            
            if (!res.ok) {
                const errorMessage = data.msg || data.message || 'Registration failed';
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }


            localStorage.setItem('userInfo', JSON.stringify(data));
            setAuthUser(data); 

            toast.success('Registration successful!');
        } catch (error) {
            toast.error(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};

export default useRegister;
