import React, {useState} from 'react'
import { useAuth } from '../hooks/AuthContext'
import { IoPerson } from 'react-icons/io5'
import useEditProfile from '../hooks/useEditProfile'

const EditProfile = () => {
    const {authUser} = useAuth()
    const [isOpen, setIsOpen] = useState(false);
    const { loading , editProfile} = useEditProfile();
    const [username, setUsername] = useState(authUser.username)
    const [email, setEmail] = useState(authUser.email)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const handleProfileUpdate = async(e) => {
        e.preventDefault();
        await editProfile({username, email, password, confirmPassword});
        setIsOpen(false);
    }

    const handleEditRequest = () => {
        setIsOpen(!isOpen);
    }

  return (
    <>
    <button className='btn btn-circle w-[4vw] h-[4vw] btn-ghost' onClick={handleEditRequest}>
        <IoPerson className='text-[1.6vw]'/>
    </button>

    {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30'>
            <div className='edit w-1/3'>
            {/* Form */}
            <form className='p-2'>
                    {/* Username */}
                    <label className='label p-2'>
                        <span className=' text-base prime-text'>Email</span>
                    </label>
                    <input 
                        type="email" 
                        placeholder={authUser.email}
                        className="input input-bordered w-full h-10 bg-opacity-80" 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* Username */}
                    <label className='label p-2'>
                        <span className=' text-base prime-text'>Username</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Pick an username" 
                        className="input input-bordered w-full h-10 bg-opacity-80" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {/* Password */}
                    <label className='label p-2'>
                        <span className=' text-base prime-text'>Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="********" 
                        className="input input-bordered w-full h-10 bg-opacity-80" 
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    {/* Confirm Password */}
                    <label className='label p-2'>
                        <span className=' text-base prime-text'>Confirm Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="********" 
                        className="input input-bordered w-full h-10 bg-opacity-80"
                        value={confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)} 
                    />
                    <div className="flex justify-center mt-6">
                        <button
                        type="button"
                        className="btn btn-secondary mr-2"
                        onClick={() => setIsOpen(false)}
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        onClick={handleProfileUpdate}
                        className={`btn btn-primary ${loading ? 'loading' : ''}`}
                        >
                        {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )}
    </>
  )
}

export default EditProfile
