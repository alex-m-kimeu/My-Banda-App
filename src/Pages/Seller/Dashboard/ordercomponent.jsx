import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const OrderComponent1 = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.sub.id;

        const userResponse = await fetch(
          `https://my-banda.onrender.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();
        const storeId = userData.store.id;

        const ordersResponse = await fetch(
          `https://my-banda.onrender.com/orderByID/${userId}?store_id=${storeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders");
        }

        const ordersData = await ordersResponse.json();
        console.log("Fetched orders data:", ordersData);

        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else if (ordersData && typeof ordersData === "object") {
          setOrders([ordersData]);
        } else {
          console.error("Unexpected orders data format:", ordersData);
          throw new Error("Orders data is not an array or object");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchUserAndOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, filter]);

  const filterOrders = () => {
    if (filter === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === filter));
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const navigateToOrderForm = (order) => {
    navigate(`/seller/form/${order.id}`, { state: { order } });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-red-100 text-red-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:px-4">
      <div className="p-4 sm:p-6 w-full lg:w-[calc(100%-36px)] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
            Recent Orders
          </h1>
        </div>

        <table className="w-full table-auto mt-4">
          <thead className="hidden sm:table-header-group">
            <tr className="text-left border-b">
              <th className="p-4">Id</th>
              <th className="p-4">Date/Time</th>
              <th className="p-4 ">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Delivery Status</th>
              <th className="p-4">Price</th>
              <th className="p-4">Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 flex flex-col sm:table-row"
              >
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.created_at}</td>
                <td className="p-4 font-bold">{order.location}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-4">{order.delivery_status}</td>
                <td className="p-4">{order.price}</td>
                <td className="p-4 font-bold">{order.payment_id}</td>
                {/* <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => navigateToOrderForm(order)}
                    className="px-3 py-1 bg-Secondary text-white rounded border border-Secondary hover:bg-white hover:text-black hover:border-black"
                  >
                    Order Details
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderComponent1;
