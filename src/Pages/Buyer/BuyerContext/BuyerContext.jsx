import { createContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const BuyerContext = createContext({});

export const BuyerProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartNum, setCartNum] = useState(0)
  const [wishlistNum, setWishlistNum] = useState(0)
  const [search, setSearch] = useState("");

  const fetchWishlistItems = useCallback(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5500/wishlists", {
      method: "GET",
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
        setWishlistNum(data.length);
      })
      .catch((error) => {
        console.error("Error fetching wishlist items:", error);
      });
  }, [setWishlistItems, setWishlistNum]);

  const handleAddToCart = useCallback((id) => {
    const token = localStorage.getItem('token')

    fetch(`http://127.0.0.1:5500/products/${id}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(product => {
        setProducts((prev) => [...prev, product])
        setCartNum((prev) => prev + 1)
        toast.success(`${product.products.title} successfully added to cart`)
      })
      .catch(error => console.error('Error:', error));
  }, [setProducts, setCartNum]);

  const handleRemoveFromCart = useCallback((id) => {
    const token = localStorage.getItem('token')

    fetch(`http://127.0.0.1:5500/products/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(product => {
        setProducts((prev) => prev.filter(p => p.id !== product.id))
        setCartNum((prev) => prev - 1)
        toast.success(`${product.products.title} successfully removed from cart`)
      })
      .catch(error => console.error('Error:', error));
  }, [setProducts, setCartNum]);

  const handleAddToWishlist = useCallback((id) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5500/wishlists/${id}`, {
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
      .then(product => {
        setWishlistItems((prev) => [...prev, product])
        setWishlistNum((prev) => prev + 1)
        if (product.message) {
          toast.error(`${product.message} `)
        } else {
          toast.success(`${product.products.title} successfully added to wishlist`)
        }
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  }, [setWishlistItems, setWishlistNum]);

  const handleRemoveFromWishlist = useCallback((id) => {
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:5500/wishlists/${id}`, {
      method: "DELETE",
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
      .then(() => {
        fetchWishlistItems();
        toast.success(`Product successfully removed from wishlist`)
      })
      .catch((error) => {
        console.error("Error removing product from wishlist:", error);
        fetchWishlistItems();
      });
  }, [fetchWishlistItems]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5500/carts", {
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
        if (data.length === 0) {
          setCartNum(0);
        } else {
          setCartNum(data.length);
        }
      })
      .catch((error) => {
        console.error(error);
        setCartNum(0);
      });
  }, []);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  return (
    <BuyerContext.Provider value={{
      handleAddToCart, handleRemoveFromCart, wishlistItems, setWishlistItems, search, setSearch, handleAddToWishlist, handleRemoveFromWishlist, wishlistNum, setWishlistNum, setCartNum, cartNum, products, setProducts
    }}>
      {children}
    </BuyerContext.Provider>
  )
}

export default BuyerContext;