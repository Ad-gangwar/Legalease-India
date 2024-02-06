import React, { useState } from 'react';
import Input from './shared/Input';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import signupImg from '../assets/images/signup-male.jpg';
import signupImg2 from '../assets/images/signup-female.jpg';
import toast from 'react-hot-toast';
import uploadImgToCloudinary from '../utils/Cloudinary_Upload';
import { makeUnauthPostReq } from '../utils/serverHelper';
import HashLoader from 'react-spinners/HashLoader';

export default function Signup() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");
    const [show, setShow] = useState(false);
    const [verified, setVerified] = useState(false);
    const [enteredOTP, setEnteredOTP] = useState("");

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const data = await uploadImgToCloudinary(file);
        // console.log(data);
        setPreviewURL(data.url);
        setSelectedFile(data.url);
    }

    const handleOtp = async () => {
        try {
            const response = await makeUnauthPostReq("/auth/generateOTP", { email });
            if (!response.success) {
                toast.error(response.message);
            }
            else {
                toast.success(response.message);
                setOtp(response.data.otp);
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert(`An unexpected error occurred: ${error.message || "Unknown error"}`);
        }
    }

    const handleOtpInputChange = (e) => {
        // Handle changes in the OTP input field if needed
        setEnteredOTP(e.target.value);
    };


    const handleOtpFormSubmit = async (e) => {
        e.preventDefault();
        // Add logic for OTP verification here if needed
        try {
            const response = await makeUnauthPostReq("/auth/verifyOTP", { email, enteredOTP });
            if (!response.success) {
                toast.error(response.message);
            }
            else {
                toast.success(response.message);
                setVerified(true);
            }
        }
        catch (error) {
            console.error("Error:", error);
            alert(`An unexpected error occurred: ${error.message || "Unknown error"}`);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!otp && !verified) {
            setLoading(false);
            return toast.error("Verify the OTP first!");
        }
        const data = { email, name, password, role, gender, photo: selectedFile, address };
        try {
            const response = await makeUnauthPostReq('/auth/register', data);

            if (response && !response.err) {
                // Registration successful
                toast.success("Congratulations! You are successfully registered.");
                setLoading(false);
                navigate("/login");
            } else {
                // Handle specific error conditions
                if (response.err === "User already exists") {
                    // Handle user already exists error
                    toast.error("User with this email already exists. Please use a different email.");
                } else {
                    // Handle other errors
                    toast.error("Registration failed. Please try again later.");
                }
            }
        } catch (error) {
            // Handle unexpected errors
            console.error("Error:", error);
            alert(`An unexpected error occurred: ${error.message || "Unknown error"}`);
        }
    };


    return (
        <Layout>
            <section className='px-5 my-5 signup-div'>
                <div style={{ maxWidth: "1170px" }} className='mx-auto w-100'>
                    <div className='row'>
                        {/* Login image */}
                        <div className='col-lg-6 rounded signup-img d-flex align-items-center'>
                            <figure className='container'>
                                {gender === 'female' ? <img src={signupImg2} alt='' className='w-100 rounded' ></img> :
                                    <img src={signupImg} alt='' className='w-100 rounded' ></img>
                                }
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
                                    <Input type='text' placeholder='Enter your Address' name='address' value={address} setValue={setAddress} required />
                                </div>
                                <div className='d-flex justify-content-between align-items-center mx-0' style={{ margin: "2.3rem" }}>
                                    <label className='my-bold'>
                                        Are you a:
                                        <select name='role' className='mx-2 border-0' value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value='client'>Client</option>
                                            <option value='serviceProvider'>Service Provider</option>
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
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center gap-3'>
                                        {selectedFile && (<div className='rounded-circle border-2 border-primary'>
                                            <img src={previewURL} alt='' className='rounded-circle' width={50} />
                                        </div>)}

                                        <div>
                                            <input
                                                type='file'
                                                name='photo'
                                                id='customFile'
                                                onChange={handleFileInputChange}
                                                accept='.jpg, .png'
                                                className='cursor-pointer h-100'
                                                style={{ display: 'none' }}
                                            />
                                            <label
                                                htmlFor='customFile'
                                                className='my-bold rounded cursor-pointer sbg'
                                                style={{ display: 'inline-block', padding: '7px 11px', border: '1px solid #ccc', borderRadius: '5px' }}
                                            >
                                                Upload Photo
                                            </label>
                                        </div>
                                    </div>
                                    {!show && (
                                        <button
                                            className='btn btn-secondary'
                                            onClick={() => {
                                                setShow(true);
                                                handleOtp();
                                            }}
                                        >
                                            Generate OTP
                                        </button>
                                    )}


                                </div>
                                <div className='mt-4'>
                                    {show && (
                                        <section>
                                            <p className='my-bold'>Please enter the OTP sent to your email ID</p>
                                            <div className='d-flex mb-5'>
                                                <form onSubmit={handleOtpFormSubmit} className='d-flex w-100'>
                                                    <label htmlFor='otpInput' className='visually-hidden'>
                                                        Enter your OTP
                                                    </label>
                                                    <input
                                                        id='otpInput'
                                                        className='form-control me-3'
                                                        placeholder='Enter your OTP'
                                                        onChange={handleOtpInputChange}
                                                    />
                                                    <button type='button' className='btn btn-secondary my-bold' onClick={handleOtpFormSubmit}>
                                                        Verify OTP
                                                    </button>
                                                </form>
                                            </div>
                                        </section>
                                    )}
                                </div>

                                <div className='mt-4'>
                                    <button type='submit' className='w-100 btn btn-danger btn-lg rounded p-3' disabled={loading}>
                                        {loading ? <HashLoader size={35} color='white' /> : 'Sign Up'}
                                    </button>

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


