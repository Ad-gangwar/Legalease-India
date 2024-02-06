import React from 'react';
import { Link } from 'react-router-dom';
import starIcon from '../../assets/images/Star.png';
import { BsArrowRight } from 'react-icons/bs';

const serviceProviderCard = ({ serviceProvider }) => {
    return (
        <div className='px-2'>
            <div>
                <img src={serviceProvider.photo} className="w-100 rounded-top" alt={serviceProvider.name} />
            </div>
            <h5 className='my-2 mt-3 iconText myText'>
                {serviceProvider.name}
            </h5>
            <div className='d-flex justify-content-between'>
                <span className='p-2 rounded-end' style={{color: "#00a8c6", backgroundColor: "#CCF0F3"}}>
                    {serviceProvider.specialization}
                </span>

                <div className='d-flex align-items-center gap-1'>
                    <span className='d-flex align-items-center gap-1'>
                        <img src={starIcon} alt='' />
                        {serviceProvider.rating}
                    </span>
                    <span className=''>
                        ({serviceProvider.totalReviews})
                    </span>
                </div>
            </div>

            <div className='mt-3 d-flex justify-content-between align-items-center'>
                <div>
                    <h5 className=''>
                        +{serviceProvider.casesHandled} cases
                    </h5>
                    <p className=''>
                        At {serviceProvider.organisation}
                    </p>
                </div>
                <Link to={"/serviceProvider/" + serviceProvider._id} className="btn btn-outline-danger rounded-circle h-100 d-flex align-items-center">
                    <BsArrowRight className='arrow mx-0'/>
                </Link>
            </div>
        </div>
    );
};

export default serviceProviderCard;

