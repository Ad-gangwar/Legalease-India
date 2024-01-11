import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { PANCard } from '../assets/data/Documents'
import { PANCardPoints } from '../assets/data/Documents';

export default function DocumentService() {
    const navigate = useNavigate();
    const handleFileInputChange = () => {

    }
    const handleSubmit = () => {

    }

    return (
        <Layout>
            <div className='container'>
                {/* ---------------------needed document section----------------------------- */}
                <section className='my-5 mb-3'>
                    <h2 className='text-center iconText myText'>Needed Documents</h2>
                    <div className='w-100 mx-auto row row-cols-lg-2 row-cols-md-1'>
                        {PANCard.map((item, index) => (
                            <div className='p-4' key={index}>
                                <div className='w-100 h-100 p-4 px-5 shadow-lg d-flex flex-column justify-content-between'>
                                    <span className='d-inline-flex p-2 rounded-end mb-2 my-bold' style={{ color: "#7c5300", backgroundColor: "#eadad973" }}>
                                        {item.category}
                                    </span>
                                    <ul>
                                        {item.documents.map((document, index) => (
                                            <li className='my-1' key={index}>{document.name}</li>
                                        ))}
                                    </ul>
                                    <div>
                                        <span>Provide any of the above document</span>
                                        <div className='mt-3'>
                                            <input
                                                type='file'
                                                name='photo'
                                                id='customFile'
                                                onChange={handleFileInputChange}
                                                accept='.jpg, .png'
                                                className='cursor-pointer h-100 w-100'
                                            />
                                        </div>
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
                        {PANCardPoints.map((point, index) => (
                            <li key={index} className='my-3'>{point}</li>
                        ))}
                    </ul>
                </section>
                <button className='btn btn-danger rounded-pill my-3 p-3 my-bold' onClick={() => navigate('/lawyers')}>Select Lawyer</button>
                <button className='btn btn-danger rounded-pill mx-auto d-block mt-4 mb-5 p-3 fs-5 my-bold px-5' onClick={handleSubmit}>Request Service</button>
            </div>
        </Layout>
    )
}
