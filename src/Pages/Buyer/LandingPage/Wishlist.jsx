import { useEffect, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import BuyerContext from "../BuyerContext/BuyerContext";
import { NavLink, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import wishlist from "../../../assets/wishlist.jpg";
import { LiaArrowLeftSolid } from "react-icons/lia";

export const Wishlist = () => {
  const navigate = useNavigate()
  const { handleAddToCart, wishlistItems,search, setWishlistItems } = useContext(BuyerContext)

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://my-banda.onrender.com/wishlists`, {
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
      })
      .catch((error) => {
        console.error("Error fetching wishlist items:", error);
      });
  }, []);

  const handleDeleteFromWishlist = (productId) => {
    const token = localStorage.getItem("token");
    fetch(`https://my-banda.onrender.com/wishlists/${productId}`, {
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

  function handleDelete(id) {
    const newProduct = wishlistItems.filter((item) => item.products.id !== id);
    setWishlistItems(newProduct);
  }

  const handleAddAllToCart = () => {
    const productIds = wishlistItems.map(item => item.product_id);
    const token = localStorage.getItem("token");
    const requests = productIds.map(productId =>
      fetch(`https://my-banda.onrender.com/products/${productId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
    Promise.all(requests)
      .then(responses => responses.forEach(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }))
      .catch(error => console.error("Error adding all items to cart:", error));
  };






  return (
    <div className="flex flex-col gap-[20px] px-[20px] md:px-[40px] lg:px-[120px] py-[20px]">
      {wishlistItems.length > 0 ? (
        <>
          <div className="flex justify-between">
            <div className="flex items-center gap-[2px]">
              <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate('/buyer/home')}>
                <LiaArrowLeftSolid className="fill-Secondary" />
                <p className="text-normal text-Secondary text-base">Back</p>
              </div>
              <div className="text-Secondary mx-1">/</div>
              <h1 className="text-xl md:text-2xl font-bold text-Text">Wishlist</h1>
            </div>
            <button
              onClick={handleAddAllToCart}
              className="border text-sm md:text-base border-gray-300 p-1 md:p-2 rounded hover:bg-Secondary hover:text-white">
              Add All To Cart
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.products.id} className="bg-Primary w-full h-[350px] flex flex-col justify-between shadow-inner relative">
                <img
                  src={
                    item.products.images && item.products.images.length > 0
                      ? item.products.images[0]
                      : ""
                  }
                  alt={item.name}
                  className="w-full h-[220px] object-cover"
                />
                <h4 className="text-base font-semibold px-2 ">{item.products.title}</h4>
                <p className="text-Secondary px-2 ">$ {item.products.price}</p>
                <div className="px-2 flex items-center gap-[2px]">
                  <ReactStars
                    count={5}
                    value={
                      item.products.reviews.length > 0
                        ? item.products.reviews.reduce((total, review) => total + review.rating, 0) / item.products.reviews.length
                        : 0
                    }
                    size={20}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                  />
                  <p className="text-sm font-normal text-Variant2">({item.products.reviews.length})</p>
                </div>
                <button
                  className="text-center py-1 text-white cursor-pointer bg-black"
                  onClick={() => handleAddToCart(item.product_id)}
                >
                  Add To Cart
                </button>
                <button
                  className="absolute top-2 right-2 bg-Secondary p-[5px] rounded-full bg-opacity-50 hover:bg-opacity-100 transition-opacity duration-200"
                  onClick={() => handleDeleteFromWishlist(item.product_id)}
                >
                  <FaTrash className="fill-Primary w-[15px] h-[15px]" />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between ">
            <h1 className="text-xl md:text-2xl font-bold text-Text">
              Wishlist
            </h1>
            <NavLink to="/buyer/home">
              <button className="border text-sm md:text-base border-gray-300 p-1 md:p-2 rounded hover:bg-Secondary hover:text-white">
                Explore Shop
              </button>
            </NavLink>
          </div>
          <div className="flex justify-center">
            <img
              src={wishlist}
              alt="wishlist"
              className="h-80 w-80 mt-5 "
            />
          </div>
        </div>
      )}
    </div>
  );
};
