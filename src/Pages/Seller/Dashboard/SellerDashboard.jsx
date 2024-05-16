import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import adminImage from '../../../assets/admin.png';
import { IoStorefrontOutline } from "react-icons/io5";


export const SellerDashboard = () => {
    const [storeName, setStoreName] = useState('');
    const [totalProducts, setTotalProducts] = useState('');
    const [seller, setSeller] = useState([]);
    


    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        fetchSellers(token, userId);
    }, []);

    const fetchSellers = (token, userId) => {
        fetch(`http://127.0.0.1:5500/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setSeller(data.username);
                setStoreName(data.store.store_name)
                setTotalProducts(data.store.products)
            
            })
            
            .catch(error => console.error('Error:', error));
            

    };


    return (
        <div className="flex flex-col lg:flex-row items-start">
            <div className="lg:w-1/2">
                <h1 className="text-2xl font-bold ml-8 mb-4 mt-8">Dashboard</h1>
                <div className="rounded-md p-6 shadow-md mb-4 mt-6 ml-8 mr-6 flex items-center lg:w-90">
                    <div className="mr-4 flex-grow">
                        <div> 
                            <h1 className="text-2xl font-bold ml-8 mb-4">Welcome to {storeName}</h1>
                            <p className="text-lg text-Secondary text-center">Seller Name: {seller}</p>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <IoStorefrontOutline className="text-8xl text-Secondary" />
                    </div>
                </div>
                <div className="ml-8 mb-8 mt-12">
                    <img src={adminImage} alt='Image' className="w-full h-auto" />
                </div>
            </div>
            <div className="lg:w-1/5 lg:ml-10 lg:mt-24">
                <div className="rounded-lg p-6 shadow-md mb-4">
                    <p className="text-lg">Total Products:</p>
                    <p className="text-2xl font-bold">{totalProducts.length}</p>
                </div>
            </div>
        </div>
    );
}

