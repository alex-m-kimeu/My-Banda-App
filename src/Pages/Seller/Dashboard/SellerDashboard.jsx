import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { LiaStoreAltSolid } from "react-icons/lia";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

export const SellerDashboard = () => {
  Chart.register(...registerables);
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
          "#FFD700",
          "#FFFFFF",
          "#000000",
          "#FFD700",
          "#FFFFFF",
        ],
      },
    ],
  };

  return (
    <div className="py-[20px] space-y-4">
      <h1 className="text-Text font-bold text-xl text-center lg:text-left">
        Dashboard
      </h1>
      <div className="flex flex-col md:flex-row justify-between lg:justify-normal gap-[40px] lg:gap-[200px]">
        <div className="flex flex-col gap-[40px] md:gap-[80px]">
          {storeName ? (
            <>
              <div className="flex items-center justify-between p-[20px] ml-4 shadow-md rounded-[5px] bg-yellow-500">
                <div className="flex flex-col gap-[15px]">
                  <h1 className="text-center text-Text font-semibold text-base">
                    Welcome to {storeName}
                  </h1>
                  <p className="text-center text-black  font-semibold ">
                    {seller}
                  </p>
                </div>
                {/* <LiaStoreAltSolid className="fill-Secondary w-[100px] md:w-[150px] h-[100px] md:h-[150px]" /> */}
              </div>
            </>
          ) : (
            <div className="rounded-md p-6 shadow-md bg-primary flex flex-col gap-4 justify-start items-center max-w-lg mx-auto">
              <p className="text-lg text-text font-semibold">
                You don't have a store yet.
              </p>
              <p className="text-base text-text">
                Create a store to start selling your products.
              </p>
              <button
                onClick={() => navigate("/seller/store")}
                className="bg-Secondary text-Primary py-2 px-4 rounded-md text-base font-medium"
              >
                Go to Store
              </button>
            </div>
          )}
        </div>
        {/* <div className='flex flex-col gap-[30px]'>
                    <div className="flex justify-center">
                        {storeName && (
                            <>
                                <div className="p-[10px] shadow-md rounded-[5px] flex gap-[10px] w-[200px] h-[90px] justify-center items-center">
                                    <LiaShoppingCartSolid className="w-[50px] md:w-[80px] h-[50px] md:h-[80px] fill-Text" />
                                    <div>
                                        <h2 className="text-center text-Text font-bold text-sm md:text-base">Total Products</h2>
                                        <p className="text-center text-sm font-normal">
                                            {totalProducts.length}
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex justify-center items-center w-full h-full p-4">
                        <div style={{ height: '350px', width: '350px' }}>
                            <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div> */}
      </div>
    </div>
  );
};
