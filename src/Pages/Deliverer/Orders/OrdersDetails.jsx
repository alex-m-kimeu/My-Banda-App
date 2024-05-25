import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const OrdersDetails = ({ token }) => {
    const { orderId } = useParams();
    const [buyerData, setBuyerData] = useState(null);
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:5500/order/${orderId}/buyer`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setBuyerData(data);
                setStatus(data.status);
            })
            .catch(error => console.error('Error:', error));
    }, [orderId, token]);

    const handleStatusChange = (newStatus) => {
        fetch(`http://127.0.0.1:5500/orderByID/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
            .then(response => response.json())
            .then(data => {
                setStatus(newStatus);
                navigate('/orders'); // 
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
            {buyerData ? (
                <div>
                    <p><strong>Name:</strong> {buyerData.name}</p>
                    <p><strong>Email:</strong> {buyerData.email}</p>
                    <p><strong>Address:</strong> {buyerData.address}</p>
                    <p><strong>Status:</strong> {status}</p>
                    {status === 'Pending' && (
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleStatusChange('Accepted')}
                        >
                            Accept Order
                        </button>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

