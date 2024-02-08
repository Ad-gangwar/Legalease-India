import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout';
import { makeAuthGetReq } from '../../utils/serverHelper';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeAuthGetReq("/notification/getAll");
                console.log(response);
                if (response.success) {
                    setNotifications(response.data);
                } else {
                    console.log("Failed to fetch notifications.");
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchData();
    }, [notifications]);

    return (
        <Layout>
            <div className='container mb-5'>
            <div className='d-flex justify-content-end mt-4'>
                <button className='btn btn-danger'>Mark all as Read</button>
            </div>
                {notifications.length !== 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className='bg-warning bg-opacity-25 my-3 p-3 my-bold'>{notification.notificationText}</div>
                    ))
                ) : (
                    <h2 className='text-danger my-bold my-5 py-5 text-center'>No notifications available</h2>
                )}
            </div>

        </Layout>
    )
}
