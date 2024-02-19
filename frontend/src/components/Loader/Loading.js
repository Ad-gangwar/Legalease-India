import React from 'react'
import HashLoader from 'react-spinners/HashLoader';


export default function Loading() {
  return (
    <div className='d-flex align-items-center justify-content-center w-100 h-100 my-5 py-5'>
      <HashLoader color='red' size={90}/>
    </div>
  )
}
