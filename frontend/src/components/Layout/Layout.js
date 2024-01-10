import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

export default function Layout({children}) {
  return (
    <div className='h-100 w-100'>
      <Navbar />
       {children}
      <Footer />
    </div>
  )
}
