import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import Documents from '../assets/data/Documents';
import CloudinaryUpload from '../utils/Cloudinary_Upload';
import { makeAuthPostReq } from '../utils/serverHelper';
import { useCookies } from 'react-cookie';
import serviceProviderContext from './context/ServiceProviderContext';
import formatDate from '../utils/formatDate';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { loadStripe } from '@stripe/stripe-js';
import { Icon } from '@iconify/react';

export default function DocumentService() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [docs, setDocs] = useState({}); // Changed to object to track docs by category
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentPoints, setSelectedDocumentPoints] = useState([]);
    const [cookie, setCookie] = useCookies(["docName", "docFees", "serviceId"]);
    const [fees, setFees] = useState(0);
    const { selectedServiceProvider} = useContext(serviceProviderContext);
    const date = new Date();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState({}); // Track uploading state by category
    const maxSizeInBytes = 250 * 1024;
    const user = JSON.parse(localStorage.getItem("legalUser"));

    useEffect(() => {
        setCookie("docName", name, { path: "/" });
        setCookie("docFees", fees, { path: "/" });
    }, [name, fees]);

    const fetchData = () => {
        const document = Documents[name];
        setSelectedDocument(document);
        setFees(Documents["fees"]);
        const docPoints = Documents[name + "Points"];
        setSelectedDocumentPoints(docPoints);
        
        // Initialize docs object with empty arrays for each category
        if (document) {
            const initialDocs = {};
            document.forEach(category => {
                initialDocs[category.category] = [];
            });
            setDocs(initialDocs);
            
            // Initialize uploading state
            const initialUploading = {};
            document.forEach(category => {
                initialUploading[category.category] = false;
            });
            setUploading(initialUploading);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileInputChange = async (e, category) => {
        const files = Array.from(e.target.files);
        
        if (files.length === 0) return;

        setUploading(prev => ({ ...prev, [category]: true }));
        
        for (const file of files) {
            if (file.size > maxSizeInBytes) {
                toast.error(`File "${file.name}" exceeds the maximum allowed size (250 KB). Please choose a smaller file.`);
                continue;
            }

            try {
                const data = await CloudinaryUpload(file);
                setDocs(prev => ({
                    ...prev,
                    [category]: [...(prev[category] || []), { url: data.url, name: file.name }]
                }));
                toast.success(`File "${file.name}" uploaded successfully for ${category}!`);
            } catch (error) {
                console.error('Error uploading file to Cloudinary:', error);
                toast.error(`Failed to upload "${file.name}". Please try again.`);
            }
        }
        
        setUploading(prev => ({ ...prev, [category]: false }));
        e.target.value = null; // Reset file input
    };

    const removeDocument = (category, index) => {
        setDocs(prev => ({
            ...prev,
            [category]: prev[category].filter((_, i) => i !== index)
        }));
        toast.success('Document removed successfully!');
    };

    // Check if all required categories have at least one document
    const validateDocuments = () => {
        if (!selectedDocument || selectedDocument.length === 0) return false;
        
        for (const category of selectedDocument) {
            if (!docs[category.category] || docs[category.category].length === 0) {
                return false;
            }
        }
        return true;
    };

    // Get all documents as a flat array for backend
    const getAllDocuments = () => {
        const allDocs = [];
        Object.values(docs).forEach(categoryDocs => {
            allDocs.push(...categoryDocs.map(doc => doc.url));
        });
        return allDocs;
    };

    const handleServiceRequest = async () => {
        try {
            const response = await makeAuthPostReq("/notification/create", {
                user: selectedServiceProvider._id,
                userType: "ServiceProvider",
                notificationText: `You had received a request for the ${name.replace(/([A-Z])/g, ' $1')} from ${user.name}`
            })
            if (response.success) {
                console.log("Notification sent");
            }
        }
        catch (error) {
            console.log("Error", error);
        }
    }

    const handleSubmit = async () => {
        if (!validateDocuments()) {
            toast.error("Please upload at least one document from each required category!");
            return;
        }

        setLoading(true);
        try {
            const stripe = await loadStripe("pk_test_51OhVP9SHqLdpzfMap6lAFVjNj46jcT1bfXVlgSjjzqi4N6kNZAXrB74UVkSzbGzKXhPFixHlpiPAvHVntLyvrQfo00em9k2NYT");

            const response = await makeAuthPostReq("/client/makeServiceReq", {
                serviceName: name.replace(/([A-Z])/g, ' $1'),
                serviceProvider: selectedServiceProvider,
                fees: selectedServiceProvider.fees + fees,
                documents: getAllDocuments(),
                serviceDate: formatDate(date),
            });

            if (response.success) {
                handleServiceRequest();
                setCookie("serviceId", response.data._id, { path: "/" });
            }
            const result = await stripe.redirectToCheckout({
                sessionId: response.session.id
            })

            if (result.error) {
                console.log(result.error)
            }
            setLoading(false);
        } catch (error) {
            toast.error("You are not authorized😒");
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            {selectedDocument ? (
                <div className='container py-5'>
                    {/* Header Section */}
                    <div className='text-center mb-5'>
                        <div className='d-flex justify-content-center align-items-center mb-3'>
                            <div className='bg-danger rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm' style={{ width: '60px', height: '60px' }}>
                                <Icon icon="mdi:file-document-multiple" className="text-white" width={30} />
                            </div>
                            <h2 className='fw-bold text-dark mb-0'>{name.replace(/([A-Z])/g, ' $1')}</h2>
                        </div>
                        <p className='text-muted fs-5'>Upload the required documents to proceed with your service request</p>
                    </div>

                    {/* Service Provider Selection Section */}
                    <div className='card border-0 shadow-lg mb-5' style={{ borderRadius: '15px' }}>
                        <div className='card-body p-4' style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>
                                    <h5 className='fw-semibold text-dark mb-1'>
                                        <Icon icon="mdi:account-tie" className="me-2 text-danger" />
                                        Service Provider Selection
                                    </h5>
                                    <p className='text-muted mb-0'>Choose a service provider to continue with your request</p>
                                </div>
                                <div className='d-flex align-items-center gap-3'>
                                    {selectedServiceProvider && (
                                        <div className='d-flex align-items-center'>
                                            <img 
                                                src={selectedServiceProvider.photo} 
                                                className='rounded-circle me-2 shadow-sm' 
                                                style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                                                alt={selectedServiceProvider.name} 
                                            />
                                            <span className='fw-semibold text-dark'>{selectedServiceProvider.name}</span>
                                        </div>
                                    )}
                                    <button 
                                        className='btn btn-danger rounded-pill px-4 py-2 shadow-sm' 
                                        onClick={() => navigate('/serviceProviders')}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className='d-flex align-items-center'>
                                                <HashLoader size={20} color='white' />
                                                <span className='ms-2'>Processing...</span>
                                            </div>
                                        ) : (
                                            <div className='d-flex align-items-center'>
                                                <Icon icon="mdi:account-search" className="me-2" />
                                                {selectedServiceProvider ? 'Change Provider' : 'Select Provider'}
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Required Documents Section */}
                    <div className='mb-5'>
                        <div className='text-center mb-4'>
                            <h3 className='fw-bold text-dark mb-2'>
                                <Icon icon="mdi:clipboard-list" className="me-2 text-danger" />
                                Required Documents
                            </h3>
                            <p className='text-muted'>Please upload at least one document from each category below</p>
                        </div>
                        
                        {/* Document Categories - 2 columns for lg screens */}
                        <div className='row row-cols-lg-2 row-cols-md-1 g-4'>
                            {selectedDocument.map((item, index) => (
                                <div key={index}>
                                    <div className='card border-0 shadow-lg h-100' style={{ borderRadius: '15px' }}>
                                        <div className='card-body p-4'>
                                            {/* Category Header */}
                                            <div className='d-flex align-items-center justify-content-between mb-4'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='bg-danger rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm' style={{ width: '40px', height: '40px' }}>
                                                        <Icon icon="mdi:folder" className="text-white" width={20} />
                                                    </div>
                                                    <h5 className='fw-semibold text-dark mb-0'>{item.category}</h5>
                                                </div>
                                                {docs[item.category] && docs[item.category].length > 0 ? (
                                                    <span className='badge bg-success fs-6 px-3 py-2 shadow-sm'>
                                                        <Icon icon="mdi:check-circle" className="me-1" />
                                                        {docs[item.category].length} document(s)
                                                    </span>
                                                ) : (
                                                    <span className='badge bg-danger fs-6 px-3 py-2 shadow-sm'>
                                                        <Icon icon="mdi:alert-circle" className="me-1" />
                                                        Required
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {/* Acceptable Documents */}
                                            <div className='mb-4'>
                                                <h6 className='fw-semibold text-primary mb-3'>
                                                    <Icon icon="mdi:file-document-outline" className="me-2" />
                                                    Acceptable Documents:
                                                </h6>
                                                <div className='bg-light rounded p-3'>
                                                    <ul className='mb-0'>
                                                        {item.documents.map((document, docIndex) => (
                                                            <li key={docIndex} className='mb-2 d-flex align-items-center'>
                                                                <Icon icon="mdi:check-circle" className="text-success me-2" width={16} />
                                                                <span className='text-dark'>{document.name}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            
                                            {/* File Upload Section */}
                                            <div className='mb-4'>
                                                <div className='text-center p-4 border-2 border-dashed border-secondary rounded' style={{ borderStyle: 'dashed' }}>
                                                    <Icon icon="mdi:cloud-upload" className="text-muted mb-3" width={48} />
                                                    <p className='text-muted mb-3'>Upload at least one document from this category</p>
                                                    <p className='small text-muted mb-3'>Maximum file size: 250 KB per file</p>
                                                    <input
                                                        type='file'
                                                        name='photo'
                                                        id={`customFile-${index}`}
                                                        onChange={(e) => handleFileInputChange(e, item.category)}
                                                        accept='.jpg, .png, .pdf'
                                                        className='form-control'
                                                        multiple
                                                        disabled={uploading[item.category]}
                                                    />
                                                    {uploading[item.category] && (
                                                        <div className='mt-3 text-center'>
                                                            <HashLoader size={25} color='#dc3545' />
                                                            <p className='text-muted mt-2 mb-0'>Uploading documents...</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Uploaded Documents Display */}
                                            {docs[item.category] && docs[item.category].length > 0 && (
                                                <div>
                                                    <h6 className='fw-semibold text-success mb-3'>
                                                        <Icon icon="mdi:check-circle" className="me-2" />
                                                        Uploaded Documents ({docs[item.category].length})
                                                    </h6>
                                                    <div className='row g-2'>
                                                        {docs[item.category].map((doc, docIndex) => (
                                                            <div key={docIndex} className='col-12'>
                                                                <div className='card border-0 bg-light shadow-sm'>
                                                                    <div className='card-body p-3'>
                                                                        <div className='d-flex align-items-center justify-content-between'>
                                                                            <div className='d-flex align-items-center'>
                                                                                <Icon 
                                                                                    icon="mdi:file-document-outline" 
                                                                                    width={24} 
                                                                                    className='me-3 text-primary'
                                                                                />
                                                                                <div>
                                                                                    <p className='fw-semibold mb-1 text-dark'>{doc.name}</p>
                                                                                    <small className='text-success'>
                                                                                        <Icon icon="mdi:check-circle" className="me-1" />
                                                                                        Successfully uploaded
                                                                                    </small>
                                                                                </div>
                                                                            </div>
                                                                            <button
                                                                                type='button'
                                                                                className='btn btn-sm btn-outline-danger'
                                                                                onClick={() => removeDocument(item.category, docIndex)}
                                                                                title='Remove document'
                                                                            >
                                                                                <Icon icon="mdi:close" width={16} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Points to Remember Section */}
                    <div className='card border-0 shadow-lg mb-5' style={{ borderRadius: '15px' }}>
                        <div className='card-body p-4'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='bg-warning rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm' style={{ width: '50px', height: '50px' }}>
                                    <Icon icon="mdi:lightbulb" className="text-white" width={25} />
                                </div>
                                <h3 className='fw-bold text-dark mb-0'>Points to Remember</h3>
                            </div>
                            <div className='row'>
                                {selectedDocumentPoints.map((point, index) => (
                                    <div key={index} className='col-md-6 mb-3'>
                                        <div className='d-flex align-items-start'>
                                            <Icon icon="mdi:check-circle" className="text-success me-2 mt-1" width={20} />
                                            <p className='mb-0 text-dark'>{point}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Payment Note */}
                    <div className='alert alert-info border-0 shadow-sm' style={{ borderRadius: '12px' }}>
                        <div className='d-flex align-items-center'>
                            <Icon icon="mdi:credit-card" className="me-3 text-info" width={24} />
                            <div>
                                <h6 className='fw-semibold mb-1'>Payment Information</h6>
                                <p className='mb-0'>
                                    This is a test payment gateway. Use <span className='fw-bold text-danger'>4000003560000008</span> as the card number to complete the payment successfully.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='text-center'>
                        <button 
                            className='btn btn-danger btn-lg rounded-pill px-5 py-3 shadow-lg' 
                            onClick={handleSubmit}
                            disabled={loading || Object.values(uploading).some(uploading => uploading) || !validateDocuments()}
                            style={{ fontSize: '1.1rem' }}
                        >
                            {loading ? (
                                <div className='d-flex align-items-center'>
                                    <HashLoader size={25} color='white' />
                                    <span className='ms-3'>Processing Request...</span>
                                </div>
                            ) : (
                                <div className='d-flex align-items-center'>
                                    <Icon icon="mdi:send" className="me-2" />
                                    Request Service
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className='container py-5'>
                    <div className='text-center'>
                        <div className='bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-4' style={{ width: '100px', height: '100px' }}>
                            <Icon icon="mdi:file-document-off" className="text-muted" width={50} />
                        </div>
                        <h2 className='fw-bold text-muted mb-3'>Document Details Not Found</h2>
                        <p className='text-muted fs-5'>The requested document service could not be found.</p>
                        <button className='btn btn-danger rounded-pill px-4 py-2' onClick={() => navigate('/services')}>
                            <Icon icon="mdi:arrow-left" className="me-2" />
                            Back to Services
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    )
}
