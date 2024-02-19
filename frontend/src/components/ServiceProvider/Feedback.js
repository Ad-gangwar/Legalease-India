import React, { useState } from 'react';
import formatDate from '../../utils/formatDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';

export default function Feedback({ serviceProvider }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className='my-4'>
      <div className='mb-5'>
        <h5 className='my-bold py-2'>
          {`All Reviews (${serviceProvider.totalReviews})`}
        </h5>
        {serviceProvider.reviews.map((review, index) => (
          <div className='d-flex justify-content-between gap-3 my-4 py-2 feedback'>
            {/* {console.log(review)} */}
            <div className='d-flex gap-3'>
              {review.client && <span style={{ width: "55px" }}><img className='w-100 rounded-circle' src={review.client.photo ? review.client.photo : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"} alt='' /></span>
              }
              <div className='mx-auto w-100 px-2'>
                {review.client && <h5 className='text-para mb-3'>
                  {review.client.name}
                </h5>}
                <p className='mb-2'>
                  {formatDate(review.createdAt)}
                </p>
                <p className='mb-0'>
                  {review.reviewText}
                </p>
              </div>
            </div>

            <div className='d-flex gap-1 stars mb-4'>
              {[...Array(review.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color='#0067FF' />
              ))}
            </div>
          </div>
        ))}
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
      {showFeedbackForm && <FeedbackForm serviceProviderId={serviceProvider._id} />}
    </div>
  );
}
