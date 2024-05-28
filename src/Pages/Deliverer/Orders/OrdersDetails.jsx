import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
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
                toast.success('status successfully changed')
            })
            .catch(error => console.error('Error:', error));
    };

    return ( 
        <div className="container mx-auto p-6 "> 
            <div className="bg-white shadow-md rounded-md p-6"> 
                <h2 className="text-2xl text-Secondary font-semibold ">Order Details: ID  No. #{orderData.id}</h2>
                <h2 className="text- font-semibold mb-1"> ID  No. #{orderData.id}</h2>
                <h2 className="text- font-light  mb-14"> {orderData.created_at}</h2>

                <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 gap-y-10'>
                    <div className='flex '>
                        {/* image */}
                        <div className='w-20 h-20 object-fill rounded-full mr-3'>
                            <img src={orderData.buyer.image} alt=""  className='w-20 h-20 object-cover rounded-full'></img>
                        </div>
                        {/* infor */}
                        <div>
                        <h1 className='font-medium text-lg'>Customer</h1>
                        <div><span className='text-gray-500 mr-1'>Name:</span>{orderData.buyer.username}</div>
                        <div><span className='text-gray-500 mr-1'>Email:</span>{orderData.buyer.email}</div>
                        <div><span className='text-gray-500 mr-1'>Phone:</span>{orderData.buyer.contact}</div>
                        <div><span className='text-gray-500 mr-1'>Delivery_location:</span>{orderData.location}</div>
                    </div>
                    </div>

                    <div className='flex '>
                        {/* image */}
                        <div className='w-20 h-20 object-fill rounded-full mr-3'>
                            <img src={orderData.store.image} alt=""  className='w-20 h-20 object-cover rounded-full'></img>
                        </div>
                        {/* infor */}
                        <div>
                        <h1 className='font-medium text-lg'>Store Info</h1>
                        <div><span className='text-gray-500 mr-1'>store_name:</span>{orderData.store.store_name}</div>
                        <div><span className='text-gray-500 mr-1'>Location:</span>{orderData.store.location}</div>
                    </div>
                    </div>

                    <div className='flex '>
                        {/* image */}
                        <div className='w-20 h-20 object-fill rounded-full mr-3'>
                            <img src={orderData.products.images[0]} alt=""  className='w-20 h-20 object-cover rounded-full'></img>
                        </div>
                        {/* infor */}
                        <div>
                        <h1 className='font-medium text-lg'>Product infomation</h1>
                        <div><span className='text-gray-500 mr-1'>Category:</span>{orderData.products.category_name}</div>
                        <div><span className='text-gray-500 mr-1'>Price:</span>{orderData.products.price}</div>
                        <div><span className='text-gray-500 mr-1'>Quantity:</span>{orderData.quantity}</div>
                    </div>
                    </div>
                    
                    <form onSubmit={handleSubmitStatus} className="max-w-sm mx-auto ">
                    <label htmlFor="delivery_status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Status</label>
                    <select id="delivery_status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lgblock w-full p-2.5 " value={delivery_status.delivery_status} onChange={handleStatusChange}>
                        <option value="Change status">Change Status</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Denied">Denied</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button type='submit' className='border px-2 py-2 mt-8 bg-Secondary hover:bg-transparent rounded-md'>Change Status</button>
                </form>
                </div>
             
            </div>
        </div>
    );
};