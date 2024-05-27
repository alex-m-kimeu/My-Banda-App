import { useState, useEffect, useContext } from "react";
import { CartsList } from "./CartList";
import { NavLink, useNavigate } from "react-router-dom";
import BuyerContext from "../BuyerContext/BuyerContext";
import cart from "../../../assets/cart.png";
import { LiaArrowLeftSolid } from "react-icons/lia";

export const Buyercart = () => {
  const { products, setProducts } = useContext(BuyerContext)
  const [itemsCost, setItemsCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(0);
  const [clicked, setClicked] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://my-banda.onrender.com/carts", {
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
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);


  function handleDelete(id) {
    const newProduct = products.filter((user) => user.id !== id);
    setProducts(newProduct);
  }

  const handleGetTotal =()=>{
    const token = localStorage.getItem("token");

    fetch("https://my-banda.onrender.com/carts", {
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
        setProducts(data);
        setItemsCost(data[0].items_cost);
        setTotal(data[0].total_cost);
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }

  const handleChooseDelivery = ()=>{
    const token = localStorage.getItem("token");

    fetch("https://my-banda.onrender.com/orders", {
      method: "POST",
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
      navigate('/buyer/deliverer')
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }

  return (
    <div className="flex flex-col gap-[20px] px-[20px] md:px-[40px] lg:px-[120px] py-[20px]">
      <div>
        {products.length > 0 ? (
          <div className="space-y-10">
            <div className="flex h-auto">
              <div className="relative overflow-x-auto w-full">
                <div className="flex items-center gap-[2px]">
                  <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate('/buyer/home')}>
                    <LiaArrowLeftSolid className="fill-Secondary" />
                    <p className="text-normal text-Secondary text-base">Back</p>
                  </div>
                  <div className="text-Secondary mx-1">/</div>
                  <h1 className="text-xl md:text-2xl font-bold text-Text">Cart</h1>
                </div>
                <CartsList
                  products={products}
                  onDelete={handleDelete}
                  // setClicked={setClicked}
                  // setButtonClicked={setButtonClicked}
                />
              </div>
            </div>
            <div className="flex justify-end">
                  <div >
                    <button onClick={()=>handleGetTotal()} className="border px-5 py-2 mr-4 rounded bg-Secondary bg-opacity-40">Get Total Item Cost</button>
                  </div>
                </div>
            <div>
              <div className="flex justify-between px-4 ">
                
                <div className="hidden md:block ">
                  
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="border px-4 py-2 mr-4 rounded border-gray-300 outline-none text-base text-Variant2"
                  />
                  <button className="bg-Secondary text-white px-6 py-2 rounded">
                    Apply Coupon
                  </button>
                </div>
                
                <div className=" border rounded border-gray-300 p-3 px-5 py-5 md:w-80 divide-y w-full">
                  <h2 className="text-lg font-semibold text-end text-Text">Cart Total:</h2>
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
                    <button className="text-white px-6 py-2 mt-5 bg-Secondary rounded" onClick={handleChooseDelivery}>
                      {" "}
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between ">
              <h1 className="text-xl md:text-2xl font-bold text-Text">
                Cart
              </h1>
              <NavLink to="/buyer/home">
                <button className="border text-sm md:text-base border-gray-300 p-1 md:p-2 rounded hover:bg-Secondary hover:text-white">
                  Explore Shop
                </button>
              </NavLink>
            </div>
            <div className="flex justify-center">
              <img
                src={cart}
                alt="cart"
                className=" w-full lg:h-80 lg:w-80 mt-5 "
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};