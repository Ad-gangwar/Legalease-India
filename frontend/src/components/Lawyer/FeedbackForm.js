import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

export default function FeedbackForm() {
  const [reviewText, setReviewText] = useState(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <form className='mb-5'>
      <div className='mb-4'>
        <p className='mb-4 mt-0 text-para'>
          How would you rate the overall experience?*
        </p>
        <div className='d-flex'>
          {[...Array(5).keys()].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={index}
                type='button'
                className={`${
                  starValue <= (hover || rating)
                    ? 'text-warning'
                    : 'text-secondary'
                } bg-transparent border-0 cursor-pointer`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar className='arrow m-0' />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className='mt-4'>
        <p className='text-para mb-4 mt-0'>
          Share your feedback or suggestions*
        </p>

        <textarea
          className='form-control mb-5'
          rows='5'
          placeholder='Write your message'
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>
      <button
        type='submit'
        className='btn btn-danger rounded-pill my-bold p-3'
        onClick={handleSubmit}
      >
        Submit Feedback
      </button>
    </form>
  );
}
