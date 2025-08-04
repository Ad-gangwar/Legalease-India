import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout';
import { makeAuthGetReq } from '../../utils/serverHelper';
import { Icon } from '@iconify/react';
import { makeAuthPostReq } from '../../utils/serverHelper';
import toast from 'react-hot-toast';
import Loading, { ErrorFallback, EmptyState } from '../Loader/Loading';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await makeAuthGetReq("/notification/getAll");
            if (response.success) {
                setNotifications(response.data);
            } else {
                throw new Error(response.message || "Failed to fetch notifications");
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setError(error.message || "Failed to load notifications");
            toast.error("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleDelete = async (notificationId) => {
        try {
            setActionLoading(true);
            const response = await makeAuthPostReq("/notification/deleteOne", {
                notificationId
            });
            if (response.success) {
                toast.success("Deleted successfully!");
                // Remove the deleted notification from state
                setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
            } else {
                toast.error("Failed to Delete!");
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Failed to delete notification");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteAll = async () => {
        try {
            setActionLoading(true);
            const response = await makeAuthPostReq("/notification/deleteAll");

            if (response.success) {
                toast.success("All Notifications Deleted successfully!");
                setNotifications([]);
            } else {
                toast.error("Failed to Delete!");
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Failed to delete all notifications");
        } finally {
            setActionLoading(false);
        }
    };

    const handleRetry = () => {
        fetchNotifications();
    };

    const renderContent = () => {
        if (loading) {
            return <Loading message="Loading notifications..." />;
        }

        if (error) {
            return (
                <ErrorFallback 
                    error={error}
                    message="Failed to load notifications"
                    onRetry={handleRetry}
                />
            );
        }

        if (notifications.length === 0) {
            return (
                <EmptyState 
                    message="No notifications available"
                    icon="mdi:bell-off-outline"
                />
            );
        }

        return (
            <>
                <div className='d-flex justify-content-between mt-4'>
                    <button className='btn btn-danger' disabled={actionLoading}>
                        Mark all as Read
                    </button>
                    <button 
                        className='btn btn-danger' 
                        onClick={handleDeleteAll}
                        disabled={actionLoading}
                    >
                        {actionLoading ? (
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : null}
                        Delete All
                    </button>
                </div>
                {notifications.map((notification, index) => (
                    <div key={index} className='bg-warning bg-opacity-25 my-3 p-3 d-flex justify-content-between'>
                        <div className='my-bold'>{notification.notificationText}</div>
                        <Icon 
                            icon="fluent:delete-48-regular" 
                            width={28} 
                            className='cursor-pointer ms-2' 
                            onClick={() => handleDelete(notification._id)}
                            style={{ opacity: actionLoading ? 0.5 : 1 }}
                        />
                    </div>
                ))}
            </>
        );
    };

    return (
        <Layout>
            <div className='container mb-5'>
                {renderContent()}
            </div>
        </Layout>
    )
}

