import React, { useState } from 'react';
import HelpImage from '../assets/images/help-image.png';
import Layout from './Layout/Layout';
import { Icon } from '@iconify/react';
import FAQs from './shared/FAQs';

export default function Help() {

    const steps = [
        {
            icon: "mdi:search-web",
            title: "Browse Services",
            description: "Explore our comprehensive range of legal services and select the category that meets your needs."
        },
        {
            icon: "mdi:format-list-bulleted",
            title: "Choose Service",
            description: "Review the available services under your selected category and pick the specific service you require."
        },
        {
            icon: "mdi:account-tie",
            title: "Select Provider",
            description: "Choose from our network of qualified legal service providers based on their expertise and ratings."
        },
        {
            icon: "mdi:file-document-multiple",
            title: "Upload Documents",
            description: "Carefully read the requirements and upload the necessary documents for your service request."
        },
        {
            icon: "mdi:credit-card",
            title: "Make Payment",
            description: "Complete the payment process using our secure payment gateway with your preferred method."
        },
        {
            icon: "mdi:check-circle",
            title: "Get Confirmation",
            description: "Receive confirmation of your successful payment and service request submission."
        },
        {
            icon: "mdi:home",
            title: "Return Home",
            description: "Navigate back to the homepage to track your service request or explore other services."
        },
        {
            icon: "mdi:bell-ring",
            title: "Stay Updated",
            description: "Receive notifications when your service provider responds to your request."
        }
    ];

    return (
        <Layout>
            {/* Hero Section */}
            <section className='py-5' style={{ backgroundColor: '#fff9ea' }}>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-lg-6'>
                            <div className='text-center text-lg-start'>
                                <h1 className='display-4 fw-bold text-danger mb-3'>
                                    Need Help?
                                </h1>
                                <h2 className='h3 text-dark mb-4'>
                                    We're here to guide you through every step of your legal journey
                                </h2>
                                <p className='lead text-muted mb-4'>
                                    Get comprehensive support and answers to all your questions about our legal services platform.
                                </p>
                                <div className='d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start'>
                                    <div className='d-flex align-items-center bg-white p-3 rounded shadow-sm'>
                                        <Icon icon="mdi:clock-outline" className='text-primary me-2' width={24} />
                                        <span className='fw-bold'>24/7 Support</span>
                                    </div>
                                    <div className='d-flex align-items-center bg-white p-3 rounded shadow-sm'>
                                        <Icon icon="mdi:shield-check" className='text-success me-2' width={24} />
                                        <span className='fw-bold'>Secure Platform</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 text-center'>
                            <div className='help-image-container position-relative'>
                                {/* Main image with enhanced styling */}
                                <div className='image-wrapper position-relative'>
                                    <img 
                                        src={HelpImage} 
                                        alt='Legal Help & Support' 
                                        className='img-fluid rounded-lg shadow-lg p-4 pb-0 bg-white'
                                        style={{ 
                                            maxWidth: '450px',
                                            border: '3px solid #dc3545',
                                            borderRadius: '15px'
                                        }}
                                    />
                                    
                                    {/* Overlay with help icon */}
                                    <div className='position-absolute top-0 start-0 m-3'>
                                        <div className='help-badge d-flex align-items-center justify-content-center'
                                             style={{ 
                                                 width: '50px', 
                                                 height: '50px', 
                                                 backgroundColor: '#dc3545',
                                                 borderRadius: '50%',
                                                 boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
                                             }}>
                                            <Icon icon="mdi:help-circle" className='text-white' width={24} />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Support features below image */}
                                <div className='support-features mt-4'>
                                    <div className='row g-3 justify-content-center'>
                                        <div className='col-auto'>
                                            <div className='d-flex align-items-center bg-white p-2 rounded shadow-sm'>
                                                <Icon icon="mdi:clock-outline" className='text-primary me-2' width={18} />
                                                <small className='fw-bold'>24/7 Support</small>
                                            </div>
                                        </div>
                                        <div className='col-auto'>
                                            <div className='d-flex align-items-center bg-white p-2 rounded shadow-sm'>
                                                <Icon icon="mdi:shield-check" className='text-success me-2' width={18} />
                                                <small className='fw-bold'>Secure</small>
                                            </div>
                                        </div>
                                        <div className='col-auto'>
                                            <div className='d-flex align-items-center bg-white p-2 rounded shadow-sm'>
                                                <Icon icon="mdi:account-group" className='text-info me-2' width={18} />
                                                <small className='fw-bold'>Expert Team</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className='py-5'>
                <div className='container'>
                    <div className='text-center mb-5'>
                        <h2 className='iconText myText display-5 mb-3'>How It Works?</h2>
                        <p className='text-para'>Follow these simple steps to get started with our legal services</p>
                    </div>
                    
                    <div className='timeline-container'>
                        <div className='row'>
                            {steps.map((step, index) => (
                                <div key={index} className='col-lg-6 col-md-12 mb-4'>
                                    <div className='timeline-item d-flex align-items-center'>
                                        {/* Timeline line for desktop */}
                                        <div className='timeline-line d-none d-lg-block position-relative me-4'>
                                            <div className='timeline-dot d-flex align-items-center justify-content-center'
                                                 style={{ 
                                                     width: '60px', 
                                                     height: '60px', 
                                                     backgroundColor: '#dc3545',
                                                     borderRadius: '50%',
                                                     boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
                                                 }}>
                                                <Icon icon={step.icon} className='text-white' width={28} />
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className='timeline-connector position-absolute'
                                                     style={{
                                                         top: '60px',
                                                         left: '50%',
                                                         width: '2px',
                                                         height: '60px',
                                                         backgroundColor: '#dc3545',
                                                         transform: 'translateX(-50%)'
                                                     }}>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Mobile timeline dot */}
                                        <div className='timeline-dot-mobile d-lg-none me-3'>
                                            <div className='d-flex align-items-center justify-content-center'
                                                 style={{ 
                                                     width: '50px', 
                                                     height: '50px', 
                                                     backgroundColor: '#dc3545',
                                                     borderRadius: '50%',
                                                     boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
                                                 }}>
                                                <Icon icon={step.icon} className='text-white' width={24} />
                                            </div>
                                        </div>
                                        
                                        {/* Content */}
                                        <div className='timeline-content flex-grow-1'>
                                            <div className='card border-0 shadow-sm bg-white rounded p-4'>
                                                <div className='d-flex align-items-center mb-3'>
                                                    <div className='step-number me-3 d-flex align-items-center justify-content-center'
                                                         style={{ 
                                                             width: '35px', 
                                                             height: '35px', 
                                                             backgroundColor: '#fff9ea',
                                                             borderRadius: '50%',
                                                             border: '2px solid #dc3545',
                                                             fontSize: '14px',
                                                             fontWeight: 'bold',
                                                             color: '#dc3545'
                                                         }}>
                                                        {index + 1}
                                                    </div>
                                                    <h5 className='card-title fw-bold mb-0 myText'>{step.title}</h5>
                                                </div>
                                                <p className='card-text text-para mb-0'>{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Mobile timeline connector */}
                        <div className='d-lg-none text-center mt-3'>
                            <div className='d-flex justify-content-center align-items-center'>
                                {steps.map((_, index) => (
                                    <div key={index} className='d-flex align-items-center'>
                                        <div className='bg-danger rounded-circle' style={{ width: '8px', height: '8px' }}></div>
                                        {index < steps.length - 1 && (
                                            <div className='bg-danger mx-2' style={{ width: '30px', height: '2px', opacity: '0.3' }}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQs />

            <style jsx>{`
                .step-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
                }
                
                .step-card:hover .icon-container {
                    transform: scale(1.05);
                }
                
                .step-card {
                    cursor: pointer;
                }
                
                .icon-container {
                    transition: transform 0.3s ease;
                }
            `}</style>
        </Layout>
    );
}
