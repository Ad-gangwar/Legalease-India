import React from 'react'

export default function Error({errMessage}) {
  return (
    <div className='d-flex align-items-center justify-content-center w-100 h-100'>
        <h3 className='fs-4 my-bold'>
            {errMessage}
        </h3>
    </div>
  );
};