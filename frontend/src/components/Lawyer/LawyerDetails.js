import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom';
import { lawyersData } from '../../assets/data/lawyers';
import starIcon from '../../assets/images/Star.png';
import AboutLawyer from './AboutLawyer';
import Feedback from './Feedback';

export default function LawyerDetails() {
  const { lawyerId } = useParams();
  const [lawyer, setData] = useState({});
  const [tab, setTab] = useState('about');
  useEffect(() => {
    function fetchData() {
      const selectedLawyer = lawyersData.find(lawyer => lawyer.id === lawyerId);
      if (selectedLawyer) {
        setData(selectedLawyer);
      }
    }

    fetchData();
  }, [lawyerId]);

  return (
    <Layout>
      <section style={{ maxWidth: "1270px" }} className='w-100 mx-auto mt-5'>
        <div className='container mx-auto w-100'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-lg-3 col-md-3 my-2'>
                    <figure className='d-flex align-items-center h-100 w-100 mx-auto' style={{ maxWidth: "220px" }}>
                      <img src={lawyer.photo} alt='' className='w-100 rounded' />
                    </figure>
                  </div>

                  <div className='col-lg-9 col-md-9 d-flex justify-content-center flex-column'>
                    <span className='d-inline-flex p-2 rounded ' style={{ color: "#00a8c6", backgroundColor: "#CCF0F3" }}>
                      {lawyer.specialization}
                    </span>
                    <h3 className='iconText mt-3 myText'>
                      {lawyer.name}
                    </h3>
                    <div className='d-flex align-items-center gap-1 my-2'>
                      <span className='d-flex align-items-center gap-1 my-bold'>
                        <img src={starIcon} alt='' />
                        {lawyer.rating}
                      </span>
                      <span>
                        ({lawyer.totalReviews})
                      </span>
                    </div>
                    <p>
                    Experienced {lawyer.specialization} delivering top-notch legal representation.
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
                {tab === 'about' && <AboutLawyer lawyer={lawyer} />}
                {tab === 'feedback' && <Feedback />}
              </div>
            </div>

            <div className='col-md-4 px-3 py-3'>
              <div className='shadow p-3'>
                <div className='d-flex justify-content-between'>
                  <p className='mt-0'>Service Charges</p>
                  <span className='my-bold'>
                    Rs. 100 /-
                  </span>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='mt-0'>Document Charges</p>
                  <span className='my-bold'>
                    Rs. 400 /-
                  </span>
                </div>

                <div className='d-flex justify-content-between border-top border-2 mb-2 py-2'>
                  <span>Total Fees</span>
                  <span className='my-bold'>
                    Rs. 500 /-
                  </span>
                </div>

                <button className='btn btn-danger rounded-md w-100 px-2 text-center'>Select Lawyer</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
