import React, {useEffect, useState} from 'react'
import Layout from './Layout/Layout';
import successImage from '../assets/images/success.gif';
import { useNavigate } from 'react-router-dom';
import { makeAuthPostReq } from '../utils/serverHelper';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';


export default function Success() {
  const navigate = useNavigate();
  const [toastShown, setToastShown] = useState(false);
  const [cookies] = useCookies("serviceId");
 
  useEffect(() => {
    const updateStatus = async () => {
      try {
        const response = await makeAuthPostReq("/client/updateStatus", { id: cookies.serviceId});

        if (response.success && !toastShown) {
          toast.success('Service request made and payment done successfully!');
          setToastShown(true); // Update state to indicate that toast has been shown
        } else if (!response.success) {
          console.log('Failed to update service request status!');
        }
      } catch (error) {
        console.error('Error updating service request status:', error);
      }
    };
    updateStatus();
  }, []);

  return (
    <Layout>
      <div className='container mb-5'>
        <figure className='text-center'>
          <img src={successImage} alt='🎉Successful' className='img-fluid' style={{ maxWidth: "350px" }} />
        </figure>
        <div className='text-center'>
          <h3 className='iconText text-success pb-2'>Payment Done!</h3>
          <p>Thank you for completing your secure online Payment.</p>
          <h5 className='my-4'>Have a great day!</h5>
          <button className='btn btn-success p-3 rounded-pill mt-4 px-5' onClick={() => navigate("/")}>Back to Home Page</button>
        </div>
      </div>
    </Layout>
  )
}
