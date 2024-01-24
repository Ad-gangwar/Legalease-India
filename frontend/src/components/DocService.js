import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import Documents from '../assets/data/Documents';
import CloudinaryUpload from '../utils/Cloudinary_Upload';
import { makeAuthPostReq } from '../utils/serverHelper';
import { useCookies } from 'react-cookie';
import lawyerContext from './context/LawyerContext';
import formatDate from '../utils/formatDate';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';

export default function DocumentService() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [docs, setDocs] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentPoints, setSelectedDocumentPoints] = useState([]);
    const [cookie, setCookie] = useCookies(["docName"]);
    setCookie("docName", name, { path: "/" });
    const { selectedLawyer, setSelectedLawyer } = useContext(lawyerContext);
    const date = new Date();
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        const document = Documents[name];
        setSelectedDocument(document);
        const docPoints = Documents[name + "Points"];
        setSelectedDocumentPoints(docPoints);
    };

    useEffect(() => {
        fetchData();
    }, []); // Add an empty dependency array to run this effect only once after the initial render

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const data = await CloudinaryUpload(file);
        setDocs((prevDocs) => [...prevDocs, data.url]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // console.log(docs);
            const response = await makeAuthPostReq("/user/makeServiceReq", {
                serviceName: name,
                lawyer: selectedLawyer.id,
                fees: selectedLawyer.fees ? selectedLawyer.fees : "500",
                documents: docs,
                serviceDate: formatDate(date),
            });

            if (response.success) {
                // You can redirect to a success page or perform any other actions
                toast.success("Service request successful!");
            } else {
                toast.error("Service request failed:", response.message);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error submitting service request:", error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            {selectedDocument ? (<div className='container'>
                {/* ---------------------needed document section----------------------------- */}
                <section className='my-5 mb-3'>
                    <div className='d-flex gap-3 align-items-center mb-4'>
                        <span><h4>Select a Lawyer to continue: </h4></span>
                        <button className='btn btn-danger rounded-pill my-3 p-3 my-bold' onClick={() => navigate('/lawyers')}>
                            {loading ? <HashLoader size={35} color='white' /> : 'Select Lawyer'}
                        </button>
                        {selectedLawyer && <h5 className='my-bold'>{selectedLawyer.name}</h5>}
                    </div>
                    <h2 className='text-center iconText myText'>Needed Documents</h2>
                    <div className='w-100 mx-auto row row-cols-lg-2 row-cols-md-1'>
                        {selectedDocument.map((item, index) => (
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
                        {selectedDocumentPoints.map((point, index) => (
                            <li key={index} className='my-3'>{point}</li>
                        ))}
                    </ul>
                </section>
                <button className='btn btn-danger rounded-pill mx-auto d-block mt-4 mb-5 p-3 fs-5 my-bold px-5' onClick={handleSubmit}>Request Service</button>
            </div>) : <div>Document Details not found!</div>}
        </Layout>
    )
}
