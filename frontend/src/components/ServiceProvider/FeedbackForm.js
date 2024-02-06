import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { makeAuthPostReq } from '../../utils/serverHelper';
import toast from 'react-hot-toast';

export default function FeedbackForm({ serviceProviderId }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming makeAuthPostReq returns a promise
      const response = await makeAuthPostReq(`/serviceProvider/${serviceProviderId}/review/`, {
        reviewText,
        rating
      });

      console.log(response);

      if (response.success) {
        toast.success(response.message);
        window.location.reload();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        `An unexpected error occurred: ${error.message || "Unknown error"}`
      );
    }
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
                className={`${starValue <= (hover || rating)
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
