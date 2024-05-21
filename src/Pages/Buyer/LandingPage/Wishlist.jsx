/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import BuyerContext from "../BuyerContext/BuyerContext";
import { NavLink } from "react-router-dom";



export const Wishlist = () => {
  // const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const{ handleAddToCart,wishlistItems, setWishlistItems}=useContext(BuyerContext)

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5500/wishlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setWishlistItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching wishlist items:", error);
      });
  }, []);

  const handleDeleteFromWishlist= (productId) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5500/wishlists/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      handleDelete(productId);
  })
      .catch((error) => {
        console.error("Error deleting item from wishlist:", error);
      });
  };

  //    Delete cart product
  function handleDelete(id) {
    const newProduct = wishlistItems.filter((item) => item.products.id !== id);
    setWishlistItems(newProduct);
  }

  return (
    <div className="p-5 lg:px-20 md:px-10 sm:px-3">
      {loading ? (
     <div>
          <div className="flex justify-between ">
        <h1 className="text-lg md:text-xl lg:text-2xl font-body font-medium">
          Wishlist
        </h1>
        <NavLink to="/buyer/home">
          <button className="border text-xs  border-gray-300 px-5 py-2 rounded hover:border-none hover:bg-Secondary">
            Explore Shop
          </button>
        </NavLink>
      </div>
      <div className="flex justify-center">
        <img
          src="https://i.pinimg.com/564x/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.jpg"
          alt=""
          className=" h-80 w-80 mt-5 "
        />
      </div>
     </div>
    // <div>loading</div>
      ) : (
        <div>
          {wishlistItems.length > 1 || wishlistItems !== null ? (
            <div className="text-Text font-body min-h-screen  p-5 px-20 md:px-10 sm:px-2">
              <div className="flex justify-between ">
                <h1 className="text-lg md:text-xl lg:text-2xl font-body font-medium">Wishlist</h1>
                <button
                 className="border text-xs  border-gray-300 px-5 py-2 rounded hover:border-none hover:bg-Secondary"
                  onClick=""
                >
                  Add All To Cart
                </button>
              </div>
              <div className=" flex flex-wrap gap-6 justify-center lg:justify-start md:justify-start">
                {wishlistItems.map((item) => (
                  <div key={item.products.id} className=" relative  w-64 ">
                    <img
                      src={
                        item.products.images && item.products.images.length > 0
                          ? item.products.images[0]
                          : ""
                      }
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-t"
                    />
                    <button
                      className="bg-black text-white rounded-b p-2 w-full hover:text-Secondary active:text-yellow-600"
                      onClick={()=> handleAddToCart(item.product_id)}
                    >
                      Add To Cart
                    </button>
                    <div className="px-3 p-2 flex justify-between">
                      <div>
                        <p className="text-lg font-semibold">
                          {item.products.title}
                        </p>
                        <p className="  text-Secondary">${item.products.price}</p>
                      </div>
                      <button
                        className="bg-gray-100 hover:bg-Secondary hover:bg-opacity-70 active:bg-Secondary bg-opacity-20 text-Primary rounded p-1 absolute top-3 right-3"
                        onClick={()=> handleDeleteFromWishlist(item.product_id)}
                      >
                        <FaTrash className="inline-block " />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
               <div>
          <div className="flex justify-between ">
        <h1 className="text-lg md:text-xl lg:text-2xl font-body font-medium">
          Wishlist
        </h1>
        <NavLink to="/buyer/home">
          <button className="border text-xs  border-gray-300 px-5 py-2 rounded hover:border-none hover:bg-Secondary">
            Explore Shop
          </button>
        </NavLink>
      </div>
      <div className="flex justify-center">
        <img
          src="https://i.pinimg.com/564x/f6/e4/64/f6e464230662e7fa4c6a4afb92631aed.jpg"
          alt=""
          className=" h-80 w-80 mt-5 "
        />
      </div>
     </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
