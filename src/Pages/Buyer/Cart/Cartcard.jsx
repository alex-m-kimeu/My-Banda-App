import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const Cartcard = ({ product, onDelete }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [subtotal, setSubtotal] = useState(product.subtotal);

  function handleDelete() {
    const token = localStorage.getItem("token");

    fetch(`https://my-banda.onrender.com/productdec/${product.products.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        onDelete(product.id);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation: ", error);
      });
  }

  const handleIncreaseQuantity = () => {
    const token = localStorage.getItem("token");

    fetch(`https://my-banda.onrender.com/productinc/${product.products.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((products) => {
        setQuantity(products.quantity);
        setSubtotal(products.subtotal);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDecreaseQuantity = () => {
    const token = localStorage.getItem("token");

    fetch(`https://my-banda.onrender.com/productdec/${product.products.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((products) => {
        setQuantity(products.quantity);
        setSubtotal(products.subtotal);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="mb-4">
      <div>
        <img
          src={
            product.products.images && product.products.images.length > 0
              ? product.products.images[0]
              : ""
          }
          alt={product.products.title}
          className="w-full h-[200px] object-cover"
        />
        <button
          onClick={handleDelete}
          className="bg-black flex justify-center w-full text-sm text-white py-2"
        >
          <MdDeleteOutline className="w-5 h-5 mr-2" /> Remove from Cart
        </button>
      </div>
      <div className="flex flex-col justify-between gap-1 px-2 mb-2">
        <h2 className="text-Text font-medium text-lg mt-1">
          {product.products.title}
        </h2>
        <div className="flex items-center justify-between">
          <p className="text-lg text-Secondary">$ {subtotal}</p>
          <div className="flex border h-10 rounded">
            <button className="">
              <MdOutlineKeyboardArrowLeft
                className="h-10 hover:text-Secondary "
                onClick={handleDecreaseQuantity}
              />
            </button>
            <div className="w-9 flex justify-center items-center">
              <p>{quantity}</p>
            </div>
            <button>
              <MdOutlineKeyboardArrowRight
                className="h-10 hover:text-Secondary "
                onClick={handleIncreaseQuantity}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
