import React, { useState } from 'react';
import avatar from '../../assets/images/avatar-icon.png';
import formatDate from '../../utils/formatDate';
import { AiFillStar } from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';

export default function Feedback({ lawyer }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className='my-4'>
      <div className='mb-5'>
        <h5 className='my-bold py-2'>
          {`All Reviews (${lawyer.totalReviews})`}
        </h5>
        {lawyer.reviews.map((review, index) => (
          <div className='d-flex justify-content-between gap-3 my-4 py-2 feedback'>
            <div className='d-flex gap-3'>
              <span style={{ width: "55px" }}><img className='w-100 rounded-circle' src={review.user.photo} alt='' /></span>

              <div className='mx-auto w-100 px-2'>
                <h5 className='text-para mb-3'>
                  {review.user.name}
                </h5>
                <p className='mb-2'>
                  {formatDate(review.createdAt)}
                </p>
                <p className='mb-0'>
                  {review.reviewText}
                </p>
              </div>
            </div>

            <div className='d-flex gap-1 stars'>
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
      {showFeedbackForm && <FeedbackForm lawyerId={lawyer._id}/>}
    </div>
  );
}
