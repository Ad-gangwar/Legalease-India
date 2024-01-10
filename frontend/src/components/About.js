import React from 'react'
import Layout from './Layout/Layout'
import lawyerImg01 from '../assets/images/lawyer-01.jpg'
import lawyerImg02 from '../assets/images/lawyer-02.jpg'
import lawyerImg04 from '../assets/images/lawyer-04.jpg'
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
                    </div>
                    <div className='col-lg-6 col-md-12 mx-auto mt-3'>
                            <div className="row w-100 mx-auto">
                                <div className="col-6 row-6  mb-4">
                                    <img src={lawyerImg04} alt='' className='w-100 h-100 rounded' />
                                </div>
                                <div className="col">
                                    <div><img src={lawyerImg02} alt='' className='w-75 m-4 mx-0 rounded' /></div>
                                    <div><img src={lawyerImg01} alt='' className='w-75 rounded' /></div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
