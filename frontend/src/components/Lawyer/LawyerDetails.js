import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout'
import { useParams } from 'react-router-dom';
import starIcon from '../../assets/images/Star.png';
import AboutLawyer from './AboutLawyer';
import Feedback from './Feedback';
import { useCookies } from 'react-cookie';
import lawyerContext from '../context/LawyerContext';
import { makeUnauthGetReq } from '../../utils/serverHelper';

export default function LawyerDetails() {
  const navigate = useNavigate();
  const { lawyerId } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [tab, setTab] = useState('about');
  const { selectedLawyer, setSelectedLawyer } = useContext(lawyerContext);
  const [cookies] = useCookies(["docName"])
  const docName = cookies.docName;

  useEffect(() => {
    const getLawyer = async () => {
      try {
        const response = await makeUnauthGetReq("/lawyer/" + lawyerId);
        // console.log(response.data);
        if (response.success) {
          await setLawyer(response.data);
        }
      } catch (error) {    
        console.error("Error:", error);
      }
    };
    getLawyer();
  }, [lawyerId]); 
  

  const handleSelectLawyer = async () => {
    // Set the selected lawyer in the context
    await setSelectedLawyer(lawyer);
    navigate("/DocumentServices/" + docName);
  };

  // console.log(lawyer);

  if(lawyer===null){
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
                      <img src={lawyer.photo} alt='' className='w-100  rounded-top' />
                    </figure>
                  </div>

                  <div className='col-lg-9 col-md-9 d-flex justify-content-center flex-column'>
                    <span className='d-inline-flex p-2 rounded-end' style={{ color: "#00a8c6", backgroundColor: "#CCF0F3" }}>
                      {lawyer.specialization}
                    </span>
                    <h3 className='iconText mt-3 myText'>
                      {lawyer.name}
                    </h3>
                    <h6 className='mt-2'>
                      Contact No.  <span className='iconText text-success'>{lawyer.phone}</span>
                    </h6>
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
                      {lawyer.bio ? lawyer.bio : `Experienced ${lawyer.specialization} delivering top-notch legal representation.`}
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
                {tab === 'feedback' && <Feedback lawyer={lawyer}/>}
              </div>
            </div>

            <div className='col-md-4 px-3 py-3'>
              <div className='shadow p-3'>
                <div className='d-flex justify-content-between'>
                  <p className='mt-0'>Service Charges</p>
                  <span className='my-bold'>
                    {`Rs. ${lawyer.fees}/-`}
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

                <button className='btn btn-danger rounded-md w-100 px-2 text-center' onClick={handleSelectLawyer}>Select Lawyer</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
