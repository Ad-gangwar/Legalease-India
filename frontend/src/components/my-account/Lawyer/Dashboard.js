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
  const { data: userData, loading, error } = userGetProfile('/lawyer/profile/me');

  const handleLogout = () => {
    removeCookie('token');
    removeCookie('user');
  };

  return (
    <Layout>
      <section>
        <div className="container mt-5 mb-3" style={{ maxWidth: "1300px" }}>
          {loading && !error && <Loading />}
          {/* {error && !loading && <Error errMessage={error} />} */}
          {/* {!loading && !error && ( */}
          <div className="row">
            <div className="col-md-4 pb-4 shadow-lg mx-auto" style={{ maxWidth: "22rem", maxHeight: "30rem"}}>
              <div className="mt-5 container">
                <section className='my-5 text-center my-bold cursor-pointer d-flex flex-column'>
                  <button onClick={() => setTab('overview')}
                    className={`${tab === 'overview' ? 'btn btn-info' : 'btn'} me-2 py-3`}>
                    Overview
                  </button>
                  <button onClick={() => setTab('requests')}
                    className={`${tab === 'requests' ? 'btn btn-info' : 'btn'} me-2 py-3`}>
                    Service Requests</button>
                  <button onClick={() => setTab('profile')}
                        className={`${tab === 'profile' ? 'btn btn-info' : 'btn'} me-2 py-3`}>
                    Profile</button>
                </section>

                <section className='mt-5 pt-5'>
                  <button className="w-100 btn btn-dark btn-lg rounded" onClick={handleLogout}>
                    Logout
                  </button>
                  <button className="w-100 btn btn-danger btn-lg rounded mt-3">Delete Account</button>
                </section>
              </div>
            </div>
            <div className='col-md-8'>
              {tab==='overview' && <Overview lawyer={cookies.user}/>}
              {tab==='profile' && <Profile/>}
              {tab==='requests' && <ServiceReqs/>}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
