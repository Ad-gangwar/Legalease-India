import React, {useEffect, useState, useCallback} from 'react'
import {makeAuthGetReq} from '../utils/serverHelper';

const UserFetchData=(url, options = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const { 
        retryAttempts = 3, 
        retryDelay = 1000,
        autoRetry = true,
        onSuccess,
        onError
    } = options;

    const fetchData = useCallback(async (isRetry = false) => {
        if (!isRetry) {
            setLoading(true);
            setError(null);
        }

        try {
            const response = await makeAuthGetReq(url);
            if (!response.success) {
                throw new Error(response.message || "Failed to fetch data");
            }
            
            setData(response.data);
            setLoading(false);
            setError(null);
            setRetryCount(0);
            
            if (onSuccess) {
                onSuccess(response.data);
            }
        } catch (err) {
            setLoading(false);
            const errorMessage = err.message || "An unexpected error occurred";
            setError(errorMessage);
            
            if (onError) {
                onError(err);
            }

            // Auto retry logic
            if (autoRetry && retryCount < retryAttempts) {
                setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                    fetchData(true);
                }, retryDelay * (retryCount + 1)); // Exponential backoff
            }
        }
    }, [url, retryCount, retryAttempts, retryDelay, autoRetry, onSuccess, onError]);

    const retry = useCallback(() => {
        setRetryCount(0);
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data, 
        loading, 
        error, 
        retry,
        retryCount,
        isRetrying: retryCount > 0
    }
}

export default UserFetchData;