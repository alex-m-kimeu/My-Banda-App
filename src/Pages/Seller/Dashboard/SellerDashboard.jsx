import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import adminImage from '../../../assets/admin.png';
import { LiaStoreAltSolid } from "react-icons/lia";
import { LiaShoppingCartSolid } from "react-icons/lia";
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
        <div className="py-[20px] space-y-4">
            <h1 className="text-Text font-bold text-xl text-center lg:text-left">Dashboard</h1>
            <div className="flex flex-col md:flex-row justify-between lg:justify-normal gap-[40px] lg:gap-[200px]">
                <div className="flex flex-col gap-[40px] md:gap-[80px]">
                    {storeName ? (
                        <>
                            <div className="flex items-center justify-between p-[20px] shadow-md rounded-[5px]">
                                <div className="flex flex-col gap-[15px]">
                                    <h1 className="text-center text-Text font-semibold text-base">Welcome to {storeName}</h1>
                                    <p className="text-center text-Secondary font-normal">{seller}</p>
                                </div>
                                <LiaStoreAltSolid className="fill-Secondary w-[100px] md:w-[150px] h-[100px] md:h-[150px]" />
                            </div>
                            <img src={adminImage} alt='Admin' className="w-auto lg:w-[400px]" />
                        </>
                    ) : (
                        <div className="rounded-md p-6 shadow-md bg-primary flex flex-col gap-4 justify-start items-center max-w-lg mx-auto">
                            <p className="text-lg text-text font-semibold">You don't have a store yet.</p>
                            <p className="text-base text-text">Create a store to start selling your products.</p>
                            <button
                                onClick={() => navigate('/seller/store')}
                                className="bg-Secondary text-Primary py-2 px-4 rounded-md text-base font-medium">
                                Go to Store
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    {storeName && (
                        <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px] w-[200px] h-[100px] justify-center items-center">
                            <LiaShoppingCartSolid className="w-[50px] md:w-[80px] h-[50px] md:h-[80px] fill-Text" />
                            <div>
                                <h2 className="text-center text-Text font-bold text-sm md:text-base">Total Products</h2>
                                <p className="text-center text-sm font-normal">
                                    {totalProducts.length}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};