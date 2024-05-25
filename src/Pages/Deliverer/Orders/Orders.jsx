import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { OrdersTable } from './OrdersTable';

export const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://127.0.0.1:5500/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                console.log(data)
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleAcceptOrder = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:5500/order/${orderId}/accept`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to accept order');
            }

            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, delivery_status: 'Accepted' };
                }
                return order;
            });
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };

    const handleDeclineOrder = async (orderId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:5500/order/${orderId}/decline`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to decline order');
            }

            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    return { ...order, delivery_status: 'Declined' };
                }
                return order;
            });
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error declining order:', error);
        }
    };

    const handleViewOrderDetails = (orderId) => {
        navigate(`/order-details/${orderId}`);
    };

    const handleAddOrderClick = () => {
        navigate('/add-order');
    };

    return (
        <div className="py-[20px] space-y-4">
            <div className="flex justify-between">
                <h1 className="text-Text font-bold text-xl text-center lg:text-left">Orders</h1>
               
            </div>
            <OrdersTable
                orders={orders}
                onAcceptOrder={handleAcceptOrder}
                onDeclineOrder={handleDeclineOrder}
                onViewOrderDetails={handleViewOrderDetails}
            />
        </div>
    );
};
