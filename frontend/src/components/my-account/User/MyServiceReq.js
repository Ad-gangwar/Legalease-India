import React from 'react';
import UserFetchData from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import Error from '../../Error/Error';
import formatDate from '../../../utils/formatDate';
import LawyerCard from '../../shared/LawyerCard';

export default function MyServiceReqs() {
    const { data: serviceReqs, loading, error } = UserFetchData('/user/ServiceReqs/my-ServiceReqs');

    return (
        <div className="mt-5 container">
            {loading && !error && <Loading />}

            {error && !loading && <Error errMessage={error} />}

            {!loading && !error && (
                <div className="row row-cols-1 row-cols-lg-2">
                    {serviceReqs.map((service, index) => (
                        <div key={index} className='col mb-4 p-3 border border-2 border-secondary rounded'>
                            <h5 className='mb-3'>Service name: <span className='fs-5'>{service.serviceName}</span></h5>
                            <h6>Service Date: <span className='fs-6'>{formatDate(service.serviceDate)}</span></h6>
                            <h6 className='mb-2'>Your Documents</h6>
                            <div className='row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 mb-3'>
                                {service.documents.map((doc, index) => (
                                    <figure key={index} className='col mb-2'>
                                        <img src={doc} alt={`Document ${index}`} className="img-fluid" />
                                    </figure>
                                ))}
                            </div>
                            <div className='mb-3'>{service.isPaid ? <span className='text-success'>Paid</span> : <span className='text-warning'>Payment Pending</span>}</div>
                            <div className='mb-3'>Status: <span className='fw-bold'>{service.status}</span></div>
                            <div className='mb-3'>Lawyer:</div>
                            {service.lawyer && <LawyerCard lawyer={service.lawyer} />}
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
