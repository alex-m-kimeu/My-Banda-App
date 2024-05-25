import React from 'react';

export const OrdersTable = ({ orders, onAcceptOrder, onDeclineOrder }) => {
    return (
        <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border-collapse">
                <thead>
                    <tr>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-gray-600">Order ID</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-gray-600">Quantity</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-gray-600">Status</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-gray-600">Buyer Name</th>
                        <th className="py-3 px-6 text-left border-b border-gray-200 bg-gray-100 text-sm text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-100 border-b border-gray-200 py-4">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{order.id}</td>
                            <td className="py-3 px-6 text-left">{order.quantity}</td>
                            <td className="py-3 px-6 text-left">{order.status}</td>
                            <td className="py-3 px-6 text-left">{order.buyer_name}</td>
                            <td className="py-3 px-6 text-left">
                                <button className="text-Variant hover:text-Secondary mr-2" onClick={() => onAcceptOrder(order.id)}>Accept</button>
                                <button className="text-Variant hover:text-Secondary" onClick={() => onDeclineOrder(order.id)}>Decline</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};
