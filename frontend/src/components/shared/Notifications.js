import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout';
import { makeAuthGetReq } from '../../utils/serverHelper';
import { Icon } from '@iconify/react';
import { makeAuthPostReq } from '../../utils/serverHelper';
import toast from 'react-hot-toast';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeAuthGetReq("/notification/getAll");
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

    const handleDelete=async(notificationId)=>{
        try{
            const response =await makeAuthPostReq("/notification/deleteOne", {
                notificationId
            });
            if(response.success){
                toast.success("Deleted successfully!");
            }
            else{
                toast.error("Failed to Delete!");
            }
        }
        catch(error){
            console.log("Error: ", error);
        }
    }

    const handleDeleteAll=async()=>{
        try{
            const response =await makeAuthPostReq("/notification/deleteAll");

            if(response.success){
                toast.success("All Notifications Deleted successfully!");
            }
            else{
                toast.error("Failed to Delete!");
            }
        }
        catch(error){
            console.log("Error: ", error);
        }
    }

    return (
        <Layout>
            <div className='container mb-5'>
                <div className='d-flex justify-content-between mt-4'>
                    <button className='btn btn-danger'>Mark all as Read</button>
                    <button className='btn btn-danger' onClick={handleDeleteAll}>Delete All</button>
                </div>
                {notifications.length !== 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className='bg-warning bg-opacity-25 my-3 p-3 d-flex justify-content-between'>
                            <div className='my-bold'>{notification.notificationText}
                            </div>
                            <Icon icon="fluent:delete-48-regular" width={28} className='cursor-pointer ms-2' onClick={()=>{
                                handleDelete(notification._id);
                            }}/>
                        </div>
                    ))
                ) : (
                    <h2 className='text-danger iconText my-5 py-5 text-center'>No notifications available</h2>
                )}
            </div>

        </Layout>
    )
}
