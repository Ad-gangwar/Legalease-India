import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom';
import starIcon from '../../assets/images/Star.png';
import AboutServiceProvider from './AboutServiceProvider';
import Feedback from './Feedback';
import { useCookies } from 'react-cookie';
import serviceProviderContext from '../context/ServiceProviderContext';
import { makeUnauthGetReq } from '../../utils/serverHelper';

export default function ServiceProviderDetails() {
  const navigate = useNavigate();
  const { serviceProviderId } = useParams();
  const [serviceProvider, setServiceProvider] = useState(null);
  const [tab, setTab] = useState('about');
  const { selectedServiceProvider, setSelectedServiceProvider } = useContext(serviceProviderContext);
  const [cookies] = useCookies(["docName", "docFees"])
  const docName = cookies.docName;

  useEffect(() => {
    const getServiceProvider = async () => {
      try {
        const response = await makeUnauthGetReq("/serviceProvider/" + serviceProviderId);
        // console.log(response.data);
        if (response.success) {
          await setServiceProvider(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getServiceProvider();
  }, [serviceProviderId]);


  const handleSelectServiceProvider = async () => {
    // Set the selected serviceProvider in the context
    await setSelectedServiceProvider(serviceProvider);
    navigate("/DocumentServices/" + docName);
  };

  // console.log(serviceProvider);

  if (serviceProvider === null) {
    return <div>Loading</div>
  }

  return (
    <Layout>
      <section style={{ maxWidth: "1270px" }} className='w-100 mx-auto my-5'>
        <div className='container mx-auto w-100'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-lg-3 col-md-3 px-0'>
                    <figure className='d-flex align-items-center  w-100 mx-auto' style={{ maxWidth: "220px" }}>
                      <img src={serviceProvider.photo} alt='' className='w-100  rounded-top' />
                    </figure>
                  </div>

                  <div className='col-lg-9 col-md-9 d-flex justify-content-center flex-column'>
                    <span className='d-inline-flex p-2 rounded-end' style={{ color: "#00a8c6", backgroundColor: "#CCF0F3" }}>
                      {serviceProvider.specialization}
                    </span>
                    <h3 className='iconText mt-3 myText'>
                      {serviceProvider.name}
                    </h3>
                    <h6 className='mt-2'>
                      Contact No.  <span className='iconText text-success'>{serviceProvider.phone}</span>
                    </h6>
                    <div className='d-flex align-items-center justify-content-between gap-5'>
                      <div className='d-flex align-items-center gap-1 my-2'>
                        <span className='d-flex align-items-center gap-1 my-bold'>
                          <img src={starIcon} alt='' />
                          {serviceProvider.rating}
                        </span>
                        <span>
                          ({serviceProvider.totalReviews})
                        </span>
                      </div>
                      <div>
                        <h6 className='text-para pt-2'>
                          +{serviceProvider.casesHandled} cases handled
                        </h6>
                      </div>
                    </div>

                    <p>
                      {serviceProvider.bio ? serviceProvider.bio : `Experienced ${serviceProvider.specialization} delivering top-notch legal representation.`}
                    </p>

                  </div>
                </div>
              </div>

              <div className='mt-3 border-bottom border-1 border-danger'>
                <button onClick={() => setTab('about')}
                  className={`btn ${tab === 'about' && 'tab-btn'}`}>
                  About
                </button>
                <button onClick={() => setTab('feedback')}
                  className={`btn ${tab === 'feedback' && 'tab-btn'}`}>
                  Feedback
                </button>
              </div>

              <div className='mt-3'>
                {tab === 'about' && <AboutServiceProvider serviceProvider={serviceProvider} />}
                {tab === 'feedback' && <Feedback serviceProvider={serviceProvider} />}
              </div>
            </div>

            <div className='col-md-4 px-3 py-3'>
              <div className='shadow p-3'>
                <div className='d-flex justify-content-between'>
                  <p className='mt-0'>Service Charges</p>
                  <span className='my-bold'>
                    {`Rs. ${serviceProvider.fees}/-`}
                  </span>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='mt-0'>Document Charges</p>
                  <span className='my-bold'>
                    {cookies.docFees ? `Rs. ${cookies.docFees}/-`: "NaN/-"}
                  </span>
                </div>

                <div className='d-flex justify-content-between border-top border-2 mb-2 py-2'>
                  <span>Total Fees</span>
                  <span className='my-bold'>
                    Rs. {serviceProvider.fees + cookies.docFees}/-
                  </span>
                </div>

                <button className='btn btn-danger rounded-md w-100 px-2 text-center' onClick={handleSelectServiceProvider}>Select Service Provider</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
