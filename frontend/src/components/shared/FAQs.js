import React, { useState } from 'react';
import { faqs } from '../../assets/data/faqs';

export default function FAQs() {
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const handleQuestionClick = (index) => {
        setSelectedQuestion(selectedQuestion === index ? null : index);
    };

    return (
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
    );
} 