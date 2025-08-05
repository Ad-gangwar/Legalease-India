import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import ServiceProviderCard from '../shared/ServiceProviderCard';
import { makeUnauthGetReq } from '../../utils/serverHelper';
import toast from 'react-hot-toast';
import Reviews from '../shared/Reviews';
import { ErrorFallback, EmptyState, CardSkeleton } from '../Loader/Loading';

export default function ServiceProviders() {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [searchedServiceProvider, setSearchedServiceProvider] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchServiceProviders = async (searchQuery = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await makeUnauthGetReq(`/serviceProvider/?query=${encodeURIComponent(searchQuery)}`);
      if (response.success) {
        setServiceProviders(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch service providers");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred");
      toast.error(`Failed to load service providers: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceProviders();
  }, []);

  useEffect(() => {
    if (searchedServiceProvider !== '') {
      setSearchLoading(true);
      const timeoutId = setTimeout(() => {
        fetchServiceProviders(searchedServiceProvider);
        setSearchLoading(false);
      }, 500); // Debounce search

      return () => clearTimeout(timeoutId);
    } else if (searchedServiceProvider === '' && !loading) {
      fetchServiceProviders();
    }
  }, [searchedServiceProvider]);

  const handleRetry = () => {
    fetchServiceProviders(searchedServiceProvider);
  };

  const renderServiceProviders = () => {
    if (loading) {
      return <CardSkeleton count={6} />;
    }

    if (error) {
      return (
        <ErrorFallback 
          error={error}
          message="Failed to load service providers"
          onRetry={handleRetry}
        />
      );
    }

    if (serviceProviders.length === 0) {
      if (searchedServiceProvider) {
        return (
          <EmptyState 
            message="No service providers found for your search"
            icon="mdi:account-search-outline"
          />
        );
      } else {
        return (
          <EmptyState 
            message="No service providers available"
            icon="mdi:account-group-outline"
          />
        );
      }
    }

    return (
      <div className="row w-100 mx-auto">
        {serviceProviders.map((serviceProvider, index) => (
          <div key={serviceProvider._id} className="col col-lg-3 col-md-4 col-sm-6 col-12 my-2" style={{ maxWidth: "350px" }}>
            <ServiceProviderCard serviceProvider={serviceProvider} />
          </div>
        ))}
      </div>
    );
  };

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
              disabled={loading}
            />
            <button 
              className="btn mt-0 rounded-0 rounded-end btn-danger shadow-lg"
              disabled={loading || searchLoading}
            >
              {searchLoading ? (
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : null}
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ---------------------------------serviceProviders section----------------------------- */}
      <section className="py-5">
        <div className="container">
          {renderServiceProviders()}
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
