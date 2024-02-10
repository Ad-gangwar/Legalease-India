import React, { useState } from 'react';
import HelpImage from '../assets/images/help-image.png';
import Layout from './Layout/Layout';
import { faqs } from '../assets/data/faqs';

export default function Help() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleQuestionClick = (index) => {
        setSelectedQuestion(selectedQuestion === index ? null : index);
    };
    return (
        <Layout>
            <section className='my-5'>
                <div className='container'>
                    <div className='d-flex flex-column mb-4 text-center'>
                        <h1 className='mainText iconText display-5'>Seamless Legal Support </h1>
                        <h5 className='iconText my-2 pb-1'>Navigate Our Services with Ease</h5>
                    </div>
                    <div className='row'>
                        <div className='col-md-8 mb-4'>
                        <h4 className='iconText mb-4'>Instructions to use the website: </h4>
                            <ul className='list-unstyled ps-3 my-3'>
                                <li className='text-para my-3'>
                                    1. Browse through the services and select the service category you want.
                                </li>
                                <li className='text-para my-3'>
                                    2. The services list under the selected category will appear. Now select the service to be taken.
                                </li>
                                <li className='text-para my-3'>
                                    3. The information regarding that service will appear. Select the service provider to continue.
                                </li>
                                <li className='text-para my-3'>
                                    4. Read the instructions carefully and provide the needed documents.
                                </li>
                                <li className='text-para my-3'>
                                    5. Click on the servic request button to navigate to the payment page to pay for the service.
                                </li>
                                <li className='text-para my-3'>
                                    6. Enter your card detais and click on pay to pay for the fees.
                                </li>
                                <li className='text-para my-3'>
                                    7. It will take to the success page if the payment was done successfully.
                                </li>
                                <li className='text-para my-3'>
                                    8. Click on the return to homepage button to return back to the homepage.
                                </li>
                            </ul>
                            <p className='text-para my-bold mt-4'>Your service request has been sent to the selected Service Provider. The service provider will review your request and you will be notified when the service provider responds to your request.</p>
                        </div>
                        <div className='col-md-4 text-center'>
                            <img src={HelpImage} style={{ maxWidth: "450px" }} className='img-fluid' alt='Help'></img>
                        </div>
                    </div>
                </div>
            </section>

            {/* ----------------------------Faqs section---------------------- */}
            <section className='sbg pt-1'>
                <div className="mt-4 p-4 pb-0 rounded">
                    <h2 className="text-center iconText mainText display-6 mb-4">Frequently Asked Questions</h2>
                    <div className='row'>
                        <div className="accordion mt-4 col-md-8">
                            {faqs.map((faq, index) => (
                                <div key={index} className="accordion-item" style={{ width: '90%', margin: 'auto' }}>
                                    <h2 className="accordion-header" id={`faqHeading${index}`}>
                                        <button
                                            className={`accordion-button ${selectedQuestion === index ? '' : 'collapsed'}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#faqCollapse${index}`}
                                            aria-expanded={selectedQuestion === index}
                                            aria-controls={`faqCollapse${index}`}
                                            onClick={() => handleQuestionClick(index)}
                                            style={{ backgroundColor: '#f8f9fa', border: 'none' }}
                                        >
                                            {faq.question}
                                        </button>
                                    </h2>
                                    <div
                                        id={`faqCollapse${index}`}
                                        className={`accordion-collapse collapse ${selectedQuestion === index ? 'show' : ''}`}
                                        aria-labelledby={`faqHeading${index}`}
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            {faq.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='col-md-4 d-flex align-items-center justify-content-center'>
                            <img src="https://www.bytestechnolab.com/wp-content/uploads/2022/12/magento-development-service.webp" alt='faqs' className='img-fluid w-100' style={{ maxWidth: "400px" }}></img>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
