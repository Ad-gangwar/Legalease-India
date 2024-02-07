import React from 'react';
import { Link } from 'react-router-dom';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillGithub, AiOutlineInstagram } from 'react-icons/ai';
import { Icon } from '@iconify/react';

const socialLinks = [
    {
        path: "https://github.com/Ad-gangwar",
        icon: <AiFillGithub className='fs-4' />
    },
    {
        path: "https://www.instagram.com/aditya._gangwar/",
        icon: <AiOutlineInstagram className='fs-4' />
    },
    {
        path: "https://www.linkedin.com/in/aditya-gangwar-3aa3aa257/",
        icon: <RiLinkedinFill className='fs-4' />
    },
];

const quickLinks01 = [
    {
        path: "/",
        display: "Home"
    },
    {
        path: "/about",
        display: "About Us"
    },
    {
        path: "/services",
        display: "Services"
    },
    {
        path: "/help",
        display: "Help"
    }
];

const quickLinks02 = [
    {
        path: "/serviceProviders",
        display: "Find a Service Provider"
    },
    {
        path: "/services",
        display: "Browse Provided Services"
    },
    {
        path: "/",
        display: "Know recent News and Updates"
    },
    {
        path: "/serviceProviders",
        display: "Get an opinion"
    }
];

const quickLinks03 = [
    {
        path: "/",
        display: "Donate"
    },
    {
        path: "/contact",
        display: "Contact Us"
    }
];

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className='py-4 mybg'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 d-flex flex-column justify-content-center my-2'>
                        <Link to="/" className="d-flex align-items-center mb-3 text-decoration-none gap-3">
                            <div className='border border-3 p-2 rounded-circle'>
                                <Icon icon="octicon:law-16" color='white' width={30} />
                            </div>
                            <span className='text-white h3 iconText'>Legal-Ease India</span>
                        </Link>
                        <p className='text-white'>
                            Copyright © {year} Developed by <span className='my-bold'>Aditya Gangwar</span>
                        </p>
                        <p className='text-white mt-1'>All rights reserved.</p>
                        <div className='d-flex gap-3 my-3'>
                            {socialLinks.map((link, index) => (
                                <Link
                                    to={link.path}
                                    key={index}
                                    className='text-white p-2 border border-solid rounded-circle d-flex align-items-center justify-content-center'
                                >
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='col-md-3 my-2 col-sm-4'>
                        <h5 className='text-white iconText mb-3'>I want to:</h5>
                        <ul className='list-unstyled'>
                            {quickLinks02.map((item, index) => (
                                <li key={index} className='mb-3 list-style-none'>
                                    <Link
                                        to={item.path}
                                        className='text-white text-decoration-none'
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                   
                    <div className='col-md-2 my-2 col-sm-4'>
                        <h5 className='text-white iconText mb-3'>Quick Links</h5>
                        <ul className='list-unstyled'>
                            {quickLinks01.map((item, index) => (
                                <li key={index} className='mb-3'>
                                    <Link
                                        to={item.path}
                                        className='text-white text-decoration-none'
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='col-md-1 my-2 col-sm-4'>
                        <h5 className='text-white iconText mb-3'>Support</h5>
                        <ul className='list-unstyled'>
                            {quickLinks03.map((item, index) => (
                                <li key={index} className='mb-3'>
                                    <Link
                                        to={item.path}
                                        className='text-white text-decoration-none'
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}