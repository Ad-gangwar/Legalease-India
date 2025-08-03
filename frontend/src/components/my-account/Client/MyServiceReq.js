import React, { useState, useEffect } from 'react';
import UserFetchData from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import Error from '../../Error/Error';
import formatDate from '../../../utils/formatDate';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { makeAuthPostReq } from '../../../utils/serverHelper';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';

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

    // Function to get file type icon and determine if it's an image
    const getFileInfo = (url) => {
        const extension = url.split('.').pop()?.toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
        const isPdf = extension === 'pdf';
        
        let icon = "mdi:file-document-outline";
        if (isImage) icon = "mdi:file-image-outline";
        if (isPdf) icon = "mdi:file-pdf-box";
        
        return { isImage, icon, extension };
    };

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
                            
                            {/* Documents Section */}
                            <div className='mb-3'>
                                <h6 className='mb-2 d-flex align-items-center'>
                                    <Icon icon="mdi:file-document-multiple" className='me-2' />
                                    My Documents ({service.documents.length})
                                </h6>
                                {service.documents.length > 0 ? (
                                    <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-2'>
                                        {service.documents.map((doc, docIndex) => {
                                            const fileInfo = getFileInfo(doc);
                                            return (
                                                <div key={docIndex} className='col'>
                                                    <div className='card border h-100'>
                                                        <div className='card-body p-2'>
                                                            <div className='d-flex align-items-center mb-1'>
                                                                <Icon 
                                                                    icon={fileInfo.icon} 
                                                                    width={16} 
                                                                    className='me-1 text-primary'
                                                                />
                                                                <small className='text-muted'>Doc {docIndex + 1}</small>
                                                            </div>
                                                            {fileInfo.isImage ? (
                                                                <Link to={doc} target='_blank' className='d-block'>
                                                                    <img 
                                                                        src={doc} 
                                                                        alt={`Document ${docIndex + 1}`} 
                                                                        className="img-fluid rounded" 
                                                                        style={{ maxHeight: '100px', width: '100%', objectFit: 'cover' }}
                                                                    />
                                                                </Link>
                                                            ) : (
                                                                <div className='text-center py-2'>
                                                                    <Icon 
                                                                        icon={fileInfo.icon} 
                                                                        width={24} 
                                                                        className='text-muted mb-1'
                                                                    />
                                                                    <div>
                                                                        <small className='text-muted d-block'>.{fileInfo.extension?.toUpperCase()}</small>
                                                                        <Link 
                                                                            to={doc} 
                                                                            target='_blank' 
                                                                            className='btn btn-sm btn-outline-primary mt-1'
                                                                            style={{ fontSize: '0.7rem' }}
                                                                        >
                                                                            View
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className='text-center py-2 text-muted'>
                                        <Icon icon="mdi:file-document-outline" width={24} className='mb-1' />
                                        <small>No documents uploaded</small>
                                    </div>
                                )}
                            </div>

                            <div className='d-flex justify-content-between'>
                                <div className='mb-3 text-success bg-info bg-opacity-25 my-bold p-2 px-3 rounded-end me-1'>
                                    {service.isPaid ? <span>Paid</span> : <span>Payment Pending</span>}
                                </div>
                                <div className='mb-3 text-success bg-info bg-opacity-25 my-bold p-2 px-3 rounded-start ms-1'>
                                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                </div>
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
