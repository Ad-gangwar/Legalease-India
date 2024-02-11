import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import ServiceProviderCard from '../shared/ServiceProviderCard';
import { makeUnauthGetReq } from '../../utils/serverHelper';
import toast from 'react-hot-toast';
import Reviews from '../shared/Reviews';

export default function ServiceProviders() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [searchedServiceProvider, setSearchedServiceProvider] = useState('');

  useEffect(() => {
    const getAllServiceProviders = async () => {
      try {
        const response = await makeUnauthGetReq(`/serviceProvider/?query=${encodeURIComponent(searchedServiceProvider)}`);
        if (response.success) {
          setServiceProviders(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(`An unexpected error occurred: ${error.message || "Unknown error"}`);
      }
    };

    getAllServiceProviders();
  }, [searchedServiceProvider]); 

  return (
    <Layout>
      {/* --------------------search section----------------------- */}
      <section style={{ backgroundColor: "#fff9ea" }} className='py-5'>
        <div className="container text-center">
          <h2 className='iconText'>Find a Service Provider</h2>
          <div className="mx-auto mt-4 py-3 d-flex" style={{ maxWidth: "570px" }}>
            <input
              type="search"
              className="py-3 px-3 w-100 border-0 cursor-pointer rounded-start shadow-lg"
              placeholder="Search Service Provider"
              value={searchedServiceProvider}
              onChange={(e) => {
                setSearchedServiceProvider(e.target.value);
              }}
            />
            <button className="btn mt-0 rounded-0 rounded-end btn-danger shadow-lg">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------serviceProviders section----------------------------- */}
      <section className="py-5">
        <div className="container">
          {<div className="row w-100 mx-auto">
            {searchedServiceProvider && serviceProviders.length === 0 ?
              <h5 className='mainText text-center my-4 my-bold'>No Service Provider found 😒!</h5>
              :
              serviceProviders.map((serviceProvider, index) => (
                <div key={serviceProvider._id} className="col col-lg-3 col-md-4 col-sm-6 col-12 my-2" style={{ maxWidth: "350px" }}>
                  <ServiceProviderCard serviceProvider={serviceProvider} />
                </div>
              ))}
          </div>}
        </div>
      </section>

      {/* reviews section */}
      <section className='container'>
        <h1 className='iconText text-center mainText'>What our Clients says</h1>
        <p className='text-para text-center'>
          Legal Insights: Where Cases Speak for Themselves.
        </p>
        <Reviews />
      </section>
    </Layout>
  );
}
