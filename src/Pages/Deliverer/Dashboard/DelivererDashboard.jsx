/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { jwtDecode } from 'jwt-decode';
import { Chart, registerables } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { MdDeliveryDining } from 'react-icons/md';

export const DelivererDashboard = () => {
    Chart.register(...registerables);
    const [companyName, setCompanyName] = useState('');
    const [totalDeliveries, setTotalDeliveries] = useState([]);
    const [deliverer, setDeliverer] = useState('');
    const [deliveryStatuses, setDeliveryStatuses] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
            return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        fetchDeliverer(token, userId);
    }, [navigate]);

    const fetchDeliverer = (token, userId) => {
        fetch(`https://my-banda.onrender.com/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setDeliverer(data.username);
                if (data.deliverycompany) {
                    setCompanyName(data.deliverycompany.name);
                    setTotalDeliveries(data.deliverycompany.deliveries);

                    const statuses = data.deliverycompany.deliveries.reduce((acc, delivery) => {
                        acc[delivery.status] = (acc[delivery.status] || 0) + 1;
                        return acc;
                    }, {});
                    setDeliveryStatuses(statuses);
                } else {
                    navigate('/deliverer/company');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    const chartData = {
        labels: Object.keys(deliveryStatuses),
        datasets: [{
            data: Object.values(deliveryStatuses),
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
                                <MdDeliveryDining className="fill-Secondary w-[100px] md:w-[150px] h-[100px] md:h-[150px]" />
                            </div>
                        </>
                    ) : (
                        <div className="rounded-md p-6 shadow-md bg-primary flex flex-col gap-4 justify-center items-center">
                            <p className="text-lg text-white">You need to create a company first!</p>
                            <button
                                onClick={() => navigate('/deliverer/company')}
                                className="text-lg bg-white text-primary px-4 py-2 rounded-md">
                                Go to Company
                            </button>
                        </div>
                    )}
                </div>
                {companyName && (
                    <div className="w-full md:w-[300px] lg:w-[400px]">
                        <Pie data={chartData} />
                    </div>
                )}
            </div>
        </div>
    );
};
