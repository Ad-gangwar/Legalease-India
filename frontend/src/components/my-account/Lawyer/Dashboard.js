import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Profile from './Profile';
import userGetProfile from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import Error from '../../Error/Error';
import Layout from '../../Layout/Layout';
import ServiceReqs from './ServiceReqs';
import Overview from './Overview';

export default function MyAccount() {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const [tab, setTab] = useState('overview');
  const { data: userData, loading, error } =userGetProfile('/lawyer/profile/me');

  const handleLogout = () => {
    removeCookie('token');
    removeCookie('user');
  };


  return (
    <Layout>
      <section className='mb-5'>
        <div className="container mt-5 mb-3" style={{ maxWidth: "1300px" }}>
          {loading && !error && <Loading />}
          {error && !loading && <Error errMessage={error} />}
          {!loading && !error && (
            <div className="row">
              <div className="col-md-4 pb-4 shadow-lg mx-auto" style={{ maxWidth: "22rem", maxHeight: "30rem"}}>
                <div className="mt-5 container">
                  <section className='my-5 text-center my-bold cursor-pointer d-flex flex-column'>
                    <button onClick={() => setTab('overview')} className={`btn ${tab === 'overview' ? 'btn-info' : 'btn'} me-2 py-3`}>
                      Overview
                    </button>
                    <button onClick={() => setTab('requests')} className={`btn ${tab === 'requests' ? 'btn-info' : 'btn'} me-2 py-3`}>
                      Service Requests
                    </button>
                    <button onClick={() => setTab('profile')} className={`btn ${tab === 'profile' ? 'btn-info' : 'btn'} me-2 py-3`}>
                      Profile
                    </button>
                  </section>

                  <section className='mt-5 pt-5'>
                    <button className="w-100 btn btn-dark btn-lg rounded" onClick={handleLogout}>
                      Logout
                    </button>
                    <button className="w-100 btn btn-danger btn-lg rounded mt-3">
                      Delete Account
                    </button>
                  </section>
                </div>
              </div>
              <div className='col-md-8'>
                {tab === 'overview' && <Overview lawyer={userData} />}
                {tab === 'profile' && <Profile lawyer={userData} />}
                {tab === 'requests' && <ServiceReqs />}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
