import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import MyServiceReqs from './MyServiceReq';
import Profile from './Profile';
import clientGetProfile from '../../../hooks/userFetchData';
import Loading from '../../Loader/Loading';
import Error from '../../Error/Error';
import Layout from '../../Layout/Layout';
import { URL } from '../../../utils/config';
import toast from 'react-hot-toast';

export default function MyAccount() {
    const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
    const [tab, setTab] = useState('serviceReqs');
    const { data: userData, loading, error } = clientGetProfile('/client/profile/me');

    const handleLogout = () => {
        removeCookie('token');
        removeCookie('user');
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(URL + "/client/" + userData._id, {
                method: 'DELETE', // Specify the HTTP method
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cookies.token}`,
                },
            });

            const responseData = await response.json();

            // Check the response data for success
            if (responseData.success) {
                handleLogout();
                toast.success("Account Deleted Successfully!");
            } else {
                toast.error("Account Deletion Failed 😒");
            }

        } catch (error) {
            console.error("Error:", error);
            toast.error(`An unexpected error occurred: ${error.message || "Unknown error"}`);
        }
    };


    return (
        <Layout>
            <section>
                <div className="container mt-5 mb-3" style={{ maxWidth: "1300px" }}>
                    {loading && !error && <Loading />}
                    {error && !loading && <Error errMessage={error} />}
                    {!loading && !error && (
                        <div className="row">
                            <div className="col-md-4 pb-4">
                                <div className="text-center">
                                    <figure className="rounded-circle border-2 border-primary mx-auto" style={{ width: "200px", height: "200px" }}>
                                        <img src={userData.photo} alt="" className="img-fluid rounded-circle" />
                                    </figure>
                                </div>

                                <div className="text-center mt-4">
                                    <h3 className="text-danger iconText">{userData.name}</h3>
                                    <p className="">{userData.email}</p>
                                </div>

                                <div className="mt-5">
                                    <button className="w-100 btn btn-secondary btn-lg rounded" onClick={handleLogout}>
                                        Logout
                                    </button>
                                    <button className="w-100 btn btn-danger btn-lg rounded mt-3" onClick={handleDelete}>Delete Account</button>
                                </div>
                            </div>

                            <div className="col-md-8 container signup-div px-5">
                                <div className="d-flex">
                                    <button
                                        onClick={() => setTab('serviceReqs')}
                                        className={`${tab === 'serviceReqs' ? 'btn btn-danger' : 'btn btn-outline-danger'
                                            } me-2`}>
                                        My Service Reqs
                                    </button>
                                    <button
                                        onClick={() => setTab('settings')}
                                        className={`${tab === 'settings' ? 'btn btn-danger' : 'btn btn-outline-danger'
                                            }`}>
                                        Profile Settings
                                    </button>
                                </div>
                                {tab === 'serviceReqs' && <MyServiceReqs />}
                                {tab === 'settings' && <Profile user={userData} />}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}
