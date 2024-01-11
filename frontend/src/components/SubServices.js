import React from 'react'
import Layout from './Layout/Layout';
import { BsArrowRight } from 'react-icons/bs';
import { documentServices } from '../assets/data/subServices';
import { Link } from 'react-router-dom';

export default function SubServices() {
    return (
        <Layout>
            <section style={{ backgroundColor: "#fff9ea" }} className='py-5'>
                <div className="container text-center">
                    <h2 className='iconText'>Search Service</h2>
                    <div className="mx-auto mt-4 py-3 d-flex" style={{ maxWidth: "570px" }}>
                        <input
                            type="search"
                            className="py-3 px-3 w-100 border-0 cursor-pointer rounded-start shadow-lg"
                            placeholder="Search Service"
                        />
                        <button className="btn mt-0 rounded-0 rounded-end btn-danger shadow-lg">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            <div className="container-md mt-5">
                <div className="row">
                    {documentServices.map((item, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-5" key={index}>
                            <div className="p-4 shadow  d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                                <h3 className="mb-3 my-bold">{item.name}</h3>
                                {/* <p className="mb-4">{item.description}</p> */}
                                <div className="d-flex justify-content-between">
                                    <Link to={"/DocumentServices/" + item.name.replace(/\s+/g, '')} className="btn btn-outline-danger rounded-circle h-100 d-flex align-items-center">
                                        <BsArrowRight className='arrow mx-0' />
                                    </Link>
                                    <span className="px-3 d-flex align-items-center rounded-start text-white my-bold mybg">{index + 1}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
