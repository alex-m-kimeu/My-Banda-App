import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import adminImage from '../../assets/admin.png';
import { LiaStoreAltSolid, LiaShoppingCartSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

export const DelivererDashboard = () => {
    Chart.register(...registerables);
    const [companyName, setCompanyName] = useState('');
    const [totalDeliveries, setTotalDeliveries] = useState([]);
    const [deliverer, setDeliverer] = useState('');
    const [deliveryLocations, setDeliveryLocations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        fetchDeliverer(token, userId);
    }, []);

    const fetchDeliverer = (token, userId) => {
        fetch(`http://127.0.0.1:5500/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setDeliverer(data.username);
            setCompanyName(data.delivery_company.name);
            setTotalDeliveries(data.delivery_company.deliveries);

            const locations = data.delivery_company.deliveries.reduce((acc, delivery) => {
                acc[delivery.location] = (acc[delivery.location] || 0) + 1;
                return acc;
            }, {});
            setDeliveryLocations(locations);
        })
        .catch(error => console.error('Error:', error));
    };

    const chartData = {
        labels: Object.keys(deliveryLocations),
        datasets: [{
            data: Object.values(deliveryLocations),
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#20b2aa'],
        }]
    };

    return (
        <div className="py-[20px] space-y-4">
            <h1 className="text-Text font-bold text-xl text-center lg:text-left">Dashboard</h1>
            <div className="flex flex-col md:flex-row justify-between lg:justify-normal gap-[40px] lg:gap-[200px]">
                <div className="flex flex-col gap-[40px] md:gap-[80px]">
                    {companyName ? (
                        <>
                            <div className="flex items-center justify-between p-[20px] shadow-md rounded-[5px]">
                                <div className="flex flex-col gap-[15px]">
                                    <h1 className="text-center text-Text font-semibold text-base">Welcome to {companyName}</h1>
                                    <p className="text-center text-Secondary font-normal">{deliverer}</p>
                                </div>
                                <LiaStoreAltSolid className="fill-Secondary w-[100px] md:w-[150px] h-[100px] md:h-[150px]" />
                            </div>
                            <img src={adminImage} alt='Admin' className="w-auto lg:w-[400px]" />
                        </>
                    ) : (
                        <div className="rounded-md p-6 shadow-md bg-primary flex flex-col gap-4 justify-start items-center max-w-lg mx-auto">
                            <p className="text-lg text-text font-semibold">You don't have a delivery company yet.</p>
                            <p className="text-base text-text">Create a delivery company to start managing your deliveries.</p>
                            <button
                                onClick={() => navigate('/deliverer/company')}
                                className="bg-Secondary text-Primary py-2 px-4 rounded-md text-base font-medium">
                                Go to Company Setup
                            </button>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-[30px]'>
                    <div className="flex justify-center">
                        {companyName && (
                            <>
                                <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px] w-[200px] h-[90px] justify-center items-center">
                                    <LiaShoppingCartSolid className="w-[50px] md:w-[80px] h-[50px] md:h-[80px] fill-Text" />
                                    <div>
                                        <h2 className="text-center text-Text font-bold text-sm md:text-base">Total Deliveries</h2>
                                        <p className="text-center text-sm font-normal">
                                            {totalDeliveries.length}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex justify-center items-center w-full h-full p-4">
                        <div style={{ height: '350px', width: '350px' }}>
                            <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelivererDashboard;
