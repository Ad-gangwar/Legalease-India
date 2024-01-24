import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Lawyers from './components/Lawyer/Lawyers';
import LawyerDetails from './components/Lawyer/LawyerDetails';
import SubServices from './components/SubServices';
import DocumentService from './components/DocService';
import toast, { Toaster } from 'react-hot-toast';
import MyAccount from './components/my-account/User/MyAccount';
import Dashboard from './components/my-account/Lawyer/Dashboard';
import lawyerContext from './components/context/LawyerContext';


export default function App() {
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  return (
    <div className='h-100 w-100'>
      <Toaster toastOptions={{
        className: 'bg-dark',
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'white',
        },
      }} />
      <BrowserRouter>
        <lawyerContext.Provider value={{ selectedLawyer, setSelectedLawyer }}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/services' element={<Services />}></Route>
            <Route path='/subServices' element={<SubServices />}></Route>
            <Route path='/DocumentServices/:name' element={<DocumentService />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='lawyer/:lawyerId' element={<LawyerDetails />}></Route>
            <Route path='/lawyers' element={<Lawyers />}></Route>
            <Route path='/users/profile/me' element={<MyAccount />}></Route>
            <Route path='/lawyers/profile/me' element={<Dashboard />}></Route>
          </Routes>
        </lawyerContext.Provider>
      </BrowserRouter>
    </div>
  );
}
