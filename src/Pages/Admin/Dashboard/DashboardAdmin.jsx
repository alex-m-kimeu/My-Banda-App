import { useEffect, useState } from "react";
import { LiaShoppingCartSolid, LiaUsersSolid, LiaFileAltSolid, LiaHandHoldingUsdSolid } from "react-icons/lia";
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
        <div className="p-4 space-y-4">
            <h1 className="text-Text font-bold text-xl text-center lg:text-left">Dashboard</h1>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4 space-y-4 md:space-y-0">
                    <div className="p-4 shadow-md rounded-md flex gap-4 justify-center items-center bg-Primary">
                        <LiaUsersSolid className="w-10 h-10 fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-sm md:text-base">Users</h2>
                            <p className="text-center">{nonAdminUsers.length}</p>
                        </div>
                    </div>
                    <div className="p-4 shadow-md rounded-md flex gap-4 justify-center items-center bg-Primary">
                        <LiaFileAltSolid className="w-10 h-10 fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-sm md:text-base">Complaints</h2>
                            <p className="text-center">{complaints.length}</p>
                        </div>
                    </div>
                    <div className="p-4 shadow-md rounded-md flex gap-4 justify-center items-center bg-Primary">
                        <LiaShoppingCartSolid className="w-10 h-10 fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-sm md:text-base">Buyers</h2>
                            <p className="text-center">{buyers.length}</p>
                        </div>
                    </div>
                    <div className="p-4 shadow-md rounded-md flex gap-4 justify-center items-center bg-Primary">
                        <LiaHandHoldingUsdSolid className="w-10 h-10 fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-sm md:text-base">Sellers</h2>
                            <p className="text-center">{sellers.length}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-6 w-full lg:w-1/2 mx-auto">
                    <div className="w-full">
                        <div className="h-64">
                            <Pie data={userChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="h-64">
                            <Pie data={complaintChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
