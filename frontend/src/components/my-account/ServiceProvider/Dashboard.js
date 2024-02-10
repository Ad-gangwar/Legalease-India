import React, { useState } from 'react';
import Profile from './Profile';
import userGetProfile from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import Error from '../../Error/Error';
import Layout from '../../Layout/Layout';
import ServiceReqs from './ServiceReqs';
import Overview from './Overview';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../../utils/config';
import toast from 'react-hot-toast';

export default function MyAccount() {
  const navigate=useNavigate();
  const [tab, setTab] = useState('overview');
  const { data: userData, loading, error } = userGetProfile('/serviceProvider/profile/me');
  const token = localStorage.getItem("userToken")
  //  console.log(userData)

  const handleLogout = async() => {
    // Remove data from localStorage
    await localStorage.removeItem("legalToken");
    await localStorage.removeItem("legalUser");
    navigate("/login");
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(URL + "/user/" + userData._id, {
        method: 'DELETE', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      // Check the response data for success
      if (responseData.success) {
        handleLogout();
        toast.success("Account Deleted Successfully!");
      } else {
        toast.error("Account Deletion Failed 😒");
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error(`An unexpected error occurred: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <Layout>
      <section className='mb-5'>
        <div className="container mt-5 mb-3" style={{ maxWidth: "1300px" }}>
          {loading && !error && <Loading />}
          {error && !loading && <Error errMessage={error} />}
          {!loading && !error && (
            <div className="row">
              <div className="col-md-4 pb-4 shadow-lg mx-auto mb-4" style={{ maxWidth: "22rem", maxHeight: "30rem" }}>
                <div className="mt-5 container">
                  <section className='my-5 text-center cursor-pointer d-flex flex-column'>
                    <button onClick={() => setTab('overview')} className={`btn my-bold ${tab === 'overview' ? 'btn-info' : 'btn'} me-2 py-3`}>
                      Overview
                    </button>
                    <button onClick={() => setTab('requests')} className={`btn my-bold ${tab === 'requests' ? 'btn-info' : 'btn'} me-2 py-3`}>
                      Service Requests
                    </button>
                    <button onClick={() => setTab('profile')} className={`btn my-bold ${tab === 'profile' ? 'btn-info' : 'btn'} me-2 py-3`}>
                      Profile
                    </button>
                  </section>

                  <section className='mt-5 pt-5'>
                    <button className="w-100 btn btn-dark btn-lg rounded" onClick={handleLogout}>
                      Logout
                    </button>
                    <button className="w-100 btn btn-danger btn-lg rounded mt-3" onClick={handleDelete}>
                      Delete Account
                    </button>
                  </section>
                </div>
              </div>
              <div className='col-md-8'>
                {tab === 'overview' && <Overview serviceProvider={userData} />}
                {tab === 'profile' && <Profile serviceProvider={userData} />}
                {tab === 'requests' && <ServiceReqs />}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
