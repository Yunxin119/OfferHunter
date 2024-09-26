import React, {useState} from 'react'
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
const useLogout = () => {
    const { authUser, setAuthUser } = useAuth()
    const [loading, setLoading] = useState(false);

    const logout = async() => {
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authUser.token}`,
                },
            });
            const data = await res.json()
            if (data.error) {
                toast.error(data.error);
                throw new Error(data.error);
            }
            localStorage.removeItem('userInfo');
            setAuthUser(null);
            toast.success('Logout successful!');
        } catch {
            toast.error('An error occurred during logout');
        } finally {
            setLoading(false);

        }

    }
    return { loading, logout }
}

export default useLogout
