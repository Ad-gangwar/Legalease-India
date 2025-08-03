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

    return (
        <Layout>
            {selectedDocument ? (<div className='container'>
                {/* ---------------------needed document section----------------------------- */}
                <section className='my-5 mb-3'>
                    <div className='d-flex gap-3 align-items-center mb-4'>
                        <span><h4>Select a Service Provider to continue: </h4></span>
                        <button className='btn btn-danger rounded-pill my-3 p-3 my-bold' onClick={() => navigate('/serviceProviders')}>
                            {loading ? <HashLoader size={35} color='white' /> : 'Select Service Provider'}
                        </button>
                        {selectedServiceProvider && <h5 className='my-bold'>{selectedServiceProvider.name}</h5>}
                    </div>
                    <h2 className='text-center iconText myText'>Required Documents</h2>
                    
                    {/* Document Categories - 2 columns for lg screens */}
                    <div className='w-100 mx-auto row row-cols-lg-2 row-cols-md-1'>
                        {selectedDocument.map((item, index) => (
                            <div className='p-4' key={index}>
                                <div className='w-100 h-100 p-4 px-5 shadow-lg'>
                                    <div className='d-flex align-items-center mb-3'>
                                        <span className='d-inline-flex p-2 rounded-end my-bold' style={{ color: "#7c5300", backgroundColor: "#eadad973" }}>
                                            {item.category}
                                        </span>
                                        {docs[item.category] && docs[item.category].length > 0 && (
                                            <span className='ms-3 badge bg-success'>
                                                ✓ {docs[item.category].length} document(s) uploaded
                                            </span>
                                        )}
                                        {(!docs[item.category] || docs[item.category].length === 0) && (
                                            <span className='ms-3 badge bg-danger'>
                                                ⚠ Required
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className='mb-3'>
                                        <h6 className='mb-2'>Acceptable Documents:</h6>
                                        <ul>
                                            {item.documents.map((document, docIndex) => (
                                                <li className='my-1' key={docIndex}>{document.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div>
                                        <span>Upload at least one document from this category (less than 250 KB each)</span>
                                        <div className='mt-3'>
                                            <input
                                                type='file'
                                                name='photo'
                                                id={`customFile-${index}`}
                                                onChange={(e) => handleFileInputChange(e, item.category)}
                                                accept='.jpg, .png, .pdf'
                                                className='cursor-pointer h-100 w-100'
                                                multiple
                                                disabled={uploading[item.category]}
                                            />
                                            {uploading[item.category] && (
                                                <div className='mt-2 text-center'>
                                                    <HashLoader size={20} color='#dc3545' />
                                                    <span className='ms-2'>Uploading...</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Display uploaded documents for this category */}
                                        {docs[item.category] && docs[item.category].length > 0 && (
                                            <div className='mt-4'>
                                                <h6 className='mb-3'>Uploaded Documents for {item.category} ({docs[item.category].length})</h6>
                                                <div className='row'>
                                                    {docs[item.category].map((doc, docIndex) => (
                                                        <div key={docIndex} className='col-md-6 col-lg-4 mb-3'>
                                                            <div className='card border p-3 position-relative'>
                                                                <div className='d-flex align-items-center'>
                                                                    <Icon 
                                                                        icon="mdi:file-document-outline" 
                                                                        width={24} 
                                                                        className='me-2 text-primary'
                                                                    />
                                                                    <div className='flex-grow-1'>
                                                                        <small className='text-muted d-block'>{doc.name}</small>
                                                                        <small className='text-success'>✓ Uploaded</small>
                                                                    </div>
                                                                    <button
                                                                        type='button'
                                                                        className='btn btn-sm btn-outline-danger ms-2'
                                                                        onClick={() => removeDocument(item.category, docIndex)}
                                                                        title='Remove document'
                                                                    >
                                                                        <Icon icon="mdi:close" width={16} />
                                                                    </button>
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
                </section>

                {/* --------------------------------------Points to remember------------- */}
                <section>
                    <h2 className='iconText myText my-4'>Points to Remember</h2>
                    <ul>
                        {selectedDocumentPoints.map((point, index) => (
                            <li key={index} className='my-3'>{point}</li>
                        ))}
                    </ul>
                </section>
                
                <p className='my-4'><span className='my-bold'>Note: </span>This is test payment gateway of Stripe. Use <span className='iconText'>4000003560000008</span> as the card number to successfully complete the payment. Remember to copy it before proceeding to payment page.</p>
                <button 
                    className='btn btn-danger rounded-pill mx-auto d-block mt-4 mb-5 p-3 fs-5 my-bold px-5' 
                    onClick={handleSubmit}
                    disabled={loading || Object.values(uploading).some(uploading => uploading) || !validateDocuments()}
                >
                    {loading ? <HashLoader size={25} color='white' /> : 'Request Service'}
                </button>
            </div>) : <div className='text-center my-5 h2 py-4'>😒 Document Details not found!</div>}
        </Layout>
    )
}
