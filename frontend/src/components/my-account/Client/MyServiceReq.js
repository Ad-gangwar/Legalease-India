import React, { useState, useEffect } from 'react';
import UserFetchData from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import Error from '../../Error/Error';
import formatDate from '../../../utils/formatDate';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { makeAuthPostReq } from '../../../utils/serverHelper';
import toast from 'react-hot-toast';

export default function MyServiceReqs() {
    const { data: serviceReqs, loading, error } = UserFetchData('/client/ServiceReqs/my-ServiceReqs');
    const [reloadPage, setReloadPage] = useState(false);
    const [approvedReqs, setApprovedServiceReqs] = useState([]);
    const [pendingReqs, setPendingServiceReqs] = useState([]);

    useEffect(() => {
        if (serviceReqs) {
            const approvedReqs = serviceReqs.filter(req => req.status === 'approved');
            const pendingReqs = serviceReqs.filter(req => req.status === 'pending');
            setApprovedServiceReqs(approvedReqs);
            setPendingServiceReqs(pendingReqs);
        }
    }, [serviceReqs]);


    const handleWithdraw = async (reqId) => {
        try {
            const response = await makeAuthPostReq("/serviceProvider/cancel", { id: reqId });
            if (response.success) {
                toast.success('Request withdrawn successfully!');
                setTimeout(() => {
                    setReloadPage(true);
                }, 1000); // Reload page after 1 second
            } else {
                toast.error('Failed to Withdraw.');
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    if (reloadPage) {
        window.location.reload();
        return null;
    }

    const ShowRequests = ({ requests }) => {
        return (
            <div className="row row-cols-1 row-cols-lg-2">
                {requests.map((service, index) => (
                    <div className='px-3' key={index}>
                        <div className={`col mb-4 p-3 border border-2 rounded pulse ${service.status === 'pending' ? 'border-danger' : 'border-success'}`}>
                            <h5 className={`${service.status === 'pending' ? 'mybg' : 'bg-success'} mb-3  p-2 text-white px-3 rounded-end`}>{service.serviceName}</h5>
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
                                <div className='mb-3 text-success bg-info bg-opacity-25 my-bold p-2 px-3 rounded-end me-1'>{service.isPaid ? <span>Paid</span> : <span>Payment Pending</span>}</div>
                                <div className='mb-3 text-success bg-info bg-opacity-25 my-bold p-2 px-3 rounded-start ms-1'>{service.status.charAt(0).toUpperCase() + service.status.slice(1)}</div>
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
                                </div>
                            }
                            {service.status === 'pending' && <button className='btn btn-danger rounded mt-4 my-bold p-2 px-3 w-100' onClick={() => {
                                handleWithdraw(service._id)
                            }}>Withdraw Request</button>}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="mt-5 container">
            {loading && !error && <Loading />}

            {error && !loading && <Error errMessage={error} />}

            {pendingReqs.length !== 0 && (
                <div className='mb-4'>
                    <h2 className='text-center iconText text-danger mb-4'>Pending Service Requests</h2>
                    {!loading && !error && (
                        <ShowRequests requests={pendingReqs} />
                    )}
                </div>
            )}


            {approvedReqs.length !== 0 && (
                <div className='mb-5'>
                    <h3 className='text-center iconText text-success mb-4'>Approved Service Requests</h3>
                    {!loading && !error && (
                        <ShowRequests requests={approvedReqs} />
                    )}
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
