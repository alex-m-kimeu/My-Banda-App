import React, { useEffect, useState } from 'react'
import { SingleOrder } from './SingleOrder';
import { NavLink } from 'react-router-dom';


export const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  // get orders
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://my-banda.onrender.com/orders", {
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
        console.log(data)
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
      });
  }, []);

  function handleDelete(id) {
    const newOrder = orders.filter((order) => order.id !== id);
    setOrders(newOrder);
  }

  return (
    <div className="flex flex-col gap-[20px] px-[20px] md:px-[40px] lg:px-[120px] py-[20px]">
      {orders.length > 0 ? (
        <div>
          <div className=" ">
            <h1 className="text-xl md:text-2xl font-bold text-Text">
              My Orders
            </h1>
            <div className='grid md:grid-cols-2  grid-cols-1'>
              {orders.map((order) => {
                return <SingleOrder key={order.id} order={order} handleDelete={handleDelete} />
              })}
            </div>

          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between ">
            <h1 className="text-xl md:text-2xl font-bold text-Text">
              No Orders Made
            </h1>
            <NavLink to="/buyer/home">
              <button className="border text-sm md:text-base border-gray-300 p-1 md:p-2 rounded hover:bg-Secondary hover:text-white">
                Explore Shop
              </button>
            </NavLink>
          </div>
          <div className="flex justify-center">
            <img
              src='https://rsrc.easyeat.ai/mweb/no-orders2.webp'
              alt="cart"
              className=" w-96 lg:h-80 lg:w-80 mt-5 "
            />
          </div>
        </div>
      )}
    </div>
  )
}


