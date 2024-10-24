import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import useRegister from '../hooks/useRegister'
import ThemeToggle from '../components/ThemeToggle'
const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {loading, register} = useRegister()

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log({email, username, password, confirmPassword})
        await register({email, username, password, confirmPassword})
    }

  return (
    <div className="flex h-screen p-4 items-center justify-center">
                <div className="absolute top-4 right-8">
        <ThemeToggle />
      </div>
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='bg-gray-450 w-full p-6 rounded-md shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            {/* Title */}
            <h1 className='text-3xl font-bold text-center text-gray-300'>
                Signup
                <span className='text-blue-600'>OfferHunter</span>    
            </h1>
            {/* Form */}
            <form className='p-2'>
                    {/* Username */}
                        <label className='label p-2'>
                        <span className=' text-base prime-text'>Email</span>
                    </label>
                    <input 
                        type="email" 
                        placeholder="Enter your email here" 
                        class="input input-bordered w-full max-w-xs h-10 bg-opacity-80" 
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
                        class="input input-bordered w-full max-w-xs h-10 bg-opacity-80" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {/* Password */}
                    <label className='label p-2'>
                        <span className=' text-base prime-text'>Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Choose a secret code" 
                        class="input input-bordered w-full max-w-xs h-10 bg-opacity-80" 
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                    {/* Confirm Password */}
                    <label className='label p-2'>
                        <span className=' text-base prime-text'>Confirm Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Type it again to be sure" 
                        class="input input-bordered w-full max-w-xs h-10 bg-opacity-80"
                        value={confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)} 
                    />
                {/* No Account? */}
                <div className='prime-text p-2 items-center justify-center'>
                    Already Have an Account?
                     <Link to = {'/login'} className='hover:text-sky-500'> Log in Here! </Link>
                </div>
                {/* Log In Button */}
                <button 
                    type="submit" 
                    className="btn glass btn-block mt-2"
                    onClick={submitHandler}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        <span>Register</span>
                    )}
                </button>
            </form>
        </div>

    </div>
    </div>
  )
}

export default Register
