import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BsAlexa, BsPersonVcard } from "react-icons/bs";
import { CiMenuKebab, CiTimer } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { IoIosFlash } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import OrderComponent1 from "./ordercomponent";
import { SellerDashboard } from "./SellerDashboard";

Chart.register(...registerables);

export const SellerDash = () => {
  const [storeName, setStoreName] = useState("");
  const [totalProducts, setTotalProducts] = useState([]);
  const [seller, setSeller] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetchSeller(token, userId);
  }, []);

  const fetchSeller = (token, userId) => {
    fetch(`https://my-banda.onrender.com/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSeller(data.username);
        setStoreName(data.store.store_name);
        setTotalProducts(data.store.products);

        const categories = data.store.products.reduce((acc, product) => {
          acc[product.category_name] = (acc[product.category_name] || 0) + 1;
          return acc;
        }, {});
        setProductCategories(categories);
      })
      .catch((error) => console.error("Error:", error));
  };

  const chartData = {
    labels: Object.keys(productCategories),
    datasets: [
      {
        data: Object.values(productCategories),
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#20b2aa",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row bg-white">
      <section className="w-auto md:w-[70%] h-full">
        <div className="w-full flex items-center justify-between">
          <div className="text-black m-4 font-bold text-xl md:text-2xl"></div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <div>
            <SellerDashboard />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
          <div className="flex flex-col justify-between w-full md:w-auto h-48 bg-yellow-500 p-4 rounded-md">
            <div className="flex w-full items-center justify-between">
              <div>
                <BsAlexa className="text-4xl text-black" />
                $50,634.00
              </div>
              <div className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full">
                <CiMenuKebab />
              </div>
            </div>
            <div className="font-extrabold text-4xl sm:text-2xl md:text-lg lg:text-xl text-black">
              Sales
            </div>
            <div>
              <div className="text-black text-sm font-semibold">gfbgd</div>
            </div>
          </div>

          <div className="flex flex-col justify-between w-full md:w-auto h-48 bg-yellow-500 p-4 rounded-md">
            <div className="flex w-full items-center justify-between">
              <div>
                <FaUsers className="text-4xl text-black" />
                50+
              </div>
              <div className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full">
                <CiMenuKebab />
              </div>
            </div>
            <div className="font-extrabold text-4xl sm:text-2xl md:text-lg lg:text-xl text-black">
              Customers
            </div>
            <div>
              <div className="text-black text-sm font-semibold">trr</div>
            </div>
          </div>

          <div className="flex flex-col justify-between w-full md:w-auto h-48 bg-yellow-500 p-4 rounded-md">
            <div className="flex w-full items-center justify-between">
              <div>
                <IoIosFlash className="text-4xl text-black" />
                3500+
              </div>
              <div className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full">
                <CiMenuKebab />
              </div>
            </div>
            <div className="font-extrabold text-4xl sm:text-2xl md:text-lg lg:text-xl text-black">
              Orders
            </div>
            <div>
              <div className="text-black text-sm font-semibold">ffdbfbf</div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full md:w-auto h-48 bg-white shadow-md p-4 rounded-md">
            <div className="flex w-full items-center justify-between">
              <div>
                <BsPersonVcard className="text-4xl text-black" />
                -1000
              </div>
              <div className="flex items-center justify-center w-10 h-10 text-black bg-gray-300 rounded-full">
                <CiMenuKebab />
              </div>
            </div>
            <div className="font-extrabold text-4xl sm:text-2xl md:text-lg lg:text-xl text-black">
              Expenses
            </div>
            <div>
              <div className="text-black text-sm font-semibold">
                This Week card processing
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 m-4 w-auto">
          <div className="col-span-4 md:col-span-1 h-28 bg-yellow-500 rounded-md">
            <div className="flex flex-col justify-between p-4 h-full">
              <div className="font-semibold text-black">New Clients</div>
              <div className="flex items-center justify-between w-full">
                <div className="text-5xl sm:text-xl md:text-xl lg:text-5xl font-bold text-black">
                  +64
                </div>
                <div className="flex px-2 py-1 text-xs rounded-full bg-green-500 items-center justify-center text-green-900">
                  +69%
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-1 h-28 bg-yellow-500 rounded-md">
            <div className="flex flex-col justify-between p-4 h-full">
              <div className="font-semibold text-black">Invoice Overdue</div>
              <div className="flex items-center justify-between w-full">
                <div className="text-5xl font-bold text-black">9</div>
                <div className="flex px-2 py-1 text-xs rounded-full bg-red-500 items-center justify-center text-red-900">
                  19%
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-4">
          <OrderComponent1 />
        </div>
      </section>
      <section className="w-full md:w-[30%] h-full">
        <div className="flex flex-col m-4">
          <div className="hidden md:flex gap-4 items-center justify-end px-6 text-black">
            {/* Icons can be added here if needed */}
          </div>
          <div className="flex flex-col gap-6 p-4 m-4 rounded-md h-auto shadow-lg">
            <div>
              <div className="font-bold text-black">Formation status</div>
              <div className="text-xs font-bold text-black">In progress</div>
            </div>
            <div className="h-4 w-full bg-gray-200 rounded-lg">
              <div className="h-4 bg-yellow-500 w-[30%] rounded-lg"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-bold text-black">Estimated Processing</div>
              <div className="font-semibold text-black text-sm">
                4-5 business days
              </div>
            </div>
            <div>
              <button className="bg-gradient-to-tr from-yellow-500 to-black text-white p-4 w-full rounded-xl">
                View Status
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5 m-4">
            <h1 className="font-bold">Most Sold Items</h1>
            <div className="flex gap-4 items-center bg-gradient-to-tr from-black to-white text-white p-2 rounded-md w-full">
              <div className="flex items-center justify-center rounded-full w-8 h-8 bg-white">
                <CiTimer className="text-black" />
              </div>
              <div>
                <div className="font-semibold text-sm">Run payroll</div>
                <div className="text-xs">March 7th at 4:50 PM</div>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-gradient-to-tr from-black to-white text-white p-2 rounded-md w-full">
              <div className="flex items-center justify-center rounded-full w-8 h-8 bg-white">
                <CiTimer className="text-black" />
              </div>
              <div>
                <div className="font-semibold text-sm">Run payroll</div>
                <div className="text-xs">March 7th at 4:50 PM</div>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-gradient-to-tr from-black to-white text-white p-2 rounded-md w-full">
              <div className="flex items-center justify-center rounded-full w-8 h-8 bg-white">
                <CiTimer className="text-black" />
              </div>
              <div>
                <div className="font-semibold text-sm">Run payroll</div>
                <div className="text-xs">March 7th at 4:50 PM</div>
              </div>
            </div>
            <div className="flex gap-4 items-center bg-gradient-to-tr from-black to-white text-white p-2 rounded-md w-full">
              <div className="flex items-center justify-center rounded-full w-8 h-8 bg-white">
                <CiTimer className="text-black" />
              </div>
              <div>
                <div className="font-semibold text-sm">Run payroll</div>
                <div className="text-xs">March 7th at 4:50 PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
