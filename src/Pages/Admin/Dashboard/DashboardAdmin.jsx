/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  LiaStoreAltSolid,
  LiaShoppingCartSolid,
  LiaUsersSolid,
  LiaFileAltSolid,
  LiaHandHoldingUsdSolid,
  LiaMoneyBillSolid,
  LiaFileContractSolid,
  LiaBellSolid,
} from "react-icons/lia";
import bg from "../../../assets/admin.png";
import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export const DashboardAdmin = () => {
  const users = [
    { role: "buyer" },
    { role: "seller" },
    { role: "buyer" },
    { role: "deliverer" },
    { role: "buyer" },
    { role: "seller" },
  ];

  const complaints = [
    { status: "resolved" },
    { status: "rejected" },
    { status: "resolved" },
  ];

  const customersByCountry = {
    USA: 150,
    Canada: 80,
    UK: 60,
    Australia: 40,
    Germany: 30,
  };

  const recentOrders = [
    { id: 1, date: "2023-05-01", location: "New York", status: "Pending", deliveryStatus: "Dispatched", price: "$100", paymentId: "PAY123" },
    { id: 2, date: "2023-05-02", location: "London", status: "Completed", deliveryStatus: "Delivered", price: "$200", paymentId: "PAY124" },
    { id: 3, date: "2023-05-03", location: "Berlin", status: "Pending", deliveryStatus: "Processing", price: "$150", paymentId: "PAY125" },
  ];

  const salesData = {
    months: ["January", "February", "March", "April", "May"],
    sales: [1500, 2300, 3200, 2900, 3300],
    revenue: [4500, 6800, 9600, 8700, 9900],
    totalSales: 15000,
    netIncome: 30000,
    contracts: 45,
    notifications: 10,
  };

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

  const salesChartData = {
    labels: salesData.months,
    datasets: [
      {
        label: 'Monthly Sales',
        data: salesData.sales,
        backgroundColor: '#36a2eb',
        borderColor: '#36a2eb',
        fill: false,
      },
    ],
  };

  const revenueChartData = {
    labels: salesData.months,
    datasets: [
      {
        label: 'Monthly Revenue',
        data: salesData.revenue,
        backgroundColor: '#ff6384',
        borderColor: '#ff6384',
        fill: false,
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
            className="w-full max-w-md mx-auto hidden sm:block lg:hidden"
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
                <p className="text-center">{salesData.totalSales}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaHandHoldingUsdSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">
                  Net Income
                </h2>
                <p className="text-center">${salesData.netIncome}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaFileContractSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">
                  Contracts
                </h2>
                <p className="text-center">{salesData.contracts}</p>
              </div>
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex gap-2 md:gap-4 justify-center items-center w-full">
              <LiaBellSolid className="w-8 md:w-16 h-8 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold">
                  Notifications
                </h2>
                <p className="text-center">{salesData.notifications}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-2 md:p-4 shadow-md rounded-md flex flex-col gap-4 hidden lg:block">
              <h2 className="text-center text-Text font-semibold">
                Users by Role
              </h2>
              <Pie data={userChartData} />
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex flex-col gap-4 hidden lg:block">
              <h2 className="text-center text-Text font-semibold">
                Complaints Status
              </h2>
              <Doughnut data={complaintChartData} />
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex flex-col gap-4 hidden lg:block">
              <h2 className="text-center text-Text font-semibold">
                Customers by Country
              </h2>
              <Bar data={customerChartData} />
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex flex-col gap-4 hidden lg:block">
              <h2 className="text-center text-Text font-semibold">
                Monthly Sales
              </h2>
              <Line data={salesChartData} />
            </div>
            <div className="p-2 md:p-4 shadow-md rounded-md flex flex-col gap-4 hidden lg:block">
              <h2 className="text-center text-Text font-semibold">
                Monthly Revenue
              </h2>
              <Line data={revenueChartData} />
            </div>
          </div>
          <div className="hidden lg:block">
            <h2 className="text-center text-Text font-semibold">
              Recent Orders
            </h2>
            <div className="p-2 md:p-4 shadow-md rounded-md flex flex-col gap-4">
              <table className="min-w-full text-xs md:text-sm lg:text-base">
                <thead>
                  <tr className="text-left bg-gray-200">
                    <th className="p-2">Order ID</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Location</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Delivery Status</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Payment ID</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200">
                      <td className="p-2">{order.id}</td>
                      <td className="p-2">{order.date}</td>
                      <td className="p-2">{order.location}</td>
                      <td className="p-2">{order.status}</td>
                      <td className="p-2">{order.deliveryStatus}</td>
                      <td className="p-2">{order.price}</td>
                      <td className="p-2">{order.paymentId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
