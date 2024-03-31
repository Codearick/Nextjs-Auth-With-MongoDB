"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const LoginPage = () => {

  const router = useRouter();

  const [user, setUser] = useState(
    {
      email: "",
      password: "",
    }
  )
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user)
      console.log("Login success", response.data)
      toast.success("Login Success")
      router.push('/profile')

    } catch (error: any) {
      console.log("Login failed");
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 ) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
      <h1 className='text-4xl m-5 p-3'> {loading ? "Processing" : "Login"}</h1>

      <div className='border py-10 px-16 flex flex-col'>

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
        onClick={onLogin}
        className='border p-3 my-2 mb-4 rounded-lg'>
        {buttonDisabled ? "Fill to Login" : "Login"}
      </button>

      <Link href={'/signup'}>
        <button className='hover:underline m-2 mx-4 rounded-lg'>
        Click to Signup
        </button>
      </Link>

      </div>

    </div>
  )
}

export default LoginPage