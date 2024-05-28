import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // get orders
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://my-banda.onrender.com/storeorders", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
        setLoading(false);
      });
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
      <div className="p-4 sm:p-6 w-full lg:w-[calc(100%-36px)] mx-auto ">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center sm:text-left mb-4 sm:mb-0">
            Manage Orders
          </h1>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <span className="text-gray-500">Last 30 days</span>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Order date (descending)
            </button>
          </div>
        </div>

        {loading ? (
          <div className=" flex justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-Secondary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {orders.length > 0 ? (
              <div>
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="px-4 py-2 border rounded w-full sm:w-auto"
                >
                  <option value="All">All Orders</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <table className="w-full table-auto mt-4">
                  <thead className="hidden sm:table-header-group">
                    <tr className="text-left border-b">
                      <th className="p-4">#</th>
                      <th className="p-4">Date/Time</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Delivery Status</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Payment ID</th>
                      <th className="p-4">Action</th>
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
                        <td className="p-4">{order.quantity}</td>
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
                        <td className="p-4">{order.payment_id}</td>
                        <td className="p-4 flex space-x-2">
                          <button
                            onClick={() => navigateToOrderForm(order)}
                            className="px-3 py-1 bg-Secondary text-white rounded border border-Secondary hover:bg-white hover:text-black hover:border-black"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <div className="flex justify-center">
                  <p className="text-lg font-semibold ">
                    You do not have any orders :({" "}
                  </p>
                </div>
                <div className="flex justify-center ">
                  <img
                    src="https://elements-cover-images-0.imgix.net/41ce1856-ce64-47eb-9cc9-d50c75ba936b?auto=compress%2Cformat&w=900&fit=max&s=ba27396ca2b150afd778262eed2ec8af"
                    alt=""
                    className="h-96 "
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderComponent;
