'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {

    try {
      const res = await axios.post('/api/users/me');
      setData(res.data.data._id);

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }

  }

  const logout = async () => {
    try {
      await axios.get('api/users/logout')
      toast.success("Logout Success!");
      router.push("/login")
    }
     catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>UserProfile</h1>
      <h2 className='m-2 mt-4 border p-2 '>
        {data === "nothing"? "Nothing to display" : <Link className='text-blue-600 hover:underline' href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <button
      className='transition duration-500 bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl'
      onClick={logout}>
        Logout
      </button>

      <button
      className='transition duration-500 bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl'
      onClick={getUserDetails}>
        Get user details
      </button>
    </div>
  )
}


