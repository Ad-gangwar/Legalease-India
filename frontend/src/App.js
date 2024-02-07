import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import ServiceProviders from './components/ServiceProvider/ServiceProviders';
import ServiceProviderDetails from './components/ServiceProvider/ServiceProviderDetails';
import SubServices from './components/SubServices';
import DocumentService from './components/DocService';
import { Toaster } from 'react-hot-toast';
import MyAccount from './components/my-account/Client/MyAccount';
import Dashboard from './components/my-account/ServiceProvider/Dashboard';
import serviceProviderContext from './components/context/ServiceProviderContext';
import ProtectedRoutes from './ProtectedRoutes';
import Notifications from './components/shared/Notifications';

export default function App() {
  const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);
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
        <serviceProviderContext.Provider value={{ selectedServiceProvider, setSelectedServiceProvider }}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/services' element={<Services />}></Route>
            <Route path='/subServices' element={<SubServices />}></Route>
            <Route path='/DocumentServices/:name' element={<DocumentService />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/notifications' element={<Notifications />}></Route>
            <Route path='serviceProvider/:serviceProviderId' element={<ServiceProviderDetails />}></Route>
            <Route path='/serviceProviders' element={<ServiceProviders />}></Route>
            <Route path='/clients/profile/me' element={<ProtectedRoutes allowedRoles={['client']}><MyAccount /></ProtectedRoutes>}></Route>
            <Route path='/serviceProviders/profile/me' element={<ProtectedRoutes allowedRoles={['serviceProvider']}><Dashboard /></ProtectedRoutes>}></Route>
          </Routes>
        </serviceProviderContext.Provider>
      </BrowserRouter>
    </div>
  );
}
