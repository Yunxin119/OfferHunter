import React, {useState} from 'react'
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const useEditProfile = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuth()
    const editProfile = async ({username, email, password, confirmPassword}) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authUser.token}`,
                },
                body: JSON.stringify({ username, email, password, confirmPassword }),  // 发送更新数据
            });
            const data = await response.json();
            if (data.error) {
                toast.error(data.error);
                throw new Error(data.error);
            }
            setAuthUser(data);
        } catch (error) {
            toast.error(`An error occurred during updating profile: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }
    
  return {loading, editProfile}
}

export default useEditProfile
