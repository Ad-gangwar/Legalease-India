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

export default function DocumentService() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [docs, setDocs] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [selectedDocumentPoints, setSelectedDocumentPoints] = useState([]);
    const [cookie, setCookie] = useCookies(["docName"]);
    setCookie("docName", name, { path: "/" });
    const { selectedServiceProvider, setSelectedServiceProvider } = useContext(serviceProviderContext);
    const date = new Date();
    const [loading, setLoading] = useState(false);
    const maxSizeInBytes = 250 * 1024;

    const fetchData = () => {
        const document = Documents[name];
        setSelectedDocument(document);
        const docPoints = Documents[name + "Points"];
        setSelectedDocumentPoints(docPoints);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];

        // Check if a file is selected
        if (file) {
            // Check if the selected file exceeds the max size
            if (file.size > maxSizeInBytes) {
                toast.error('File size exceeds the maximum allowed size (250 KB). Please choose a smaller file.');
                // Optionally, you can reset the input value to clear the selected file
                e.target.value = null;
            } else {
                // File is within the allowed size limit, proceed with Cloudinary upload
                try {
                    const data = await CloudinaryUpload(file);
                    setDocs((prevDocs) => [...prevDocs, data.url]);
                } catch (error) {
                    console.error('Error uploading file to Cloudinary:', error);
                    // Handle the error, e.g., display an alert to the user
                }
            }
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            console.log(name.replace(/[^A-Za-z0-9]/g, ' '));
            // console.log(docs);
            const response = await makeAuthPostReq("/client/makeServiceReq", {
                serviceName: name.replace(/[^A-Za-z0-9]/g, ' '),
                serviceProvider: selectedServiceProvider._id,
                fees: selectedServiceProvider.fees ? selectedServiceProvider.fees : "500",
                documents: docs,
                serviceDate: formatDate(date),
            });

            if (response.success) {
                // You can redirect to a success page or perform any other actions
                toast.success("Service request successful!");
            } else {
                toast.error(response.message);
            }
            setLoading(false);
        } catch (error) {
            toast.error("You are not authorized😒 Try logging In.");
            console.log(error);
            setLoading(false);
        }
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
                                        <span>Provide any of the above document of less than 250 KB size</span>
                                        <div className='mt-3'>
                                            <input
                                                type='file'
                                                name='photo'
                                                id='customFile'
                                                onChange={handleFileInputChange}
                                                accept='.jpg, .png, .pdf'
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
