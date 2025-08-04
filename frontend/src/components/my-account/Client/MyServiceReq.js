import React, { useState, useEffect } from 'react';
import UserFetchData from '../../../hooks/userFetchData';
import Loading, { ErrorFallback, EmptyState } from '../../Loader/Loading';
import formatDate from '../../../utils/formatDate';
import { Link } from 'react-router-dom';
import { makeAuthPostReq } from '../../../utils/serverHelper';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';

export default function MyServiceReq() {
    const { data: serviceReqs, loading, error, retry } = UserFetchData('/client/ServiceReqs/my-ServiceReqs');
    const [selectedService, setSelectedService] = useState(null);
    const [approvedServiceReqs, setApprovedServiceReqs] = useState([]);
    const [pendingServiceReqs, setPendingServiceReqs] = useState([]);
    const [actionLoading, setActionLoading] = useState(false);

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

    const ServiceTable = ({ serviceReqs, title }) => {
        if (serviceReqs.length === 0) {
            return (
                <EmptyState 
                    message={`No ${title.toLowerCase()} service requests`}
                    icon="mdi:clipboard-list-outline"
                />
            );
        }

        return (
            <div className="table-responsive">
                <table className='table table-hover border-0 shadow-sm rounded'>
                    <thead className='bg-light'>
                        <tr>
                            <th scope='col' className='border-0 py-3 px-4 fw-semibold text-muted'>SERVICE PROVIDER</th>
                            <th scope='col' className='border-0 py-3 px-4 fw-semibold text-muted'>SERVICE</th>
                            <th scope='col' className='border-0 py-3 px-4 fw-semibold text-muted'>PAYMENT</th>
                            <th scope='col' className='border-0 py-3 px-4 fw-semibold text-muted'>PRICE</th>
                            <th scope='col' className='border-0 py-3 px-4 fw-semibold text-muted'>BOOKED ON</th>
                        </tr>
                    </thead>

                    <tbody>
                        {serviceReqs.map((service, index) => (
                            <tr key={index} className='cursor-pointer' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openModal(service)}>
                                <td className='py-3 px-4'>
                                    <div className='d-flex align-items-center'>
                                        <img src={service.serviceProvider.photo} className='rounded-circle me-3' style={{ width: "45px", height: "45px", objectFit: "cover" }} alt={service.serviceProvider.name} />
                                        <div>
                                            <div className='fw-semibold text-dark'>{service.serviceProvider.name}</div>
                                            <small className='text-muted'>{service.serviceProvider.email}</small>
                                        </div>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <span className='fw-semibold text-dark'>{service.serviceName}</span>
                                </td>
                                <td className='py-3 px-4'>
                                    <div className='d-flex align-items-center gap-2'>
                                        <div className={`rounded-circle ${service.isPaid ? 'bg-success' : 'bg-warning'}`} style={{ width: "8px", height: "8px" }}></div>
                                        <span className={`fw-semibold ${service.isPaid ? 'text-success' : 'text-warning'}`}>
                                            {service.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </div>
                                </td>
                                <td className='py-3 px-4'>
                                    <span className='fw-semibold text-dark'>₹{service.fees}</span>
                                </td>
                                <td className='py-3 px-4'>
                                    <span className='text-muted'>{formatDate(service.serviceDate)}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const handleCancel = async () => {
        try {
            setActionLoading(true);
            const response = await makeAuthPostReq("/client/ServiceReqs/cancel", {
                serviceId: selectedService._id
            });

            if (response.success) {
                toast.success("Service request cancelled successfully!");
                closeModal();
                retry(); // Refresh the data
            } else {
                toast.error("Failed to cancel service request!");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to cancel service request");
        } finally {
            setActionLoading(false);
        }
    };

    const renderContent = () => {
        if (loading) {
            return <Loading message="Loading service requests..." />;
        }

        if (error) {
            return (
                <ErrorFallback 
                    error={error}
                    message="Failed to load service requests"
                    onRetry={retry}
                />
            );
        }

        if (!serviceReqs || serviceReqs.length === 0) {
            return (
                <EmptyState 
                    message="No service requests available"
                    icon="mdi:clipboard-list-outline"
                />
            );
        }

        return (
            <>
                {/* Approved Service Requests */}
                <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px' }}>
                            <Icon icon="mdi:check" className="text-white" width={18} />
                        </div>
                        <h5 className="mb-0 fw-semibold text-success">Approved Service Requests</h5>
                        <span className="badge bg-success ms-auto">{approvedServiceReqs.length}</span>
                    </div>
                    <ServiceTable serviceReqs={approvedServiceReqs} title="Approved" />
                </div>

                {/* Pending Service Requests */}
                <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                        <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '32px', height: '32px' }}>
                            <Icon icon="mdi:clock-outline" className="text-white" width={18} />
                        </div>
                        <h5 className="mb-0 fw-semibold text-warning">Pending Service Requests</h5>
                        <span className="badge bg-warning ms-auto">{pendingServiceReqs.length}</span>
                    </div>
                    <ServiceTable serviceReqs={pendingServiceReqs} title="Pending" />
                </div>
            </>
        );
    };

    return (
        <div className='container py-4'>
            {/* Header Section */}
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div>
                    <h4 className='fw-bold text-dark mb-1'>My Service Requests</h4>
                    <p className='text-muted mb-0'>Manage and track your legal service requests</p>
                </div>
                <div className='d-flex gap-2'>
                    <div className="text-center">
                        <div className="badge bg-success fs-6 px-3 py-2">Approved: {approvedServiceReqs.length}</div>
                    </div>
                    <div className="text-center">
                        <div className="badge bg-warning fs-6 px-3 py-2">Pending: {pendingServiceReqs.length}</div>
                    </div>
                </div>
            </div>

            {renderContent()}

            {/* Modal for service details */}
            {selectedService && (
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px' }}>
                            <div className="modal-header border-0" style={{ background: selectedService.status === 'approved' ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)', borderRadius: '15px 15px 0 0' }}>
                                <h5 className="modal-title fw-semibold text-white" id="exampleModalLabel">
                                    <Icon icon={selectedService.status === 'approved' ? "mdi:check-circle" : "mdi:file-document-outline"} className="me-2" />
                                    Service Request Details
                                </h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body p-4" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
                                            <div className="card-body p-4">
                                                <h6 className="fw-semibold text-primary mb-3">
                                                    <Icon icon="mdi:account-tie" className="me-2" />
                                                    Service Provider Information
                                                </h6>
                                                <div className="d-flex align-items-center mb-3">
                                                    <img src={selectedService.serviceProvider.photo} className="rounded-circle me-3 shadow-sm" style={{ width: '60px', height: '60px', objectFit: 'cover' }} alt={selectedService.serviceProvider.name} />
                                                    <div>
                                                        <p className="fw-semibold mb-1 text-dark">{selectedService.serviceProvider.name}</p>
                                                        <small className="text-muted">{selectedService.serviceProvider.email}</small>
                                                    </div>
                                                </div>
                                                <p className="mb-2"><strong>Phone:</strong> {selectedService.serviceProvider.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
                                            <div className="card-body p-4">
                                                <h6 className="fw-semibold text-primary mb-3">
                                                    <Icon icon="mdi:information-outline" className="me-2" />
                                                    Service Information
                                                </h6>
                                                <p className="mb-2"><strong>Service:</strong> {selectedService.serviceName}</p>
                                                <p className="mb-2"><strong>Fees:</strong> ₹{selectedService.fees}</p>
                                                <p className="mb-2"><strong>Date:</strong> {formatDate(selectedService.serviceDate)}</p>
                                                <p className="mb-0">
                                                    <strong>Status:</strong> 
                                                    <span className={`badge ${selectedService.status === 'approved' ? 'bg-success' : 'bg-warning'} ms-2`}>
                                                        {selectedService.status}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Documents Section */}
                                <div className="mt-4">
                                    <h6 className="fw-semibold text-primary mb-3">
                                        <Icon icon="mdi:file-document-multiple" className="me-2" />
                                        Uploaded Documents
                                    </h6>
                                    {selectedService.documents && selectedService.documents.length > 0 ? (
                                        <div className="row g-3">
                                            {selectedService.documents.map((doc, index) => {
                                                const fileInfo = getFileInfo(doc);
                                                return (
                                                    <div key={index} className="col-md-6 col-lg-4">
                                                        <div className="card border-0 shadow-sm h-100">
                                                            <div className="card-body text-center p-3">
                                                                {fileInfo.isImage ? (
                                                                    <div className="mb-3">
                                                                        <img 
                                                                            src={doc} 
                                                                            alt={`Document ${index + 1}`}
                                                                            className="img-fluid rounded shadow-sm mb-2"
                                                                            style={{ maxHeight: '120px', objectFit: 'cover' }}
                                                                        />
                                                                        <p className="mb-2 small text-muted fw-semibold">{fileInfo.extension?.toUpperCase()}</p>
                                                                    </div>
                                                                ) : (
                                                                    <div className="mb-3">
                                                                        <Icon icon={fileInfo.icon} className="text-primary mb-2" width={32} />
                                                                        <p className="mb-2 small text-muted fw-semibold">{fileInfo.extension?.toUpperCase()}</p>
                                                                    </div>
                                                                )}
                                                                <a 
                                                                    href={doc} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-sm btn-outline-primary"
                                                                >
                                                                    <Icon icon="mdi:eye" className="me-1" />
                                                                    View
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <Icon icon="mdi:file-document-outline" className="text-muted mb-2" width={48} />
                                            <p className="text-muted mb-0">No documents uploaded</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer border-0 bg-light">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    <Icon icon="mdi:close" className="me-1" />
                                    Close
                                </button>
                                {selectedService.status === 'pending' && (
                                    <button 
                                        type="button" 
                                        className="btn btn-danger" 
                                        onClick={handleCancel}
                                        disabled={actionLoading}
                                    >
                                        {actionLoading ? (
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : (
                                            <Icon icon="mdi:cancel" className="me-1" />
                                        )}
                                        Cancel Request
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
