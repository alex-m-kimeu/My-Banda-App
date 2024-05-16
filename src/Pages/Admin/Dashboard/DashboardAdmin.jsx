import { useEffect, useState } from "react";
import { LiaStoreAltSolid } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SlUser } from "react-icons/sl";
import { AiOutlineDollar } from "react-icons/ai";
import { GoReport } from "react-icons/go";
import bg from "../../../assets/admin.png"

export const DashboardAdmin = () => {
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
    },[]);

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
    },[]);

    const nonAdminUsers = users.filter(user => user.role !== 'admin');
    const sellers = users.filter(user => user.role === 'seller');
    const buyers = users.filter(user => user.role === 'buyer');

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="flex gap-[200px]">
                <div className="flex flex-col gap-[80px]">
                    <div className="flex items-center gap-[40px] p-[20px] shadow-md rounded-[5px]">
                        <div className="flex flex-col gap-[15px]">
                            <h2 className="text-center text-Text font-semibold text-base">Welcome to My Banda</h2>
                            <h3 className="text-center text-Secondary font-normal">Admin</h3>
                        </div>
                        <LiaStoreAltSolid className="fill-Secondary w-[150px] h-[150px]" />
                    </div>
                    <img src={bg} alt="image" className="w-[400px]" />
                </div>
                <div className="flex flex-col gap-[50px]">
                    <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px]">
                        <SlUser className="w-[100px] h-[100px] fill-Test" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-base">Users</h2>
                            <p className="text-center">
                                {nonAdminUsers.length}
                            </p>
                        </div>
                    </div>

                    <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px]">
                        <AiOutlineDollar className="w-[100px] h-[100px] fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-base">Sellers</h2>
                            <p className="text-center">
                                {sellers.length}
                            </p>
                        </div>
                    </div>

                    <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px]">
                        <MdOutlineShoppingCart className="w-[100px] h-[100px] fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-base">Buyers</h2>
                            <p className="text-center">
                                {buyers.length}
                            </p>
                        </div>
                    </div>

                    <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px]">
                        <GoReport className="w-[100px] h-[100px] fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-base">Complaints</h2>
                            <p className="text-center">
                                {complaints.length}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}