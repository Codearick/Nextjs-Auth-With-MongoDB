"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignupPage = () => {

  const router = useRouter();

  const [user, setUser] = useState(
    {
      email: "",
      password: "",
      username: "",
    }
  )
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data)
      toast.success("Signup Success")
      router.push('/login')

    } catch (error: any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <h1 className='text-4xl m-5 p-3'> {loading ? "Processing" : "Signup"}</h1>

      <div className='flex flex-col border py-10 px-[8vw]'>
      <label htmlFor="username">Username:</label>
      <input
        className='text-black p-2 rounded-xl my-3'
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='Username'
        type='text'
      />

      <label htmlFor="email">Email:</label>
      <input
        className='text-black p-2 rounded-xl my-3'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Email'
        type='text'
      />

      <label htmlFor="password">Password:</label>
      <input
        className='text-black p-2 rounded-xl my-3'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Password'
        type='password'
      />

      <button
        onClick={onSignup}
        className='border p-3 m-2 mb-4 rounded-lg'>
        {buttonDisabled ? "Fill to signup" : "Signup"}
      </button>

      <Link href={'/login'}>
        <button className='hover:underline hover:text-blue-500 p-3 m-2 mx-4 rounded-full'>
        Click to login
        </button>
      </Link>
      </div>

    </div>
  )
}

export default SignupPage