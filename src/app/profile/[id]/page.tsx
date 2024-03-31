import React from 'react'

function page({params} : any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-5'>
      <h1 className='text-3xl'>Profile page</h1>
      <h2 className='bg-violet-300 m-2 p-3 rounded text-black'>{params.id}</h2>
    </div>
  )
}

export default page
