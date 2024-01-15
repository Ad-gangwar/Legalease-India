import React from 'react';
import UserFetchData from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import formatDate from '../../../utils/formatDate';

export default function MyServiceReqs() {
    const { data: serviceReqs, loading, error } = UserFetchData('/lawyer/ServiceReqs/my-ServiceReqs');

    return (
        <div className="container">
            {loading && (
                <Loading />
            )}

            {!loading && error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="row row-cols-1 row-cols-lg-2 g-4">
                    {serviceReqs.map((service, index) => (
                        <div key={index} className='col mb-4 p-3 border border-2 border-danger rounded'>
                            <h4 className='mb-3 text-danger'>Requested Service: <span className='fs-5 text-dark'>{service.serviceName}</span></h4>
                            <p className='text-muted'>Request Date: <span className='fs-6'>{formatDate(service.serviceDate)}</span></p>
                            <div className='mb-3'>
                                <h5 className='mb-2 text-info'>Documents</h5>
                                <div className='row row-cols-lg-4 row-cols-md-3 row-cols-sm-1'>
                                    {service.documents.map((doc, index) => (
                                        <figure key={index} className='col mb-2'>
                                            <img src={doc} alt={`Document ${index}`} className="img-fluid rounded" />
                                        </figure>
                                    ))}
                                </div>
                            </div>    
                            <div>
                                <h5 className='text-primary'>Requested by:</h5>
                                <p className='mb-1 text-dark'>Name: <span className='text-primary'>{service.user.name}</span></p>
                                <p className='text-dark'>Email id: <span>{service.user.email}</span></p>
                            </div>
                            <div className='mb-3 d-flex justify-content-between align-items-center bg-light border border-danger rounded p-2'>
                                <div className={service.isPaid ? 'text-success' : 'text-warning'}>
                                    {service.isPaid ? 'Paid' : 'Payment Pending'}
                                </div>
                                {<button className='btn btn-success'>Approve</button>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && serviceReqs.length === 0 && (
                <h2 className="mt-5 text-center text-danger">
                    You did not request any service yet!
                </h2>
            )}
        </div>
    );
}
