/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  LiaStoreAltSolid,
  LiaShoppingCartSolid,
  LiaUsersSolid,
  LiaFileAltSolid,
  LiaHandHoldingUsdSolid,
  LiaMoneyBillSolid,
  LiaFileContractSolid,
} from "react-icons/lia";
import bg from "../../../assets/admin.png";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const DashboardAdmin = () => {
  const [users, setUsers] = useState([
    { role: "buyer" },
    { role: "buyer" },
    { role: "seller" },
    { role: "buyer" },
    { role: "deliverer" },
    { role: "seller" },
  ]);
  const [complaints, setComplaints] = useState([
    { status: "resolved" },
    { status: "rejected" },
    { status: "resolved" },
    { status: "rejected" },
  ]);
  const [customersByCountry, setCustomersByCountry] = useState({
    USA: 10,
    UK: 5,
    Canada: 3,
    Australia: 2,
    India: 8,
  });

  const totalSales = 120;
  const netIncome = 30000;
  const contracts = 15;

  const nonAdminUsers = users.filter((user) => user.role !== "admin");
  const sellers = users.filter((user) => user.role === "seller");
  const buyers = users.filter((user) => user.role === "buyer");
  const deliverers = users.filter((user) => user.role === "deliverer");

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "resolved"
  );
  const rejectedComplaints = complaints.filter(
    (complaint) => complaint.status === "rejected"
  );

  const userChartData = {
    labels: ["Buyers", "Sellers", "Deliverers"],
    datasets: [
      {
        data: [buyers.length, sellers.length, deliverers.length],
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  const complaintChartData = {
    labels: ["Resolved", "Rejected"],
    datasets: [
      {
        data: [resolvedComplaints.length, rejectedComplaints.length],
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  };

  const customerChartData = {
    labels: Object.keys(customersByCountry),
    datasets: [
      {
        data: Object.values(customersByCountry),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#36a2eb",
        ],
      },
    ],
  };

  return (
    <div className="p-4 space-y-4 text-xs sm:text-sm md:text-base">
      <h1 className="text-Text font-bold text-xl text-center lg:text-left">
        Dashboard
      </h1>
      <div className="flex flex-col lg:flex-row justify-between lg:justify-normal gap-4 lg:gap-16">
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="flex items-center justify-between p-4 shadow-md rounded-md">
            <div className="flex flex-col gap-4">
              <h2 className="text-center text-Text font-semibold">
                Welcome to My Banda
              </h2>
              <h3 className="text-center text-Secondary font-normal">Admin</h3>
            </div>
            <LiaStoreAltSolid className="fill-Secondary w-16 md:w-24 h-16 md:h-24 hidden sm:block" />
          </div>
          <img
            src={bg}
            alt="image"
            className="w-full max-w-md mx-auto hidden sm:block"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaUsersSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">Users</h2>
                <p className="text-center">{nonAdminUsers.length}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaFileAltSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">
                  Complaints
                </h2>
                <p className="text-center">{complaints.length}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaShoppingCartSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">Buyers</h2>
                <p className="text-center">{buyers.length}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaHandHoldingUsdSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">Sellers</h2>
                <p className="text-center">{sellers.length}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaMoneyBillSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">
                  Total Sales
                </h2>
                <p className="text-center">{totalSales}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaHandHoldingUsdSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">
                  Net Income
                </h2>
                <p className="text-center">${netIncome}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaFileContractSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">
                  Contracts
                </h2>
                <p className="text-center">{contracts}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 w-full max-w-2xl mx-auto">
            <div className="w-full lg:w-1/3 h-48 mt-5 lg:h-64">
              <Pie
                data={userChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div className="w-full lg:w-1/3 h-48 mt-5 lg:h-64">
              <Pie
                data={complaintChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div className="w-full lg:w-1/3 h-48 mt-5 lg:h-64">
              <Pie
                data={customerChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


