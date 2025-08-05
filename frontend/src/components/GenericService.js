import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useParams } from 'react-router-dom';
import CloudinaryUpload from '../utils/Cloudinary_Upload';
import { makeAuthPostReq } from '../utils/serverHelper';
import { useCookies } from 'react-cookie';
import serviceProviderContext from './context/ServiceProviderContext';
import formatDate from '../utils/formatDate';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { loadStripe } from '@stripe/stripe-js';
import { Icon } from '@iconify/react';

export default function GenericService() {
    const { serviceType, serviceName } = useParams();
    const navigate = useNavigate();
    const [docs, setDocs] = useState([]);
    const [serviceDetails, setServiceDetails] = useState({});
    const [cookie, setCookie] = useCookies(["serviceName", "serviceFees", "serviceId"]);
    const [fees, setFees] = useState(0);
    const { selectedServiceProvider} = useContext(serviceProviderContext);
    const date = new Date();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const maxSizeInBytes = 250 * 1024;
    const user = JSON.parse(localStorage.getItem("legalUser"));

    useEffect(() => {
        setCookie("serviceName", serviceName, { path: "/" });
        setCookie("serviceFees", fees, { path: "/" });
    }, [serviceName, fees]);

    // Get service details based on service type and name
    const getServiceDetails = () => {
        const serviceDetailsMap = {
            'consultation': {
                title: 'Legal Consultation Service',
                description: 'Professional legal consultation and advice services',
                requirements: [
                    'Brief description of your legal issue',
                    'Relevant documents (if any)',
                    'Contact information for follow-up',
                    'Preferred consultation time'
                ],
                points: [
                    'Initial consultation fee applies',
                    'Follow-up sessions available',
                    'Confidentiality guaranteed',
                    'Expert legal advice provided',
                    'Flexible scheduling options',
                    'Written consultation summary provided'
                ],
                baseFee: 500
            },
            'dispute-resolution': {
                title: 'Dispute Resolution Service',
                description: 'Professional mediation and arbitration services',
                requirements: [
                    'Description of the dispute',
                    'Parties involved',
                    'Relevant documents and evidence',
                    'Preferred resolution method'
                ],
                points: [
                    'Neutral third-party mediation',
                    'Confidential proceedings',
                    'Legally binding agreements',
                    'Cost-effective alternative to litigation',
                    'Flexible scheduling',
                    'Professional dispute resolution experts'
                ],
                baseFee: 1000
            },
            'notarial': {
                title: 'Notarial Services',
                description: 'Official document notarization and authentication',
                requirements: [
                    'Original documents to be notarized',
                    'Valid government ID',
                    'Witness information (if required)',
                    'Document purpose and context'
                ],
                points: [
                    'Official notary services',
                    'Document authentication',
                    'Legal validity assurance',
                    'Same-day service available',
                    'Mobile notary services',
                    'Secure document handling'
                ],
                baseFee: 300
            },
            'litigation-support': {
                title: 'Litigation Support Services',
                description: 'Comprehensive support for legal proceedings',
                requirements: [
                    'Case details and background',
                    'Court documents and filings',
                    'Evidence and witness information',
                    'Legal research requirements'
                ],
                points: [
                    'Comprehensive legal research',
                    'Document preparation and filing',
                    'Evidence collection support',
                    'Trial preparation assistance',
                    'Expert witness coordination',
                    'Case strategy development'
                ],
                baseFee: 1500
            },
            'compliance': {
                title: 'Regulatory Compliance Services',
                description: 'Comprehensive compliance audit and advisory services',
                requirements: [
                    'Business/organization details',
                    'Current compliance status',
                    'Regulatory requirements',
                    'Industry-specific regulations'
                ],
                points: [
                    'Comprehensive compliance audit',
                    'Regulatory gap analysis',
                    'Policy development and implementation',
                    'Training and education programs',
                    'Ongoing monitoring services',
                    'Risk assessment and mitigation'
                ],
                baseFee: 2000
            },
            'legal-representation': {
                title: 'Legal Representation Services',
                description: 'Professional legal representation in various proceedings',
                requirements: [
                    'Case details and legal matter',
                    'Court/tribunal information',
                    'Relevant documents and evidence',
                    'Timeline and deadlines'
                ],
                points: [
                    'Professional legal representation',
                    'Court appearance and advocacy',
                    'Legal strategy development',
                    'Document preparation and filing',
                    'Client communication and updates',
                    'Settlement negotiation support'
                ],
                baseFee: 2500
            },
            'intellectual-property': {
                title: 'Intellectual Property Services',
                description: 'Comprehensive IP protection and management services',
                requirements: [
                    'IP description and details',
                    'Current protection status',
                    'Business context and usage',
                    'Target markets and jurisdictions'
                ],
                points: [
                    'Trademark registration and protection',
                    'Patent application and filing',
                    'Copyright registration',
                    'IP infringement analysis',
                    'Licensing and commercialization',
                    'IP portfolio management'
                ],
                baseFee: 3000
            },
            'family-law': {
                title: 'Family Law Services',
                description: 'Comprehensive family law and domestic relations services',
                requirements: [
                    'Family law matter details',
                    'Parties involved',
                    'Relevant documents and agreements',
                    'Timeline and urgency'
                ],
                points: [
                    'Divorce and separation proceedings',
                    'Child custody and support matters',
                    'Adoption and guardianship',
                    'Domestic violence protection',
                    'Property division and settlement',
                    'Family mediation services'
                ],
                baseFee: 2000
            },
            'real-estate': {
                title: 'Real Estate Legal Services',
                description: 'Comprehensive real estate law and transaction services',
                requirements: [
                    'Property details and location',
                    'Transaction type and purpose',
                    'Current ownership and title',
                    'Parties involved in transaction'
                ],
                points: [
                    'Property title search and verification',
                    'Lease agreement drafting and review',
                    'Property transaction support',
                    'Land dispute resolution',
                    'Property registration assistance',
                    'Real estate due diligence'
                ],
                baseFee: 2500
            },
            'corporate': {
                title: 'Corporate and Business Services',
                description: 'Comprehensive corporate law and business services',
                requirements: [
                    'Business structure and details',
                    'Corporate governance needs',
                    'Transaction or compliance requirements',
                    'Industry and regulatory context'
                ],
                points: [
                    'Business formation and incorporation',
                    'Corporate governance advisory',
                    'Mergers and acquisitions support',
                    'Contract negotiation and drafting',
                    'Corporate compliance services',
                    'Board advisory and governance'
                ],
                baseFee: 3000
            },
            'employment': {
                title: 'Employment and Labor Law Services',
                description: 'Comprehensive employment law and workplace services',
                requirements: [
                    'Employment matter details',
                    'Workplace situation description',
                    'Relevant policies and agreements',
                    'Parties involved and timeline'
                ],
                points: [
                    'Employment contract drafting',
                    'Workplace dispute resolution',
                    'Labor law compliance',
                    'Employee handbook development',
                    'Termination and severance matters',
                    'Workplace investigations'
                ],
                baseFee: 2000
            },
            'cyber-law': {
                title: 'Cyber Law and Data Protection Services',
                description: 'Comprehensive cybersecurity and data protection services',
                requirements: [
                    'Data protection needs assessment',
                    'Current cybersecurity status',
                    'Regulatory compliance requirements',
                    'Industry-specific considerations'
                ],
                points: [
                    'Data privacy compliance (GDPR, etc.)',
                    'Cybersecurity legal framework',
                    'Cybercrime prevention strategies',
                    'Digital rights management',
                    'E-commerce legal support',
                    'Social media law compliance'
                ],
                baseFee: 2500
            },
            'training': {
                title: 'Legal Training and Workshop Services',
                description: 'Professional legal education and training programs',
                requirements: [
                    'Training topic and objectives',
                    'Target audience and size',
                    'Duration and format preferences',
                    'Specific legal areas of focus'
                ],
                points: [
                    'Comprehensive legal education programs',
                    'Specialized legal training sessions',
                    'Professional development workshops',
                    'Compliance training programs',
                    'Contract law training',
                    'Corporate law education'
                ],
                baseFee: 1500
            },
            'customized': {
                title: 'Customized Legal Services',
                description: 'Tailored legal solutions for specific client needs',
                requirements: [
                    'Specific legal needs and objectives',
                    'Project scope and timeline',
                    'Budget considerations',
                    'Industry and context details'
                ],
                points: [
                    'Tailored legal solutions',
                    'Project-based legal support',
                    'Legal process outsourcing',
                    'Legal technology solutions',
                    'Legal risk management',
                    'Strategic legal consulting'
                ],
                baseFee: 2000
            }
        };

        return serviceDetailsMap[serviceType] || {
            title: 'Legal Service',
            description: 'Professional legal services',
            requirements: ['Service requirements will be determined based on your needs'],
            points: ['Professional service delivery', 'Quality assurance', 'Client satisfaction'],
            baseFee: 1000
        };
    };

    useEffect(() => {
        const details = getServiceDetails();
        setServiceDetails(details);
        setFees(details.baseFee);
    }, [serviceType, serviceName]);

    const handleFileInputChange = async (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length === 0) return;

        setUploading(true);
        
        for (const file of files) {
            if (file.size > maxSizeInBytes) {
                toast.error(`File "${file.name}" exceeds the maximum allowed size (250 KB). Please choose a smaller file.`);
                continue;
            }

            try {
                const data = await CloudinaryUpload(file);
                setDocs((prevDocs) => [...prevDocs, { url: data.url, name: file.name }]);
                toast.success(`File "${file.name}" uploaded successfully!`);
            } catch (error) {
                console.error('Error uploading file to Cloudinary:', error);
                toast.error(`Failed to upload "${file.name}". Please try again.`);
            }
        }
        
        setUploading(false);
        e.target.value = null; // Reset file input
    };

    const removeDocument = (index) => {
        setDocs((prevDocs) => prevDocs.filter((_, i) => i !== index));
        toast.success('Document removed successfully!');
    };

    const handleServiceRequest = async () => {
        try {
            const response = await makeAuthPostReq("/notification/create", {
                user: selectedServiceProvider._id,
                userType: "ServiceProvider",
                notificationText: `You had received a request for ${serviceName.replace(/([A-Z])/g, ' $1')} from ${user.name}`
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
        setLoading(true);
        try {
            const stripe = await loadStripe("pk_test_51OhVP9SHqLdpzfMap6lAFVjNj46jcT1bfXVlgSjjzqi4N6kNZAXrB74UVkSzbGzKXhPFixHlpiPAvHVntLyvrQfo00em9k2NYT");

            const response = await makeAuthPostReq("/client/makeServiceReq", {
                serviceName: serviceName.replace(/([A-Z])/g, ' $1'),
                serviceProvider: selectedServiceProvider,
                fees: selectedServiceProvider.fees + fees,
                documents: docs.map(doc => doc.url), // Send only URLs to backend
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
            {serviceDetails.title ? (
                <div className='container py-5'>
                    {/* Header Section */}
                    <div className='text-center mb-5'>
                        <div className='d-flex justify-content-center align-items-center mb-3'>
                            <div className='bg-danger rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm' style={{ width: '60px', height: '60px' }}>
                                <Icon icon="mdi:gavel" className="text-white" width={30} />
                            </div>
                            <h2 className='fw-bold text-dark mb-0'>{serviceDetails.title}</h2>
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
                            <p className='text-muted'>Please upload relevant documents to support your service request</p>
                        </div>
                        
                        {/* Document Upload Area */}
                        <div className='card border-0 shadow-lg' style={{ borderRadius: '15px' }}>
                            <div className='card-body p-4'>
                                <div className='d-flex align-items-center mb-4'>
                                    <div className='bg-info rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm' style={{ width: '50px', height: '50px' }}>
                                        <Icon icon="mdi:cloud-upload" className="text-white" width={25} />
                                    </div>
                                    <h3 className='fw-bold text-dark mb-0'>Upload Documents</h3>
                                </div>
                                <p className='text-muted mb-4'>Upload relevant documents to support your service request (Maximum 250 KB per file)</p>
                                
                                <div className='text-center p-4 border-2 border-dashed border-secondary rounded' style={{ borderStyle: 'dashed' }}>
                                    <Icon icon="mdi:file-document-multiple" className="text-muted mb-3" width={48} />
                                    <p className='text-muted mb-3'>Upload supporting documents for your service request</p>
                                    <p className='small text-muted mb-3'>Maximum file size: 250 KB per file</p>
                                    <input
                                        type='file'
                                        name='photo'
                                        id='customFile'
                                        onChange={handleFileInputChange}
                                        accept='.jpg, .png, .pdf'
                                        className='form-control'
                                        multiple
                                        disabled={uploading}
                                    />
                                    {uploading && (
                                        <div className='mt-3 text-center'>
                                            <HashLoader size={25} color='#dc3545' />
                                            <p className='text-muted mt-2 mb-0'>Uploading documents...</p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Display uploaded documents */}
                                {docs.length > 0 && (
                                    <div className='mt-4'>
                                        <h6 className='mb-3'>Uploaded Documents ({docs.length})</h6>
                                        <div className='row'>
                                            {docs.map((doc, index) => (
                                                <div key={index} className='col-md-6 col-lg-4 mb-3'>
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
                                                                onClick={() => removeDocument(index)}
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

                    {/* Points to Remember Section */}
                    <div className='card border-0 shadow-lg mb-5' style={{ borderRadius: '15px' }}>
                        <div className='card-body p-4'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='bg-warning rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm' style={{ width: '50px', height: '50px' }}>
                                    <Icon icon="mdi:lightbulb" className="text-white" width={25} />
                                </div>
                                <h3 className='fw-bold text-dark mb-0'>Service Features</h3>
                            </div>
                            <div className='row'>
                                {serviceDetails.points.map((point, index) => (
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
                            disabled={loading || uploading}
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
                            <Icon icon="mdi:gavel-off" className="text-muted" width={50} />
                        </div>
                        <h2 className='fw-bold text-muted mb-3'>Service Details Not Found</h2>
                        <p className='text-muted fs-5'>The requested service could not be found.</p>
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