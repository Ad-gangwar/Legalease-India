import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout';
import {makeUnauthGetReq} from '../../utils/serverHelper';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        const fetchData = ()=>{
            const response = makeUnauthGetReq("/notification/getAll");
        }
    }, [notifications])
    return (
        <Layout>
            <div></div>
        </Layout>
    )
}
