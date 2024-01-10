import React from 'react'
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';


export default function ServiceCard({ item, index }) {
    return (
        <div className="p-4 shadow  d-flex flex-column justify-content-between" style={{ height: "100%" }}>
            <h3 className="mb-4 my-bold">{item.name}</h3>
            <p className="mb-4">{item.description}</p>
            <div className="d-flex justify-content-between">
                <Link to="/subServices" className="btn btn-outline-danger rounded-circle h-100 d-flex align-items-center">
                    <BsArrowRight className='arrow mx-0' />
                </Link>
                <span className="px-3 py-1 rounded-start text-white my-bold mybg fs-4">{index + 1}</span>
            </div>
        </div>
    )
}
