import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { useState } from "react";

const useLogin = () => {
    const { setAuthUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const login = async ({ email, password }) => {
        if (!email || !password) {
            toast.error('Please fill all fields');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json()
            if (!res.ok) { 
                toast.error(data.error || 'Login failed, please try again.');
                return; 
            }
            localStorage.setItem('userInfo', JSON.stringify(data));
            setAuthUser(data);
            toast.success('Login successful!');
        } catch (error) {
            toast.error('An error occurred during login');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;
