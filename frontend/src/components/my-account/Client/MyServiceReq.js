import React from 'react';
import UserFetchData from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import Error from '../../Error/Error';
import formatDate from '../../../utils/formatDate';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

export default function MyServiceReqs() {
    const { data: serviceReqs, loading, error } = UserFetchData('/client/ServiceReqs/my-ServiceReqs');

    return (
        <div className="mt-5 container">
            {loading && !error && <Loading />}

            {error && !loading && <Error errMessage={error} />}

            {!loading && !error && (
                <div className="row row-cols-1 row-cols-lg-2">
                    {serviceReqs.map((service, index) => (
                        <div className='px-3'>
                            <div key={index} className={`col mb-4 p-3 border border-2 rounded pulse ${service.status === 'pending' ? 'border-danger' : 'border-success'}`}>
                                <h5 className='mb-3 mybg p-2 text-white px-3 rounded-end'>{service.serviceName}</h5>
                                <h6 className='mb-3'>Service Request Date: <span className='my-bold text-success fw-bold'>{formatDate(service.serviceDate)}</span></h6>
                                <h6 className='mb-2'>My Documents:</h6>
                                <div className='row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 mb-3'>
                                    {service.documents.map((doc, index) => (
                                        <figure key={index} className='col mb-2'>
                                            <Link to={doc} target='_blank'><img src={doc} alt={`Document ${index}`} className="img-fluid" /></Link>
                                        </figure>
                                    ))}
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div className='mb-3 text-success bg-info bg-opacity-25 my-bold p-2 px-3 rounded-end'>{service.isPaid ? <span>Paid</span> : <span>Payment Pending</span>}</div>
                                    <div className='mb-3 text-success bg-info bg-opacity-25 my-bold p-2 px-3 rounded-start'>{service.status.charAt(0).toUpperCase() + service.status.slice(1)}</div>
                                </div>
                                <div className='my-bold h6'>Service Provider:</div>
                                {service.serviceProvider &&
                                    <div>
                                        <h5 className='mt-2 iconText myText'>
                                            {service.serviceProvider.name}
                                        </h5>

                                        <div className='mt-2 d-flex justify-content-between align-items-center'>
                                            <div>
                                                <h6 className='mb-1'>
                                                    +{service.serviceProvider.casesHandled} cases
                                                </h6>
                                                <p className='mb-0'>
                                                    At {service.serviceProvider.organisation}
                                                </p>
                                            </div>
                                            <Link to={"/serviceProvider/" + service.serviceProvider._id} className="btn btn-outline-danger rounded-circle h-100 d-flex align-items-center">
                                                <BsArrowRight className='arrow mx-0' />
                                            </Link>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && serviceReqs.length === 0 && (
                <h2 className="mt-5 text-center">
                    You did not request any service yet!
                </h2>
            )}
        </div>
    );
}
