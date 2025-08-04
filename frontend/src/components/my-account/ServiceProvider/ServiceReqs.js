import React, { useState, useEffect } from 'react';
import UserFetchData from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import formatDate from '../../../utils/formatDate';
import { Link } from 'react-router-dom';
import { makeAuthPostReq } from '../../../utils/serverHelper';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';

export default function MyServiceReqs() {
    const { data: serviceReqs, loading, error } = UserFetchData('/serviceProvider/ServiceReqs/my-ServiceReqs');
    const [selectedService, setSelectedService] = useState(null);
    const [approvedServiceReqs, setApprovedServiceReqs] = useState([]);
    const [pendingServiceReqs, setPendingServiceReqs] = useState([]);
    const loggedUser = JSON.parse(localStorage.getItem("legalUser"));

    useEffect(() => {
        if (serviceReqs) {
            const approvedReqs = serviceReqs.filter(req => req.status === 'approved');
            const pendingReqs = serviceReqs.filter(req => req.status === 'pending');
            setApprovedServiceReqs(approvedReqs);
            setPendingServiceReqs(pendingReqs);
        }
    }, [serviceReqs]);


    const openModal = async (service) => {
        await setSelectedService(service);
    };

    const closeModal = () => {
        setSelectedService(null);
    };

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

    const ServiceTable = ({ serviceReqs }) => {
        return (<div className="table-responsive">
            <table className='w-100 text-align-left'>
                <thead className='bg-secondary bg-opacity-10'>
                    <tr>
                        <th scope='col' className='p-3 iconText'>NAME</th>
                        <th scope='col' className='p-3 iconText'>SERVICE</th>
                        <th scope='col' className='p-3 iconText'>PAYMENT</th>
                        <th scope='col' className='p-3 iconText'>PRICE</th>
                        <th scope='col' className='p-3 iconText'>BOOKED ON</th>
                    </tr>
                </thead>

                <tbody>
                    {serviceReqs.map((service, index) => (
                        <tr key={index} className='cursor-pointer' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openModal(service)}>
                            <th scope='row' className='d-flex align-items-center my-4'>
                                <img src={service.client.photo} className='rounded-circle' style={{ maxWidth: "50px" }} alt={service.client.name}></img>
                                <div className='ps-3'>
                                    <div className='iconText'>{service.client.name}</div>
                                    <small className='fw-normal'>{service.client.email}</small>
                                </div>
                            </th>
                            <td className='p-3 my-bold'>{service.serviceName}</td>
                            <td className='p-3'>
                                <div className='d-flex align-items-center gap-2'>
                                    <div className={`rounded-circle ${service.isPaid ? 'bg-success' : 'bg-danger'}`} style={{ width: "10px", height: "10px" }}></div>
                                    {service.isPaid ? 'Paid' : 'Pending'}
                                </div>
                            </td>
                            <td className='p-3'>{service.fees}</td>
                            <td className='p-3'>{formatDate(service.serviceDate)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
    }


    const handleServiceRequest = async (myText) => {
        try {
            const response = await makeAuthPostReq("/notification/create", {
                user: selectedService.client._id,
                userType: "Client",
                notificationText: myText
            });
            if (response.success) {
                console.log("Notification sent successfully");
            } else {
                console.error("Failed to create notification:", response.message);
            }
        } catch (error) {
            console.error("Error creating notification:", error);
        }
    };



    const handleCancel = async (name) => {
        try {
            const response = await makeAuthPostReq("/serviceProvider/cancel", { id: selectedService._id });
            if (response.success) {
                const cancelText = `Your request for ${name} had been cancelled by ${loggedUser.name} due to some issue 😒😒. Try requesting other service provider.`;
                handleServiceRequest(cancelText);
                toast('Request Cancelled.', {
                    icon: '😒',
                });
                window.location.reload();
            }
            else {
                toast.error('Failed to cancel.');
            }
        }
        catch (error) {
            console.log("Error", error);
        }
    }

    const handleApprove = async (name) => {
        try {
            const response = await makeAuthPostReq("/serviceProvider/approve", { id: selectedService._id });
            if (response.success) {
                const approveText = `Your request for the ${name} had been approved by the ${loggedUser.name} 😀😀. Your document once completed will be sent to your provided email.`;
                handleServiceRequest(approveText);
                toast('Request Approved.', {
                    icon: '😀',
                });
                window.location.reload();
            }
            else {
                toast.error('Failed to approve.');
            }
        }
        catch (error) {
            console.log("Error", error);
        }
    }
   
    return (
        <div>
            {loading && (
                <Loading />
            )}

            {!loading && error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {pendingServiceReqs.length !== 0 && (
                <div className='mb-5'>
                    <h3 className='text-center iconText text-danger mb-4'>Pending Service Requests</h3>
                    {!loading && !error && (
                        <ServiceTable serviceReqs={pendingServiceReqs} />
                    )}
                </div>
            )}


            {approvedServiceReqs.length !== 0 && (
                <div>
                    <h3 className='text-center iconText text-success mb-4'>Approved Service Requests</h3>
                    {!loading && !error && (
                        <ServiceTable serviceReqs={approvedServiceReqs} />
                    )}
                </div>
            )}


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    {selectedService && <div className="modal-content">
                        <div className="modal-header bg-info bg-opacity-25 shadow">
                            <h5 className='modal-title fw-bold myText' id="exampleModalLabel"><span className='text-dark my-bold'>Service Name:</span>{" " + selectedService.serviceName}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-secondary bg-opacity-10 p-4">
                            <h6 className='mb-3 mt-2'>Service Request Date: <span className='iconText text-success h5'>{formatDate(selectedService.serviceDate)}</span></h6>
                            
                            {/* Documents Section */}
                            <div className='mb-4'>
                                <h6 className='mb-3 d-flex align-items-center'>
                                    <Icon icon="mdi:file-document-multiple" className='me-2' />
                                    Provided Documents ({selectedService.documents.length})
                                </h6>
                                {selectedService.documents.length > 0 ? (
                                    <div className='row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-3'>
                                        {selectedService.documents.map((doc, index) => {
                                            const fileInfo = getFileInfo(doc);
                                            return (
                                                <div key={index} className='col'>
                                                    <div className='card border h-100'>
                                                        <div className='card-body p-3'>
                                                            <div className='d-flex align-items-center mb-2'>
                                                                <Icon 
                                                                    icon={fileInfo.icon} 
                                                                    width={20} 
                                                                    className='me-2 text-primary'
                                                                />
                                                                <small className='text-muted'>Document {index + 1}</small>
                                                            </div>
                                                            {fileInfo.isImage ? (
                                                                <Link to={doc} target='_blank' className='d-block'>
                                                                    <img 
                                                                        src={doc} 
                                                                        alt={`Document ${index + 1}`} 
                                                                        className="img-fluid rounded" 
                                                                        style={{ maxHeight: '150px', width: '100%', objectFit: 'cover' }}
                                                                    />
                                                                </Link>
                                                            ) : (
                                                                <div className='text-center py-3'>
                                                                    <Icon 
                                                                        icon={fileInfo.icon} 
                                                                        width={40} 
                                                                        className='text-muted mb-2'
                                                                    />
                                                                    <div>
                                                                        <small className='text-muted d-block'>.{fileInfo.extension?.toUpperCase()}</small>
                                                                        <Link 
                                                                            to={doc} 
                                                                            target='_blank' 
                                                                            className='btn btn-sm btn-outline-primary mt-2'
                                                                        >
                                                                            View Document
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
                                    <div className='text-center py-3 text-muted'>
                                        <Icon icon="mdi:file-document-outline" width={40} className='mb-2' />
                                        <p>No documents provided</p>
                                    </div>
                                )}
                            </div>

                            {/* Client Information */}
                            <div>
                                <h6 className='text-success text-para my-3 d-flex align-items-center'>
                                    <Icon icon="mdi:account" className='me-2' />
                                    Requested by:
                                </h6>
                                <h5 className='mb-3 text-danger iconText'>{selectedService.client.name}</h5>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <p><Icon icon="mdi:email" className='me-2' />Email: <span className='my-bold'>{selectedService.client.email}</span></p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p><Icon icon="mdi:phone" className='me-2' />Contact: <span className='my-bold'>{selectedService.client.phone}</span></p>
                                    </div>
                                </div>
                                <p><Icon icon="mdi:map-marker" className='me-2' />Address: <span className='my-bold'>{selectedService.client.address}</span></p>
                            </div>

                            {/* Payment Information */}
                            <div className='d-flex gap-3 align-items-center mt-3 p-3 bg-light rounded'>
                                <div className='d-flex align-items-center'>
                                    <Icon icon="mdi:currency-inr" className='me-1' />
                                    Fees: <span className='my-bold ms-1'> Rs. {selectedService.fees} /-</span>
                                </div>
                                <div className='d-flex align-items-center gap-2'>
                                    <div className={`rounded-circle ${selectedService.isPaid ? 'bg-success' : 'bg-danger'}`} style={{ width: "10px", height: "10px" }}></div>
                                    <span className={selectedService.isPaid ? 'text-success' : 'text-danger'}>
                                        {selectedService.isPaid ? 'Paid' : 'Pending'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {selectedService.status === 'pending' && <div className="modal-footer bg-info bg-opacity-25">
                            <button type="button" className="btn btn-danger my-bold" data-bs-dismiss="modal" onClick={() => {
                                closeModal();
                                handleCancel(selectedService.serviceName);
                            }}>Cancel</button>
                            <button type="button" className="btn btn-success my-bold" onClick={() => {
                                handleApprove(selectedService.serviceName);
                            }}>Approve</button>
                        </div>}
                    </div>}
                </div>
            </div>

            {!loading && !error && serviceReqs.length === 0 && (
                <h2 className="mt-5 text-center text-danger">
                    You did not have any service request yet!
                </h2>
            )}
        </div>
    );
}


