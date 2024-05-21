import { useEffect, useState } from "react";
import { LiaStoreAltSolid } from "react-icons/lia";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { LiaUsersSolid } from "react-icons/lia";
import { LiaFileAltSolid } from "react-icons/lia";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import bg from "../../../assets/admin.png"
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

export const DashboardAdmin = () => {
    Chart.register(...registerables);
    const [users, setUsers] = useState([]);
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch("http://127.0.0.1:5500/users", {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch("http://127.0.0.1:5500/complaints", {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => {
                setComplaints(data);
            });
    }, []);

    const nonAdminUsers = users.filter(user => user.role !== 'admin');
    const sellers = users.filter(user => user.role === 'seller');
    const buyers = users.filter(user => user.role === 'buyer');
    const deliverers = users.filter(user => user.role === 'deliverer');

    const resolvedComplaints = complaints.filter(complaint => complaint.status === 'resolved');
    const rejectedComplaints = complaints.filter(complaint => complaint.status === 'rejected');

    const userChartData = {
        labels: ['Buyers', 'Sellers', 'Deliverers'],
        datasets: [{
            data: [buyers.length, sellers.length, deliverers.length],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
        }],
    };

    const complaintChartData = {
        labels: ['Resolved', 'Rejected'],
        datasets: [{
            data: [resolvedComplaints.length, rejectedComplaints.length],
            backgroundColor: ['#ff6384', '#36a2eb'],
        }],
    };

    return (
        <div className="p-[10px] space-y-4">
            <h1 className="text-Text font-bold text-xl text-center lg:text-left">Dashboard</h1>
            <div className="flex flex-col md:flex-row justify-between lg:justify-normal gap-[20px] lg:gap-[80px]">
                <div className="flex flex-col gap-[40px] md:gap-[80px]">
                    <div className="flex items-center justify-between p-[20px] shadow-md rounded-[5px]">
                        <div className="flex flex-col gap-[15px]">
                            <h2 className="text-center text-Text font-semibold text-base">Welcome to My Banda</h2>
                            <h3 className="text-center text-Secondary font-normal">Admin</h3>
                        </div>
                        <LiaStoreAltSolid className="fill-Secondary w-[100px] md:w-[150px] h-[100px] md:h-[150px]" />
                    </div>
                    <img src={bg} alt="image" className="w-[400px]" />
                </div>
                <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-row gap-[10px]">
                            <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px] w-[180px] h-auto justify-center items-center">
                                <LiaUsersSolid className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] fill-Text" />
                                <div>
                                    <h2 className="text-center text-Text font-semibold text-sm md:text-base">Users</h2>
                                    <p className="text-center">
                                        {nonAdminUsers.length}
                                    </p>
                                </div>
                            </div>
                            <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px] w-[180px] h-auto justify-center items-center">
                                <LiaFileAltSolid className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] fill-Text" />
                                <div>
                                    <h2 className="text-center text-Text font-semibold text-sm md:text-base">Complaints</h2>
                                    <p className="text-center">
                                        {complaints.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[10px]">
                            <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px] w-[180px] h-auto justify-center items-center">
                                <LiaShoppingCartSolid className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] fill-Text" />
                                <div>
                                    <h2 className="text-center text-Text font-semibold text-sm md:text-base">Buyers</h2>
                                    <p className="text-center">
                                        {buyers.length}
                                    </p>
                                </div>
                            </div>
                            <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px] w-[180px] h-auto justify-center items-center">
                                <LiaHandHoldingUsdSolid className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] fill-Text" />
                                <div>
                                    <h2 className="text-center text-Text font-semibold text-sm md:text-base">Sellers</h2>
                                    <p className="text-center">
                                        {sellers.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full max-w-xl mx-auto">
                        <div style={{ height: '300px', width: '300px' }}>
                            <Pie data={userChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                        <div style={{ height: '300px', width: '300px' }}>
                            <Pie data={complaintChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}