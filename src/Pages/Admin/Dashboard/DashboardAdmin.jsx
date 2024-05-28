

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
} from "react-icons/lia";
import bg from "../../../assets/admin.png";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FaLongArrowAltRight } from "react-icons/fa"
import { FaArrowTrendUp } from "react-icons/fa6";
import { UsersAdmin } from "../Users/UsersAdmin";


Chart.register(...registerables);

export const DashboardAdmin = () => {
  const [users, setUsers] = useState([  ]);
  const [complaints, setComplaints] = useState([ ]);
  const [customersByCountry, setCustomersByCountry] = useState({
    Nairobi: 10,
    Nakuru: 5,
    Kisumu: 3,
    Moambasa: 2,
    Eldoret: 8,
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
        backgroundColor: ["#E9D66B", "#FFBA00", "#CCA01D"],
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
          "#CCA01D",
          "#FFE4B5",
          "#FFBA00",
          "#F5F5DC",
          "#E9D66B",
        ],
      },
    ],
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("https://my-banda.onrender.com/users", {
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

    fetch("https://my-banda.onrender.com/complaints", {
          headers: {
            'Authorization': 'Bearer ' + token,
          }
    })
        .then(res => res.json())
        .then(data => {
            setComplaints(data);
        });
},[]);




    return (
      <div>
        <div className="p-4 space-y-4">
            <h1 className="text-Text font-bold text-xl text-center lg:text-left">Admin Dashboard</h1>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="grid  w-full h-32 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-4 space-y-4 md:space-y-0">
                    <div className="p-4 shadow-boxShadow shadow rounded-md  gap-4 justify-center items-center bg-Primary">
                       <div className="flex gap-3">
                       <LiaUsersSolid className="w-10 h-10 fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-sm md:text-base "> Total Users</h2>
                            <p className="text-center text-2xl font-semibold">{nonAdminUsers.length}</p>
                        </div>

                       </div>
                   
                         <div className="flex space-x-1">
                         <FaArrowTrendUp  className="mr-1 text-green-500"/> 
                         <div  className=" text-green-500">36.9%</div>
                          <div className="font-light text-xs mt-1 text-gray-600">+5 today</div>
                         </div>
                      
                       <div className="border mt-3 "></div>
                       <div className="mt-3 text-xs flex "> Veiw All Users <FaLongArrowAltRight className="ml-2 text-Secondary" /></div>

                    </div>
                    <div className="p-4 shadow-boxShadow shadow rounded-md  gap-4 justify-center items-center bg-Primary">
                       <div className="flex gap-3">
                       <LiaUsersSolid className="w-10 h-10 fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-sm md:text-base "> Deliverers</h2>
                            <p className="text-center text-2xl font-semibold">{deliverers.length}</p>
                        </div>

                       </div>
                   
                         <div className="flex space-x-1">
                         <FaArrowTrendUp  className="mr-1 text-green-500"/> 
                         <div  className=" text-green-500">17.9%</div>
                          <div className="font-light text-xs mt-1 text-gray-600">+1 today</div>
                         </div>
                      
                       <div className="border mt-3 "></div>
                       <div className="mt-3 text-xs flex "> Veiw All deliverers <FaLongArrowAltRight className="ml-2 text-Secondary" /></div>

                    </div>


                    <div className="p-4 shadow-boxShadow shadow rounded-md  gap-4 justify-center items-center bg-Primary">
                       <div className="flex gap-3">
                       <LiaUsersSolid className="w-10 h-10 fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-sm md:text-base "> Buyers</h2>
                            <p className="text-center text-2xl font-semibold">{buyers.length}</p>
                        </div>

                       </div>
                   
                         <div className="flex space-x-1">
                         <FaArrowTrendUp  className="mr-1 text-green-500"/> 
                         <div  className=" text-green-500">100%</div>
                          <div className="font-light text-xs mt-1 text-gray-600">+1 today</div>
                         </div>
                      
                       <div className="border mt-3 "></div>
                       <div className="mt-3 text-xs flex "> Veiw All Buyers<FaLongArrowAltRight className="ml-2 text-Secondary" /></div>

                    </div>

                    <div className="p-4 shadow-boxShadow shadow rounded-md  gap-4 justify-center items-center bg-Primary">
                       <div className="flex gap-3">
                       <LiaUsersSolid className="w-10 h-10 fill-Text" />
                        <div>
                            <h2 className="text-center text-Text font-semibold text-sm md:text-base "> Sellers</h2>
                            <p className="text-center text-2xl font-semibold">{sellers.length}</p>
                        </div>

                       </div>
                   
                         <div className="flex space-x-1">
                         <FaArrowTrendUp  className="mr-1 text-green-500"/> 
                         <div  className=" text-green-500">45.9%</div>
                          <div className="font-light text-xs mt-1 text-gray-600">+3 today</div>
                         </div>
                      
                       <div className="border mt-3 "></div>
                       <div className="mt-3 text-xs flex "> Veiw All Sellers <FaLongArrowAltRight className="ml-2 text-Secondary" /></div>

                    </div>   
                </div>
        
            </div>

            <div>

            </div>
      
          </div>
          <div className="flex flex-co lg:flex-row items-center gap-2 lg:gap-4 w-full mt-10  content-around  mx-auto ">
            <div className="w-full lg:w-1/3 h-48 mt-5 lg:h-64">
              <Pie
                data={userChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          
            <div className="w-full lg:w-1/3 h-48 mt-5 lg:h-64">
              <Pie
                data={customerChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
            <div className="">
         

            </div>

            <div>
<div className="p-2 md:p-4 shadow  shadow-boxShadow rounded-md gap-2 md:gap-4 justify-center items-center w-72">
  
              <div className="flex">
              <LiaMoneyBillSolid className="w-2 md:w-28 h-4 md:h-16 fill-Text mr-4" />
              <div>
                <h2 className="text-center text-Text font-semibold ">
                  Total Sales
                </h2>
                <p className="text-center text-2xl font-semibold">{totalSales}</p>
              </div>
              </div>
            <p className="text-center text-gray-500 text-xs"> 12% Sales  88% Marked</p>
            </div>
            <div className="p-2 md:p-4 shadow shaoe-boxShadow rounded-md gap-2 md:gap-4 justify-center items-center w-full">
  
              <div className="flex">
              <LiaHandHoldingUsdSolid  className="w-2 md:w-28 h-4 md:h-16 fill-Text" />
              <div>
                <h2 className="text-center text-Text font-semibold ">
                  Net Income
                </h2>
                <p className="text-center text-2xl font-semibold">$ {netIncome}</p>
              </div>
              </div>
            <p className="text-center text-gray-500 mt-4 text-xs"> 12% Sales  88% Marked</p>
            </div>



<div className="p-2 md:p-4 shadow shaoe-boxShadow rounded-md gap-2 md:gap-4 justify-center items-center w-full">
  
  <div className="flex">
  <LiaFileContractSolid  className="w-2 md:w-28 h-4 md:h-16 fill-Text" />
  <div>
    <h2 className="text-center text-Text font-semibold ">
      Contracts
    </h2>
    <p className="text-center text-2xl font-semibold">$ 15</p>
  </div>
  </div>
<p className="text-center text-gray-500 mt-4 text-xs"> 12% Sales  88% Marked</p>
</div>
            
          </div>
          </div>
          <h1 className="text-Text font-bold text-xl text-center lg:text-left ml-2">Recent</h1>
        <UsersAdmin/>
     
        </div>
    );
}

