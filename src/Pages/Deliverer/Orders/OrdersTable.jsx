import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTrash } from 'react-icons/fa';

export const OrdersTable = ({ orders }) => {
    const navigate = useNavigate();
    const getStatusClass = (status) => {
        switch (status) {
            case 'Denied':
                return 'bg-red-100 text-red-800';
            case 'Accepted':
                return 'bg-yellow-100 text-yellow-800';
            case 'Shipped':
                return 'bg-blue-100 text-blue-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-gray-100 text-gray-800';
            default:
                return '';
        }
    };

    const handleDetailsClick = (orderId) => {
        navigate(`/orderByID/${orderId}`);
    };

    if (!Array.isArray(orders)) {
        return <div>You have no orders yet</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse hidden md:table">
                <thead>
                    <tr>
                        <th className="py-2 px-2 md:px-3 lg:px-2 text-left border-b border-gray-200 bg-gray-100 text-sm lg:text-lg text-Variant2">Order ID</th>
                        <th className="py-2 px-2 md:px-3 lg:px-2 text-left border-b border-gray-200 bg-gray-100 text-sm lg:text-lg text-Variant2">Created at</th>
                        <th className="py-2 px-2 md:px-3 lg:px-2 text-left border-b border-gray-200 bg-gray-100 text-sm lg:text-lg text-Variant2">Quantity</th>
                        <th className="py-2 px-2 md:px-3 lg:px-2 text-left border-b border-gray-200 bg-gray-100 text-sm lg:text-lg text-Variant2">Company Status</th>
                        <th className="py-2 px-2 md:px-3 lg:px-2 text-left border-b border-gray-200 bg-gray-100 text-sm lg:text-lg text-Variant2">Delivery Status</th>
                        <th className="py-2 px-2 md:px-3 lg:px-2 text-left border-b border-gray-200 bg-gray-100 text-sm lg:text-lg text-Variant2">Price</th>
                        <th className="py-2 px-2 md:px-3 lg:px-2 text-left border-b border-gray-200 bg-gray-100 text-sm lg:text-lg text-Variant2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-100 border-b border-gray-200">
                            <td className="py-2 px-2 md:px-3 lg:px-2 text-left whitespace-nowrap">{order.id}</td>
                            <td className="py-2 px-2 md:px-3 lg:px-2 text-left whitespace-nowrap">{order.created_at}</td>
                            <td className="py-2 px-2 md:px-3 lg:px-2 text-left">{order.quantity}</td>
                            <td className="py-2 px-2 md:px-3 lg:px-2 text-left">{order.status}</td>
                            <td className="py-2 px-2 md:px-3 lg:px-2 text-left">
                                <span className={`px-1 py-1 rounded ${getStatusClass(order.delivery_status)}`}>
                                    {order.delivery_status}
                                </span>
                            </td>
                            <td className="py-2 px-2 md:px-3 lg:px-2 text-left">{order.price}</td>
                            <td className="py-2 px-2 md:px-3 lg:px-2 text-left">
                                <button
                                    className="text-white bg-Secondary py-1 px-2 md:py-2 md:px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-transparent hover:text-Variant md:text-lg"
                                    onClick={() => handleDetailsClick(order.id)}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="md:hidden">
                {orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg mb-4 shadow-md">
                        <div className="flex justify-between py-2 px-4 border-b border-gray-200 bg-gray-100">
                            <span className="font-bold text-gray-600">Order ID</span>
                            <span>{order.id}</span>
                        </div>
                        <div className="flex justify-between py-2 px-4 border-b border-gray-200">
                            <span className="font-bold text-gray-600">Created at</span>
                            <span>{order.created_at}</span>
                        </div>
                        <div className="flex justify-between py-2 px-4 border-b border-gray-200">
                            <span className="font-bold text-gray-600">Quantity</span>
                            <span>{order.quantity}</span>
                        </div>
                        <div className="flex justify-between py-2 px-4 border-b border-gray-200">
                            <span className="font-bold text-gray-600">Company Status</span>
                            <span>{order.status}</span>
                        </div>
                        <div className="flex justify-between py-2 px-4 border-b border-gray-200">
                            <span className="font-bold text-gray-600">Delivery Status</span>
                            <span className={`px-2 py-1 rounded ${getStatusClass(order.delivery_status)}`}>
                                {order.delivery_status}
                            </span>
                        </div>
                        <div className="flex justify-between py-2 px-4 border-b border-gray-200">
                            <span className="font-bold text-gray-600">Price</span>
                            <span>{order.price}</span>
                        </div>
                        <div className="flex justify-between py-2 px-4">
                            <button
                                className="text-Variant3 bg-Secondary hover:bg-Variant3 hover:text-Variant py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 md:py-3 md:px-6 md:text-lg"
                                onClick={() => handleDetailsClick(order.id)}
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
