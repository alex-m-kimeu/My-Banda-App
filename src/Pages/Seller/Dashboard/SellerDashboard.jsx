import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import adminImage from '../../../assets/admin.png';
import { IoStorefrontOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';


export const SellerDashboard = () => {
    const [storeName, setStoreName] = useState('');
    const [totalProducts, setTotalProducts] = useState([]);
    const [seller, setSeller] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        fetchSeller(token, userId);
    }, []);

    const fetchSeller = (token, userId) => {
        fetch(`http://127.0.0.1:5500/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setSeller(data.username);
                setStoreName(data.store.store_name);
                setTotalProducts(data.store.products);
            })
            .catch(error => console.error('Error:', error));
    };
    return (
        <div className="flex flex-col lg:flex-row items-start font-body">
            <div className="lg:w-2/3">
                <h1 className="text-2xl font-bold  mb-4 mt-4 text-Text">Dashboard</h1>
                {storeName ? (
                    <>
                        <div className="rounded-sm p-8 shadow-md mb-4 mt-6  lg:w-2/3 md:w-2/3 bg-Primary flex items-center">
                            <div className="mr-4 flex-grow">
                                <h1 className="text-2xl font-bold mb-4 text-Variant">Welcome to {storeName}</h1>
                                <p className="text-lg text-Secondary">{seller}</p>
                            </div>
                            <div className="ml-auto">
                                <IoStorefrontOutline className="text-8xl text-Secondary" />
                            </div>
                        </div>
                        <div className="ml-8 mb-8 mt-10">
                            <img src={adminImage} alt='Admin' className="sm:w-full md:w-1/2 lg:w-2/3 h-auto" />
                        </div>
                    </>
                ) : (
                    <div className="rounded-md p-6 shadow-md mb-4 mt-6 ml-8 mr-6 bg-Primary">
                        <p className="text-base text-Text">You don't have a store yet.</p>
                        <p className="text-base text-Text">Create a store to start selling your products.</p>
                        <button
                            onClick={() => navigate('/seller/store')}
                            className="bg-Secondary text-Primary py-2 px-4 rounded">
                            Go to Store
                        </button>
                    </div>
                )}
            </div>
            <div className="lg:w-1/4 p-2 mt-20 lg:mt-16">
                {storeName && (
                    <div className="rounded-sm p-8 shadow-md mb-4 bg-Primary flex items-center justify-between h-40">
                        <div className='mr-auto'>
                        <CiShoppingCart className='text-6xl text-Variant'/>

                        </div>
    
                        <div>
                            <p className="text-lg text-Text">Total Products</p>
                            <p className="text-2xl font-bold text-Text">{totalProducts.length}</p>
                        </div>


                    </div>
                )}
            </div>
        </div>
    );
};