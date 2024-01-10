import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import digitalIndia from '../../assets/images/digital-india.png';

export default function Navbar() {
    let navigate = useNavigate();
    return (
        <div className='iconText'>
            <div className='d-flex flex-row justify-content-end container-fluid align-items-center p-1 top-box'>
                <ul className='d-flex m-2 flex-wrap'>
                    <li className='list-unstyled mx-2 p-1'>FAQ</li>
                    <div className='border border-black my-2 mx-4'></div>
                    <li className='list-unstyled mx-2 p-1'>Security Guidelines</li>
                    <div className='border border-black my-2 mx-4 disappear'></div>
                    <li className='list-unstyled mx-2 p-1 disappear'>Site map</li>
                    <div className='border border-black my-2 mx-4 disappear'></div>
                    <li className='list-unstyled mx-2 p-1 disappear'>English</li>
                </ul>
            </div>
            <div className='d-flex justify-content-around align-items-center container-fluid'>
                <div className='disappear'>
                    <img src='https://desikaanoon.in/wp-content/uploads/2023/08/jdsbhcxjabgdca.jpg' alt='' width={300} />
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '10.5rem' }}>
                    <div className='fw-bold display-3 mainText fst-italic text-center'>LEGAL-EASE INDIA</div>
                    <div className='text-center'>Centralised platform for service providers and notaries</div>
                </div>
                <div className='disappear'>
                    <img src={digitalIndia} alt='' width={300} />
                </div>
            </div>
            <div className='sticky-top border-bottom border-3 border-dark'>
                <nav className='navbar navbar-expand-lg navbar-light p-0' style={{ backgroundColor: '#EADAD9' }}>
                    <div className='container-fluid p-0'>
                    <div className='p-2' style={{ backgroundColor: '#9a1919' }}>
                            <Icon icon='ion:home-sharp' color='white' width={30} className='iconText cursor-pointer' onClick={() => navigate("/")} />
                        </div>
                        <button
                            className='navbar-toggler ms-auto'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarNav'
                            aria-controls='navbarNav'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse' id='navbarNav'>
                            <div className='d-flex flex-grow-1'>
                                <ul className='navbar-nav'>
                                    <li className='nav-item border border-dark border-1 border-top-0 p-1'>
                                        <Link className='nav-link hoverBox' aria-current='page' to='/signup'>
                                            Sign up
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0 p-1'>
                                        <Link className='nav-link hoverBox' aria-current='page' to='/login'>
                                            Login
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0 p-1'>
                                        <Link className='nav-link hoverBox' aria-current='page' to='/services'>
                                            Services
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0 p-1'>
                                        <Link className='nav-link hoverBox' aria-current='page' to='/about'>
                                            About Us
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0 p-1'>
                                        <Link className='nav-link hoverBox' to='/contact'>
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0 p-1'>
                                        <Link className='nav-link hoverBox' to='#'>
                                            Help
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

