import React, { useState } from 'react';
import Input from './shared/Input';
import { Link } from 'react-router-dom';
import Layout from './Layout/Layout';
import signupImg from '../assets/images/signup-img.gif';
import avatar from '../assets/images/avatar-icon.png';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient');
    const [gender, setGender] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    const handleFileInputChange = (e) => {
        // Handle file input change logic here
    };
    return (
        <Layout>
            <section className='px-5 my-5 signup-div'>
                <div style={{ maxWidth: "1170px" }} className='mx-auto w-100'>
                    <div className='row'>
                        {/* Login image */}
                        <div className='col-lg-6  rounded signup-img'>
                            <figure>
                                <img src={signupImg} alt='' className='w-100 rounded' ></img>
                            </figure>
                        </div>

                        {/* Signup form */}
                        <div className='col-lg-6 rounded px-5 signup-div'>
                            <h3 className='iconText mb-4'>Create an <span className='text-danger'>account</span></h3>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Input type='text' placeholder='Full Name' name='name' value={name} setValue={setName} required />
                                    <Input type='email' placeholder='Enter your email' name='email' value={email} setValue={setEmail} required />
                                    <Input type='password' placeholder='Enter your password' name='password' value={password} setValue={setPassword} required />
                                </div>
                                <div className='d-flex justify-content-between align-items-center mx-0' style={{margin: "2.3rem"}}>
                                    <label className='my-bold'>
                                        Are you a:
                                        <select name='role' className='mx-2 border-0' value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value='patient'>User</option>
                                            <option value='doctor'>Lawyer</option>
                                        </select>
                                    </label>

                                    <label className='my-bold'>
                                        Gender:
                                        <select name='gender' className='mx-2 border-0' value={gender} onChange={(e) => setGender(e.target.value)}>
                                            <option value=''>Select</option>
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                            <option value='other'>Other</option>
                                        </select>
                                    </label>
                                </div>

                                <div className='d-flex align-items-center gap-3'>
                                    <div className='rounded-circle border-2 border-primary'>
                                        <img src={avatar} alt='' className='rounded-circle' width={40} />
                                    </div>

                                    <div>
                                        <input
                                            type='file'
                                            name='photo'
                                            id='customFile'
                                            onChange={handleFileInputChange}
                                            accept='.jpg, .png'
                                            className='cursor-pointer h-100'
                                            style={{ display: 'none' }} // hide the default file input
                                        />
                                        <label
                                            htmlFor='customFile'
                                            className='my-bold rounded cursor-pointer'
                                            style={{ display: 'inline-block', padding: '7px 11px', border: '1px solid #ccc', borderRadius: '5px' }}
                                        >
                                            Upload Photo
                                        </label>
                                    </div>

                                </div>
                                <div className='mt-5'>
                                    <button type='submit' className='w-100 btn btn-danger btn-lg rounded p-3'>Sign Up</button>
                                </div>
                                <p className='mt-4 text-dark text-center'>
                                    Already have an account? <Link to='/login' className='text-danger ml-1'>Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}


