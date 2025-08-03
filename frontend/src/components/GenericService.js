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
                <div className='container'>
                    <section className='my-5 mb-3'>
                        <div className='d-flex gap-3 align-items-center mb-4'>
                            <span><h4>Select a Service Provider to continue: </h4></span>
                            <button className='btn btn-danger rounded-pill my-3 p-3 my-bold' onClick={() => navigate('/serviceProviders')}>
                                {loading ? <HashLoader size={35} color='white' /> : 'Select Service Provider'}
                            </button>
                            {selectedServiceProvider && <h5 className='my-bold'>{selectedServiceProvider.name}</h5>}
                        </div>
                        <h2 className='text-center iconText myText'>{serviceDetails.title}</h2>
                        <p className='text-center mb-4'>{serviceDetails.description}</p>
                        
                        <div className='w-100 mx-auto'>
                            <div className='p-4'>
                                <div className='w-100 h-100 p-4 px-5 shadow-lg'>
                                    <span className='d-inline-flex p-2 rounded-end mb-2 my-bold' style={{ color: "#7c5300", backgroundColor: "#eadad973" }}>
                                        Service Requirements
                                    </span>
                                    <ul>
                                        {serviceDetails.requirements.map((requirement, index) => (
                                            <li className='my-1' key={index}>{requirement}</li>
                                        ))}
                                    </ul>
                                    <div>
                                        <span>Upload relevant documents (less than 250 KB each)</span>
                                        <div className='mt-3'>
                                            <input
                                                type='file'
                                                name='photo'
                                                id='customFile'
                                                onChange={handleFileInputChange}
                                                accept='.jpg, .png, .pdf'
                                                className='cursor-pointer h-100 w-100'
                                                multiple
                                                disabled={uploading}
                                            />
                                            {uploading && (
                                                <div className='mt-2 text-center'>
                                                    <HashLoader size={20} color='#dc3545' />
                                                    <span className='ms-2'>Uploading...</span>
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
                        </div>
                    </section>

                    <section>
                        <h2 className='iconText myText my-4'>Service Features</h2>
                        <ul>
                            {serviceDetails.points.map((point, index) => (
                                <li key={index} className='my-3'>{point}</li>
                            ))}
                        </ul>
                    </section>
                    
                    <p className='my-4'><span className='my-bold'>Note: </span>This is test payment gateway of Stripe. Use <span className='iconText'>4000003560000008</span> as the card number to successfully complete the payment. Remember to copy it before proceeding to payment page.</p>
                    <button 
                        className='btn btn-danger rounded-pill mx-auto d-block mt-4 mb-5 p-3 fs-5 my-bold px-5' 
                        onClick={handleSubmit}
                        disabled={loading || uploading}
                    >
                        {loading ? <HashLoader size={25} color='white' /> : 'Request Service'}
                    </button>
                </div>
            ) : (
                <div className='text-center my-5 h2 py-4'>😒 Service Details not found!</div>
            )}
        </Layout>
    )
} 