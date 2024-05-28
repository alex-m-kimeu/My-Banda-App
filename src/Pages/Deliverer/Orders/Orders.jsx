import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrdersTable } from './OrdersTable';

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('https://my-banda.onrender.com/delivererorders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data);
                // console.log(data)
            } catch (error) {
                console.error('Error fetching orders:', error);
            } 
        };

        fetchOrders();
    }, []);



    const handleViewOrderDetails = (orderId) => {
        navigate(`/order-details/${orderId}`);
    };

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-Text font-bold text-xl text-center lg:text-left">Orders</h1>
            </div>
            <OrdersTable
                orders={orders}
        
                onViewOrderDetails={handleViewOrderDetails}
            />
        </div>
    );
};