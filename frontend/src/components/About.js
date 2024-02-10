import React from 'react';
import Layout from './Layout/Layout';
import lawyerImg01 from '../assets/images/lawyer-01.jpg';
import lawyerImg02 from '../assets/images/lawyer-02.jpg';
import lawyerImg04 from '../assets/images/lawyer-04.jpg';

export default function About() {
    return (
        <Layout>
            <div className='mx-auto my-5 container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-12 mt-3'>
                        <h2 className='fw-bold break-word word-wrap'>Welcome to <span className='fs-1 mainText'>Legal-Ease India</span></h2>
                        <p className='text-para my-3'>
                            At Legal-Ease India, we are on a mission to revolutionize the way legal services are accessed and delivered. We understand that legal matters are an integral part of our lives, and the traditional methods of seeking legal assistance can often be time-consuming and challenging.
                        </p>
                        <h2 className='fw-bold break-word word-wrap mt-4'> Our Vision</h2>
                        <p className='text-para my-1'>
                            Our vision is to create a seamless platform where individuals and businesses can connect with experienced legal service providers, including notaries and lawyers, from the comfort of their homes. We aim to simplify the legal process, making it more accessible, efficient, and affordable for everyone.
                        </p>
                        <p className='text-para my-1'>
                            Additionally, we envision a future where technology plays a significant role in enhancing legal services, from document preparation to dispute resolution, ultimately empowering individuals to make informed legal decisions.
                        </p>
                        <h2 className='fw-bold break-word word-wrap mt-4'>Our Commitment to Excellence</h2>
                        <p className='text-para my-3'>
                            At Legal-Ease India, we are committed to delivering exceptional service to our clients. We prioritize transparency, integrity, and responsiveness in all our interactions, ensuring that our clients receive the support and guidance they need throughout their legal journey.
                        </p>
                    </div>
                    <div className='col-lg-6 col-md-12 mx-auto my-3 d-flex align-items-center'>
                        <div className="row w-100 mx-auto">
                            <div className="col-6 row-6 mb-4">
                                <img src={lawyerImg04} alt='' className='w-100 h-100 rounded' />
                            </div>
                            <div className="col">
                                <div><img src={lawyerImg02} alt='' className='w-75 m-4 mx-0 rounded' /></div>
                                <div><img src={lawyerImg01} alt='' className='w-75 rounded' /></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Additional Section: Testimonials */}
                <div className="row my-5">
                    <div className="col">
                        <h2 className="fw-bold mb-4 text-center myText">Client Testimonials</h2>
                        <div className="testimonial">
                            <p>"Legal-Ease India made the legal process so simple and hassle-free for me. I highly recommend their services!"</p>
                            <p className="iconText">- Aditya Gangwar</p>
                        </div>
                        <div className="testimonial">
                            <p>"I was impressed by the professionalism and expertise of the lawyers at Legal-Ease India. They helped me navigate through a complex legal issue with ease."</p>
                            <p className="iconText">- Raunak Agarwal</p>
                        </div>
                        <div className="testimonial">
                            <p>"As a small business owner, I rely on Legal-Ease India for all my legal needs. They provide personalized attention and valuable insights that have helped me protect my business interests."</p>
                            <p className="fw-bold">- Rinku Sisodiya</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
