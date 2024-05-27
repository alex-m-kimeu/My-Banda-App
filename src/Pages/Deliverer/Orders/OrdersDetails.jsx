import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const OrdersDetails = () => {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [delivery_status, setStatus] = useState({ delivery_status: '' });

    useEffect(() => {
        if (orderId) {
            const fetchStoreData = async () => {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://my-banda.onrender.com/orderByID/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setOrderData(data);
                setLoading(false);
            };

            fetchStoreData();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    const handleStatusChange = (e) => {
        const { id, value } = e.target;
        setStatus((statusData) => ({ ...statusData, [id]: value }));
    };

    const handleSubmitStatus = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        const userData = new FormData();
        userData.append("delivery_status", delivery_status.delivery_status);
        fetch(`https://my-banda.onrender.com/deliveryorderByID/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: userData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOrderData(data);
                setStatus(data.delivery_status);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl"> 
            <div className="bg-white shadow-md rounded-md p-6">
                <h2 className="text-2xl text-Secondary font-semibold mb-4">Order Details: {orderData.id}</h2>
                <p><span className='text-Variant2 font-semibold'>Buyer:</span> {orderData.buyer.username}</p>
                <p><span className='text-Variant2 font-semibold'>Store Name:</span> {orderData.store.store_name}</p>
                <p><span className='text-Variant2 font-semibold'>Delivery Company:</span> {orderData.deliverycompany.name}</p>

                <form onSubmit={handleSubmitStatus} className="max-w-sm mx-auto mt-6">
                    <label htmlFor="delivery_status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Status</label>
                    <select id="delivery_status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lgblock w-full p-2.5 " value={delivery_status.delivery_status} onChange={handleStatusChange}>
                        <option value="Change status">Change Status</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Denied">Denied</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button type='submit' className='border px-2 py-2 mt-8 bg-Secondary hover:bg-transparent rounded-md'>Change Status</button>
                </form>
            </div>
        </div>
    );
};
