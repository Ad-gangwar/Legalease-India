import React, { useEffect, useState } from 'react';
import Input from '../../shared/Input';
import uploadImgToCloudinary from '../../../utils/Cloudinary_Upload';
import HashLoader from 'react-spinners/HashLoader';
import toast from 'react-hot-toast';
import { URL } from '../../../utils/config';

export default function Profile({ user }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const token = localStorage.getItem("legalToken");

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const data = await uploadImgToCloudinary(file);
        setPhoto(data.url);
    }

    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
        setGender(user.gender);
        setPhoto(user.photo);
        setAddress(user.address)
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = { email, name, gender, photo, address};
        // console.log(photo);
        try {
            const response = await fetch(URL + "/client/" + user._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (response && !response.err) {
                // Registration successful
                toast.success("Updated Successfully!");
                setLoading(false);
                window.location.reload();
            }
        } catch (error) {
            // Handle unexpected errors
            console.error("Error:", error);
            toast.error(`An unexpected error occurred: ${error.message || "Unknown error"}`);
        }
    };


    return (
        <div className="container my-5 pe-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-5 mt-10">
                    <Input type='text' placeholder='Full Name' name='name' value={name} setValue={setName} required />
                    <Input type='email' placeholder='Enter your email' name='email' value={email} setValue={setEmail} required />
                    <Input type='text' placeholder='Enter your Address' name='address' value={address} setValue={setAddress} required />
                </div>
                <div className='d-flex justify-content-between align-items-center mx-0' style={{ margin: "2.3rem" }}>
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
                    {photo && (<div className='rounded-circle border-2 border-primary'>
                        <img src={photo} alt='' className='rounded-circle' width={50} />
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
                <div className="mt-5">
                    <button
                        disabled={loading && true}
                        type="submit"
                        className="w-100 btn btn-danger btn-lg rounded p-3"
                    >
                        {loading ? <HashLoader size={35} color="white" /> : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
}
