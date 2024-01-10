import React from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Footer() {
    return (
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 px-3" style={{ backgroundColor: "#9a1919" }}>
            <p className="col-md-4 mb-0 text-white">© 2023 Company, Inc, All Rights Reserved</p>

            <Link to="/" className="col-md-4 d-flex align-items-center justify-content-center my-2 mb-md-0 me-md-auto link-dark text-decoration-none mx-auto">
                <div className='border border-3 p-2 rounded-circle'><Icon icon="octicon:law-16" color='white' width={30}/></div>
            </Link>

            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-white">Home</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-white">Features</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-white">Pricing</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-white">FAQs</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-white">About</Link></li>
            </ul>
        </footer>
    )
}
