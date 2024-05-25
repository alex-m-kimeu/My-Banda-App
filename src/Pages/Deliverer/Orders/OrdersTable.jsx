import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTrash } from 'react-icons/fa';

export const OrdersTable = ({ orders, token, onUpdate, onDeclineOrder }) => {
    const navigate = useNavigate();

    const handleDetailsClick = (orderId) => {
        navigate(`/order/${orderId}`);
    };


    if (!Array.isArray(orders)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
                <thead>
                    <tr>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-Variant2">Order ID</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-Variant2">Quantity</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-Variant2">Status</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-Variant2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-100 border-b border-gray-200 py-4">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                            <td className="py-3 px-6 text-left">{order.quantity}</td>
                            <td className="py-3 px-6 text-left">{order.status}</td>
                            <td className="py-3 px-6 text-left">
                                <button
                                    className="text-Variant hover:text-Secondary mr-2"
                                    onClick={() => handleDetailsClick(order.id)}
                                >
                                    Details
                                </button>
                                <button
                                    className="text-Variant hover:text-Secondary mr-2"
                                    onClick={() => onUpdate(order.id, 'Accepted')}
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    className="text-Variant hover:text-Secondary"
                                    onClick={() => onDeclineOrder(order.id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
