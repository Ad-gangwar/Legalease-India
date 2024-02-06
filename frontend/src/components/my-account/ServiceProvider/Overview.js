import React from 'react'
import starIcon from '../../../assets/images/Star.png'
import AboutServiceProvider from '../../ServiceProvider/AboutServiceProvider'

export default function Overview({ serviceProvider }) {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-3 col-md-3'>
                    <figure className='d-flex align-items-center h-100 w-100 mx-auto' style={{ maxWidth: "220px" }}>
                        <img src={serviceProvider.photo!== null? serviceProvider.photo: 'https://cdn.vectorstock.com/i/1000x1000/50/45/advocacy-icon-male-user-person-profile-avatar-vector-20905045.webp'} alt='' className='w-100 rounded-top' />
                    </figure>
                </div>

                <div className='col-lg-9 col-md-9 d-flex justify-content-center flex-column'>
                    <span className='p-2 rounded-end' style={{ color: "#00a8c6", backgroundColor: "#CCF0F3" }}>
                        {serviceProvider.specialization}
                    </span>
                    <h3 className='iconText mt-3 myText'>
                        {serviceProvider.name}
                    </h3>

                    <div className='d-flex align-items-center gap-1 my-2'>
                        <span className='d-flex align-items-center gap-1 my-bold'>
                            <img src={starIcon} alt='' />
                            {serviceProvider.rating}
                        </span>
                        <span>
                            ({serviceProvider.totalReviews})
                        </span>
                    </div>
                    <p>
                        Experienced {serviceProvider.specialization} delivering top-notch legal representation.
                    </p>
                </div>
            </div>
            <div className='mt-3 border-bottom border-1 border-danger'></div>
            <div className='mt-3'>
                <AboutServiceProvider serviceProvider={serviceProvider} />
            </div>
        </div>
    )
}
