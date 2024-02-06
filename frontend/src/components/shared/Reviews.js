import React, { useEffect, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { HiStar } from 'react-icons/hi';
import { makeUnauthGetReq } from '../../utils/serverHelper';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await makeUnauthGetReq("/review/");
        const filteredReviews = response.data.filter(review => review.rating === 5);
        setReviews(filteredReviews);
      }
      catch (error) {
        console.log("Error:", error);
      }
    };

    fetchReviews();
  }, []);

  console.log(reviews);
  return (
    <div className='my-5'>
      <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true }} breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }}>
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className='py-3 px-4 rounded shadow'>
              <div className='d-flex align-items-center gap-3'>
                <img src={review.client.photo} alt='' className='img-fluid rounded-circle' style={{ maxWidth: "50px" }} />
                <div>
                  <h4 className='fs-5 my-bold text-danger'>{review.client.name}</h4>
                  <div className='d-flex align-items-center gap-1'>
                    {[...Array(review.rating).keys()].map((_, index) => (
                      <HiStar className='text-warning' key={index}/>
                    ))}
                  </div>
                </div>
              </div>
              <p className='mt-4'>
                {review.reviewText}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
