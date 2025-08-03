import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import digitalIndia from '../../assets/images/digital-india.png';
import Bell2 from '../../assets/images/bell2.gif';
import { makeAuthGetReq } from '../../utils/serverHelper';


export default function Navbar() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({});
    const [notifications, setNotifications] = useState([]);
    const location = useLocation();

    let navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("legalUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
        setToken(localStorage.getItem("legalToken"));
    }, []);

    // Fetch notifications when user is logged in
    useEffect(() => {
        const fetchNotifications = async () => {
            if (token) {
                try {
                    const response = await makeAuthGetReq("/notification/getAll");
                    if (response.success) {
                        setNotifications(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                }
            }
        };

        fetchNotifications();
    }, [token]);



    // Function to check if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Function to get active class
    const getActiveClass = (path) => {
        return isActive(path) ? 'text-white' : '';
    };

    // Function to get active style
    const getActiveStyle = (path) => {
        return isActive(path) ? { backgroundColor: '#9a1919' } : {};
    };

    return (
        <div className='iconText'>
            <div className='d-flex flex-row justify-content-end container-fluid align-items-center px-3 top-box'>
                <ul className='d-flex m-1 flex-wrap'>
                    <li className='list-unstyled mx-2 '>FAQ</li>
                    <div className='border border-black my-1 mx-4'></div>
                    <li className='list-unstyled mx-2 '>Security Guidelines</li>
                    <div className='border border-black my-1 mx-4 disappear'></div>
                    <li className='list-unstyled mx-2  disappear'>Site map</li>
                    <div className='border border-black my-1 mx-4 disappear'></div>
                    <li className='list-unstyled mx-2  disappear'>English</li>
                </ul>
            </div>
            <div className='d-flex justify-content-around align-items-center px-3 container-fluid py-4' style={{ backgroundColor: "#cef9ffab" }}>
                <div className='disappear'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/4/4f/Ministry_of_Law_and_Justice.png?20220214223421' alt='' width={300} />
                </div>
                <div className='d-flex flex-column justify-content-center align-items-center px-3' style={{ height: '10.5rem' }}>
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
                        <div style={{ backgroundColor: '#9a1919', padding: token ? "8.5px" : "5.5px" }}>
                            <Icon icon='ion:home-sharp' color='white' width={30} className='iconText cursor-pointer h-100' onClick={() => navigate("/")} />
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
                            <div className='d-flex'>
                                <ul className='navbar-nav'>
                                    <li className='nav-item border border-dark border-1 border-top-0'>
                                        {token ? <Link className={`nav-link d-flex align-items-center px-3 ${getActiveClass(user.role === 'client' ? '/clients/profile/me' : '/serviceProviders/profile/me')}`} style={getActiveStyle(user.role === 'client' ? '/clients/profile/me' : '/serviceProviders/profile/me')} aria-current='page' to={user.role === 'client' ? '/clients/profile/me' : '/serviceProviders/profile/me'}>
                                            <span><Icon icon='ic:baseline-account-circle' width={30} className='me-1' /></span> My Account
                                        </Link> : <Link className={`nav-link d-flex align-items-center px-3 ${getActiveClass('/signup')}`} style={getActiveStyle('/signup')} aria-current='page' to='/signup'>
                                            Sign up
                                        </Link>}
                                    </li>
                                    {!token && (<li className='nav-item border border-dark border-1 border-top-0 '>
                                        <Link className={`nav-link d-flex h-100 align-items-center px-3 ${getActiveClass('/login')}`} style={getActiveStyle('/login')} aria-current='page' to='/login'>
                                            Login
                                        </Link>
                                    </li>)}

                                    {token && (<li className='nav-item border border-dark border-1 border-top-0 '>
                                        <Link className={`nav-link d-flex h-100 align-items-center px-2 ${getActiveClass('/notifications')}`} style={getActiveStyle('/notifications')} aria-current='page' to='/notifications'>
                                            {notifications.length > 0 ? (
                                                <img
                                                    src={Bell2}
                                                    style={{ 
                                                        maxWidth: "30px",
                                                        filter: isActive('/notifications') ? 'brightness(0) invert(1)' : 'none'
                                                    }}
                                                    className='h-100'
                                                    alt="Bell"
                                                />
                                            ) : (
                                                <Icon 
                                                    icon="mdi:bell-outline" 
                                                    width={30} 
                                                    color={isActive('/notifications') ? 'white' : 'black'}
                                                    className='h-100'
                                                />
                                            )}
                                            <span className='ps-2'>Notifications</span>
                                        </Link>
                                    </li>)}

                                    <li className='nav-item border border-dark border-1 border-top-0'>
                                        <Link className={`nav-link h-100 d-flex align-items-center px-3 ${getActiveClass('/services')}`} style={getActiveStyle('/services')} aria-current='page' to='/services'>
                                            Services
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0'>
                                        <Link className={`nav-link h-100 d-flex align-items-center px-3 ${getActiveClass('/serviceProviders')}`} style={getActiveStyle('/serviceProviders')} aria-current='page' to='/serviceProviders'>
                                            Service Providers
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0 '>
                                        <Link className={`nav-link h-100 d-flex align-items-center px-3 ${getActiveClass('/about')}`} style={getActiveStyle('/about')} aria-current='page' to='/about'>
                                            About Us
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0 '>
                                        <Link className={`nav-link h-100 d-flex align-items-center px-3 ${getActiveClass('/contact')}`} style={getActiveStyle('/contact')} to='/contact'>
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li className='nav-item border border-dark border-1 border-top-0 '>
                                        <Link className={`nav-link h-100 d-flex align-items-center px-3 ${getActiveClass('/help')}`} style={getActiveStyle('/help')} to='/help'>
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

