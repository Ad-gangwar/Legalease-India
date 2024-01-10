import React, {useState} from 'react';
import Input from './shared/Input';
import { Link} from 'react-router-dom';
import Layout from './Layout/Layout';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Layout>
            <section>
                <div className='container w-100 mx-auto rounded-lg shadow-lg my-5 p-4' style={{maxWidth: "570px"}}>
                    <h3 className='fs-3 iconText mb-4 text-center'>
                        Hello! <span className='text-danger'>Welcome</span> Back 🎉
                    </h3>

                    <form className='py-4'>
                        <Input type='email' placeholder='Enter your email' value={email} setValue={setEmail} />
                        <Input type='password' placeholder='Enter your password' value={password} setValue={setPassword} />
                        <div className='mt-4'>
                            <button type='submit' className='w-100 btn btn-danger rounded px-4 py-2 my-bold fs-4 mt-4'>Login</button>
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


