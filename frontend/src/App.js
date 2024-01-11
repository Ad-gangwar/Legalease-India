import React from 'react'
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

export default function App() {
  return (
    <div className='h-100 w-100'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/services' element={<Services />}></Route>
          <Route path='/subServices' element={<SubServices/>}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='lawyer/:lawyerId' element={<LawyerDetails />}></Route>
          <Route path='/lawyers' element={<Lawyers />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
