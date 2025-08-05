import React, { useEffect } from 'react'
import Layout from './Layout/Layout';
import failureImage from '../assets/images/failure.gif';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Cancel() {
  
  useEffect(() => {
    toast('Service request sent but could not complete payment!', {
      icon: '😒',
    });
  }, []);
  
  const navigate = useNavigate();
  return (
    <Layout>
      <div className='container mb-5'>
        <figure className='text-center'>
          <img src={failureImage} alt='Failed' className='img-fluid' style={{ maxWidth: "300px" }} />
        </figure>
        <div className='text-center'>
          <h3 className='iconText text-danger pb-2'>Payment Failed!</h3>
          <p>Your payment failed due to some unexpected reasons.</p>
          <h5 className='my-3'>Please try again.</h5>
          <button className='btn btn-danger p-3 rounded-pill mt-4 px-5' onClick={()=> navigate("/")}>Back to HomePage</button>
        </div>
      </div>
    </Layout>
  )
}
