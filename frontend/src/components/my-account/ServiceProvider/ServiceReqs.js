import React, { useState } from 'react';
import UserFetchData from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import formatDate from '../../../utils/formatDate';
import { Link } from 'react-router-dom';

export default function MyServiceReqs() {
    const { data: serviceReqs, loading, error } = UserFetchData('/serviceProvider/ServiceReqs/my-ServiceReqs');
    const [selectedService, setSelectedService] = useState(null);

    const openModal = async (service) => {
        await setSelectedService(service);
    };

    const closeModal = () => {
        setSelectedService(null);
    };
    return (
        <div>
            {loading && (
                <Loading />
            )}

            {!loading && error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="table-responsive">
                    <table className='w-100 text-align-left'>
                        <thead className='bg-secondary bg-opacity-10'>
                            <tr>
                                <th scope='col' className='p-3 iconText'>NAME</th>
                                <th scope='col' className='p-3 iconText'>SERVICE</th>
                                <th scope='col' className='p-3 iconText'>PAYMENT</th>
                                <th scope='col' className='p-3 iconText'>PRICE</th>
                                <th scope='col' className='p-3 iconText'>BOOKED ON</th>
                            </tr>
                        </thead>

                        <tbody>
                            {serviceReqs.map((service, index) => (
                                <tr key={index} className='cursor-pointer' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => openModal(service)}>
                                    <th scope='row' className='d-flex align-items-center my-4'>
                                        <img src={service.client.photo} className='rounded-circle' style={{ maxWidth: "50px" }} alt={service.client.name}></img>
                                        <div className='ps-3'>
                                            <div className='iconText'>{service.client.name}</div>
                                            <small className='fw-normal'>{service.client.email}</small>
                                        </div>
                                    </th>
                                    <td className='p-3 my-bold'>{service.serviceName}</td>
                                    <td className='p-3'>
                                        <div className='d-flex align-items-center gap-2'>
                                            <div className={`rounded-circle ${service.isPaid ? 'bg-success' : 'bg-danger'}`} style={{ width: "10px", height: "10px" }}></div>
                                            {service.isPaid ? 'Paid' : 'Pending'}
                                        </div>
                                    </td>
                                    <td className='p-3'>{service.fees}</td>
                                    <td className='p-3'>{formatDate(service.serviceDate)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}



            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    {selectedService && <div className="modal-content">
                        <div className="modal-header">
                            <h5 className='modal-title' id="exampleModalLabel">{selectedService.serviceName}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6 className='mb-3'>Service Request Date: <span className='my-bold text-success fw-bold'>{formatDate(selectedService.serviceDate)}</span></h6>
                            <div className='mb-3'>
                                <h6 className='mb-2'>Provided Documents:</h6>
                                <div className='row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 mb-3'>
                                    {selectedService.documents.map((doc, index) => (
                                        <figure key={index} className='col mb-2'>
                                            <Link to={doc} target='_blank'><img src={doc} alt={`Document ${index}`} className="img-fluid" /></Link>
                                        </figure>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h6 className='text-success text-para'>Requested by:</h6>
                                <h5 className='mb-1 text-danger iconText'>{selectedService.client.name}</h5>
                                <p>Email: <span className='my-bold'>{selectedService.client.email}</span></p>
                                <p>Address: <span className='my-bold'>{selectedService.client.address}</span></p>
                            </div>
                            <div className='mb-3 d-flex justify-content-between align-items-center bg-light border border-danger rounded p-2'>
                                <div className={selectedService.isPaid ? 'text-success my-bold' : 'text-warning my-bold'}>
                                    {selectedService.isPaid ? 'Paid' : 'Payment Pending'}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Approve</button>
                        </div>
                    </div>}
                </div>
            </div>

            {/* {!loading && !error && (
                <div className="row row-cols-1 row-cols-lg-2 g-4">
                    {serviceReqs.map((service, index) => (
                        <div className='px-3'>
                            <div key={index} className={`col mb-4 p-3 border border-2 rounded pulse ${service.status === 'pending' ? 'border-danger' : 'border-success'}`}>
                                <h5 className='mb-3 mybg p-2 text-white px-3 rounded-end'>{service.serviceName}</h5>
                                <h6 className='mb-3'>Service Request Date: <span className='my-bold text-success fw-bold'>{formatDate(service.serviceDate)}</span></h6>
                                <div className='mb-3'>
                                    <h6 className='mb-2'>My Documents:</h6>
                                    <div className='row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 mb-3'>
                                        {service.documents.map((doc, index) => (
                                            <figure key={index} className='col mb-2'>
                                                <Link to={doc} target='_blank'><img src={doc} alt={`Document ${index}`} className="img-fluid" /></Link>
                                            </figure>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h6 className='text-success text-para'>Requested by:</h6>
                                    <h5 className='mb-1 text-danger iconText'>{service.client.name}</h5>
                                    <p>Email: <span className='my-bold'>{service.client.email}</span></p>
                                    <p>Address: <span className='my-bold'>{service.client.address}</span></p>
                                </div>
                                <div className='mb-3 d-flex justify-content-between align-items-center bg-light border border-danger rounded p-2'>
                                    <div className={service.isPaid ? 'text-success my-bold' : 'text-warning my-bold'}>
                                        {service.isPaid ? 'Paid' : 'Payment Pending'}
                                    </div>
                                    {<button className='btn btn-success'>Approve</button>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )} */}

            {!loading && !error && serviceReqs.length === 0 && (
                <h2 className="mt-5 text-center text-danger">
                    You did not have any service request yet!
                </h2>
            )}
        </div>
    );
}
