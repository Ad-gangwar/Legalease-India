import React, { useState } from 'react';
import avatar from '../../assets/images/avatar-icon.png';
import formatDate from '../../utils/formatDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';

export default function Feedback() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className='my-4'>
      <div className='mb-5'>
        <h5 className='my-bold py-2'>
          All Reviews (272)
        </h5>

        <div className='d-flex justify-content-between gap-3 my-4 py-2 feedback'>
          <div className='d-flex gap-4'>
            <span style={{width: "55px"}}><img className='w-100 h-50' src={avatar} alt=''/></span>

            <div className='mx-auto w-100 px-2'>
              <h5 className='text-para mb-3'>
                Aditya Gangwar
              </h5>
              <p className='mb-2'>
                {formatDate('01-03-2024')}
              </p>
              <p className='mb-0'>
                Good services, highly recommended 👍
              </p>
            </div>
          </div>

          <div className='d-flex gap-1 stars'>
            {[...Array(5).keys()].map((_, index) => (
              <AiFillStar key={index} color='#0067FF' />
            ))}
          </div>
        </div>
      </div>

      {!showFeedbackForm && (
        <div className='text-center'>
          <button
            className='btn btn-danger rounded-pill p-3'
            onClick={() => setShowFeedbackForm(true)}
          >
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
}
