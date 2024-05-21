import React from "react";
import { useState, useEffect } from "react";
import { CartsList } from "./CartList";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import BuyerContext from "../BuyerContext/BuyerContext";

export const Buyercart = () => {
    const {products, setProducts}= useContext(BuyerContext)
//   const [products, setProducts] = useState([]);
  const [itemsCost, setItemsCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(0);
  const [clicked, setClicked] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5500//carts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);

        // setItemsCost(data[0].items_cost)
        // setTotal(data[0].total_cost)
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (buttonClicked) {
      const token = localStorage.getItem("token");

      fetch("http://127.0.0.1:5500//carts", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          setItemsCost(data[0].items_cost);
          setTotal(data[0].total_cost);
        })
        .catch((error) => console.error(error));
    }
  }, [buttonClicked, clicked]);

  //    Delete cart product
  function handleDelete(id) {
    const newProduct = products.filter((user) => user.id !== id);
    setProducts(newProduct);
  }

  return (
    <div className="p-5 px-20">
      {loading ? (
        <p className="text-lg md:text-xl text-Heading dark:text-primary-light">
          Loading...
        </p>
      ) : (
        <div>
          {products.length > 0 ? (
            <div>
              <div className="flex  h-auto font">
                <div className="relative overflow-x-auto w-full">
                  <div className="flex justify-between">
                    <h1 className="text-2xl font-body font-medium">Cart</h1>
                    <NavLink to="/buyer/home">
                      <button className="border border-gray-300 px-5 py-2 rounded hover:border-none hover:bg-Secondary">
                        Continue Shopping
                      </button>
                    </NavLink>
                  </div>
                  <CartsList
                    products={products}
                    onDelete={handleDelete}
                    setClicked={setClicked}
                    setButtonClicked={setButtonClicked}
                  />
                </div>
              </div>
              <div className="">
                <div className="flex justify-between px-4 ">
                    
                  <div className="hidden md:block ">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="focus:border-Secondary border px-4 py-2 mr-4 rounded border-gray-300"
                    />
                    <button className="bg-Secondary text-white px-6 py-2 rounded">
                      Apply Coupon
                    </button>
                  </div>
                  <div className="  border rounded border-gray-300 p-3 px-5 py-5 md:w-80 divide-y w-full">
                    <div className="flex justify-between"><h2 className="text-lg font-semibold ">Cart Total</h2>    <button className="text-white px-6 py-2 mt-5 bg-Secondary rounded">

                        Get Total
                      </button> </div>
                    <div className="flex justify-between py-3">
                      <p>Subtotal: </p>
                      <span> {itemsCost} </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <p>Shipping: </p>
                      <span> 200 </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <p>Total: </p>
                      <span> {total}</span>
                    </div>
                    <div className="flex justify-center">
                      <button className="text-white px-6 py-2 mt-5 bg-Secondary rounded">
                        {" "}
                        Process to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between ">
                <h1 className="text-lg md:text-xl lg:text-2xl font-body font-medium">
                  Cart
                </h1>
                <NavLink to="/buyer/home">
                  <button className="border text-xs  border-gray-300 px-5 py-2 rounded hover:border-none hover:bg-Secondary">
                    Explore Shop
                  </button>
                </NavLink>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://www.adasglobal.com/img/empty-cart.png"
                  alt=""
                  className=" w-full lg:h-80 lg:w-80 mt-5 "
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
