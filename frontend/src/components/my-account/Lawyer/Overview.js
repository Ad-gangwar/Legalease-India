import React from 'react'
import starIcon from '../../../assets/images/Star.png'
import AboutLawyer from '../../Lawyer/AboutLawyer'

export default function Overview({ lawyer }) {
    return (
        <div className='container-fluid'>
            <div>
                <div className='col-lg-3 col-md-3 my-2'>
                    <figure className='d-flex align-items-center h-100 w-100 mx-auto' style={{ maxWidth: "220px" }}>
                        <img src={lawyer.photo} alt='' className='w-100 rounded-top' />
                    </figure>
                </div>

                <div className='col-lg-9 col-md-9 d-flex justify-content-center flex-column'>
                    <span className='d-inline-flex p-2 rounded-end' style={{ color: "#00a8c6", backgroundColor: "#CCF0F3" }}>
                        {lawyer.specialization}
                    </span>
                    <h3 className='iconText mt-3 myText'>
                        {lawyer.name}
                    </h3>
                    <div className='d-flex align-items-center gap-1 my-2'>
                        <span className='d-flex align-items-center gap-1 my-bold'>
                            <img src={starIcon} alt='' />
                            {lawyer.rating}
                        </span>
                        <span>
                            ({lawyer.totalReviews})
                        </span>
                    </div>
                    <p>
                        Experienced {lawyer.specialization} delivering top-notch legal representation.
                    </p>
                </div>
            </div>
            <div className='mt-3 border-bottom border-1 border-danger'></div>
            <div className='mt-3'>
                <AboutLawyer lawyer={lawyer} />
            </div>
        </div>
    )
}
