'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { set } from 'mongoose';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyEmailPage() {

    const searchParams = useSearchParams()
    
    const [verified, setVerified] = useState(false);
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
            setError(false)

        } catch (error: any) {
            setError(true)
        }
    }

    useEffect(() => {
        const searchToken = searchParams.get('token')

        // const urlTokenTwo = window.location.search.split("=")[1]
        setToken(searchToken || "")

    },[])

    useEffect(() => {
        setError(false)
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='bg-violet-400 m-4 p-4 rounded-3xl text-black'>
                {token? `${token}`: "No token"}
            </h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <Link className='bg-blue-600' href={"/login"}>Click to login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2>error</h2>
                </div>
            )}
        </div>
    )
}

export default VerifyEmailPage
