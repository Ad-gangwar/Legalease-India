import React from 'react'
import formatDate from '../../utils/formatDate';

export default function AboutLawyer({ lawyer }) {
  return (
    <div className='my-4'>
      <div >
        <h5>
          About
          <span className='fs-4 mx-2 myText'>
            {lawyer.name}
          </span>
        </h5>
        <p>
          {`${lawyer.name} is an accomplished ${lawyer.specialization?.toLowerCase()} with over ${lawyer.experience} of dedicated legal practice. Known for their unwavering commitment to justice, ${lawyer.name} has earned a stellar reputation in ${lawyer.specialization?.toLowerCase()} law. With a remarkable rating of ${lawyer.rating} based on ${lawyer.totalReviews} reviews, clients praise ${lawyer.name}'s expertise, integrity, and compassionate approach.${lawyer.name} has successfully handled a diverse range of legal cases, totaling ${lawyer.casesHandled}. As a proud member of ${lawyer.lawFirm}, a renowned law firm known for its commitment to excellence, ${lawyer.name} continues to provide exceptional legal representation. ${lawyer.name} is not just a legal practitioner; they are a trusted advocate for their clients, dedicated to upholding the highest standards of the legal profession. With a deep understanding of the intricacies of ${lawyer.specialization?.toLowerCase()} law, ${lawyer.name} is ready to navigate the complexities of any case and deliver the justice their clients deserve.`}
        </p>
      </div>

      <div className='mt-4'>
        <h5>
          Education
        </h5>
        <ul className='list-unstyled mt-3 p-3'>
          <li className='d-flex flex-column flex-sm-row justify-content-between gap-2 mb-4'>
            <div>
              <span className='text-danger'>
                {formatDate('12-04-2014')} - {formatDate('12-04-2018')}
              </span>
              <p className=''>Juris Doctor (J.D.)</p>
            </div>
            <p className=''>
              Law School, University of XYZ
            </p>
          </li>
          <li className='d-flex flex-column flex-sm-row justify-content-between gap-2'>
            <div>
              <span className='text-danger'>
                {formatDate('12-04-2010')} - {formatDate('12-04-2014')}
              </span>
              <p className=''>Bachelor of Laws (LL.B.)</p>
            </div>
            <p className=''>
              College of Law, ABC University
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h5 className=''>
          Experience
        </h5>
        <ul className='list-unstyled row mt-4'>
          <li className='col-md-6 col-sm-6 col-xs-12 my-2'>
            <div className='rounded p-3' style={{ backgroundColor: "#fff9ea" }}>
              <span style={{ color: "#FEB60D" }}>
                {formatDate('12-04-2010')} - {formatDate('12-04-2014')}
              </span>
              <p className='my-2'>
                Senior Attorney
              </p>
              <p className=''>
                Law Firm XYZ, New York.
              </p>
            </div>
          </li>
          <li className='col-md-6 col-sm-6 col-xs-12 my-2'>
            <div className='rounded p-3 d-flex flex-column justify-content-between' style={{ backgroundColor: "#fff9ea" }}>
              <span style={{ color: "#FEB60D" }}>
                {formatDate('12-04-2010')} - {formatDate('12-04-2014')}
              </span>
              <p className='my-2'>
                Legal Consultant
              </p>
              <p className=''>
                Legal Solutions Inc., New York.
              </p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  )
}
