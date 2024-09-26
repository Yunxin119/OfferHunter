import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import useLogin from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, login } = useLogin()

    const submitHandler = async (e) => {
        e.preventDefault()
        await login({email, password})
    }

  return (
    <div className="flex h-screen p-4 items-center justify-center">
        <div className="absolute top-4 right-8">
        <ThemeToggle />
      </div>
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='bg-gray-450 w-full p-6 rounded-md shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            {/* Title */}
            <h1 className='text-3xl font-bold text-center text-gray-600'>
                Login
                <span className='text-blue-600'>OfferHunter</span>    
            </h1>
            {/* Form */}
            <form className='p-2'>
                {/* Email */}
                <label className='label p-2'>
                    <span className=' text-base prime-text'>Email</span>
                </label>
                <input type="email" 
                    placeholder="Who goes there?" 
                    class="input input-bordered w-full max-w-xs h-10 bg-opacity-80"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                />

                {/* Password */}
                <label className='label p-2'>
                    <span className=' text-base prime-text'>Password</span>
                </label>
                <input 
                    type="password" 
                    placeholder="Shh... it’s a secret" 
                    class="input input-bordered w-full max-w-xs h-10 bg-opacity-80" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                {/* No Account? */}
                <div className='prime-text p-2 items-center justify-center'>
                    New here?
                     <Link to = {'/signup'} className='hover:text-sky-500'> Let's get you started! </Link>
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
                        <span>Login</span>
                    )}
                </button>
            </form>
        </div>

    </div>
    </div>
  )
}

export default Login
