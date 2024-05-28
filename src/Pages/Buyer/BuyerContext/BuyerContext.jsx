import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const BuyerContext = createContext({});

export const BuyerProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartNum, setCartNum] = useState(0);
  const [wishlistNum, setWishlistNum] = useState(0);
  const [search, setSearch] = useState("");

  // Add to cart function
  const handleAddToCart = (id) => {
    const token = localStorage.getItem("token");

    fetch(`https://my-banda.onrender.com/products/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((product) => {
        setProducts((prev) => ({ ...prev, product }));
        toast.success(`${product.products.title} succefully added to cart`);
      })
      .catch((error) => console.error("Error:", error));
  };

  // add to wishlist function
  const handleAddToWishlist = (id) => {
    const token = localStorage.getItem("token");
    fetch(`https://my-banda.onrender.com/wishlists/${id}`, {
      method: "POST",
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
      .then((product) => {
        setWishlistItems((prev) => ({ ...prev, product }));
        if (product.message) {
          toast.error(`${product.message} `);
        } else
          toast.success(
            `${product.products.title} succefully added to wishlist`
          );
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  };

  // fetch length of cart
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://my-banda.onrender.com//carts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // getTotalCartItems(data)
        setCartNum(data.length);
      })
      .catch((error) => console.error(error));
  }, [handleAddToCart]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://my-banda.onrender.com/wishlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // getTotalCartItems(data)
        setWishlistNum(data.length);
      })
      .catch((error) => console.error(error));
  }, [handleAddToWishlist]);

  return (
    <BuyerContext.Provider
      value={{
        handleAddToCart,
        wishlistItems,
        setWishlistItems,
        search,
        setSearch,
        handleAddToWishlist,
        wishlistNum,
        setWishlistNum,
        setCartNum,
        cartNum,
        products,
        setProducts,
      }}
    >
      {children}
    </BuyerContext.Provider>
  );
};

export default BuyerContext;
