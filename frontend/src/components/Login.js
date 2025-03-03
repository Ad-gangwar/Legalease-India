import React, { useState } from 'react';
import Input from './shared/Input';
import { Link } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { makeUnauthPostReq } from '../utils/serverHelper';
import toast from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';

export default function Login() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { email, password };
        try {
            const response = await makeUnauthPostReq('/auth/login', data);
            if (response && !response.err) {
                // Assuming the token is directly present in the response object
                const token = response.token;
                //setting time for the expiry of the token
                const date = new Date();
                date.setDate(date.getDate() + 30);
                localStorage.setItem("legalToken", token);
                localStorage.setItem("legalUser", JSON.stringify(response.data));
                toast.success("Logged in Successfully!");
                navigate("/");
            } else {
                toast.error("Enter valid Credentials!");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false); // Set loading state to false regardless of success or error
        }
    };



    return (
        <Layout>
            <section className='my-5 py-2 mx-3'>
                <div className='container w-100 mx-auto rounded-lg shadow-lg my-5 p-4' style={{ maxWidth: "570px" }}>
                    <h3 className='fs-3 iconText mb-4 text-center'>
                        Hello! <span className='text-danger'>Welcome</span> Back 🎉
                    </h3>

                    <form className='py-4'>
                        <Input type='email' placeholder='Enter your email' value={email} setValue={setEmail} />
                        <Input type='password' placeholder='Enter your password' value={password} setValue={setPassword} />
                        <div className='mt-4'>
                            <button type='submit' className='w-100 btn btn-danger rounded px-4 py-2 my-bold fs-4 mt-4' onClick={handleSubmit}>
                                {loading ? <HashLoader size={35} color='white' /> : 'Login'}
                            </button>
                        </div>
                        <p className='mt-4 text-center'>
                            Don't have an account? <Link to='/signup' className='text-danger ml-1'>Sign Up</Link>
                        </p>
                    </form>
                </div>
            </section>
        </Layout>
    )
}


