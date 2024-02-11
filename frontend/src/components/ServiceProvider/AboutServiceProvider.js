import React from 'react'
import formatDate from '../../utils/formatDate';

export default function AboutServiceProvider({ serviceProvider }) {
  if (serviceProvider.length === 0) {
    return <div>Loading</div>
  }

  return (
    <div className='my-4'>
      <div >
        <h5>
          About
          <span className='fs-4 mx-2 myText'>
            {serviceProvider.name}
          </span>
        </h5>
        <p>
          {serviceProvider.about}
        </p>
      </div>

      <div className='mt-4'>
        <h5>
          Education
        </h5>
        <ul className='list-unstyled mt-3 row ps-3'>
          {serviceProvider.qualifications.map((qual, index) => (
            <li className='col-md-4 col-sm-6 col-xs-12 p-2' key={index}>
              <div className='shadow rounded p-3'>
                <div className='text-danger mb-2'>
                  {formatDate(qual.startDate)} - {formatDate(qual.endDate)}
                </div>
                <p>{qual.degree}</p>
                <p className='mb-0'>
                  {qual.university}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className='mt-4'>
          Experience
        </h5>
        <ul className='list-unstyled row mt-3 row ps-2'>
          {serviceProvider.experiences.map((exp, index) => (
            <li className='col-md-4 col-sm-6 col-xs-12 my-2' key={index}>
              <div className='rounded p-3' style={{ backgroundColor: "#fff9ea" }}>
                <span style={{ color: "#FEB60D" }}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </span>
                <p className='my-2'>
                  {exp.position}
                </p>
                <p className=''>
                  {exp.organisation}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}
