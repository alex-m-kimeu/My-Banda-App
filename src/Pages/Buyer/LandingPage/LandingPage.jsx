/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import banner from "../../../assets/banner.jpg";
import electronicsIcon from "../../../assets/electronics.svg";
import clothingIcon from "../../../assets/clothing.svg";
import shoesIcon from "../../../assets/shoes.svg";
import beautyIcon from "../../../assets/beauty.svg";
import foodIcon from "../../../assets/food.svg";
import jbl from "../../../assets/jbl.jpg";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const categories = [
    { name: "Electronics", icon: electronicsIcon },
    { name: "Clothing", icon: clothingIcon },
    { name: "Shoes", icon: shoesIcon },
    { name: "Personal care and beauty", icon: beautyIcon },
    { name: "Food and Beverages", icon: foodIcon },
  ];

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetchProducts(token, userId);
  }, []);

  const fetchProducts = (token, userId) => {
    fetch(`http://localhost:5500/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const addToWishlist = (product) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5500/wishlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product added to wishlist:", data);
        navigate("/wishlist");
      })
      .catch((error) => {
        console.error("Error adding product to wishlist:", error);
      });
  };

  return (
    <div className="bg-Primary text-Text font-body">
      {/* Banner */}
      <div className="relative">
        <img src={banner} alt="Banner" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 p-4">
          <h2 className="text-3xl text-Primary font-bold">
            Give your vehicle some love
          </h2>
          <p className="text-Primary mt-2">
            Find the best parts and accessories for your car
          </p>
          <button className="bg-Secondary text-Variant p-2 rounded-md mt-4">
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <section className="p-8">
        <h3 className="text-2xl font-bold mb-4">Browse By Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center">
              <img
                src={category.icon}
                alt={`${category.name} icon`}
                className="w-12 h-12"
              />
              <div className="mt-2">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="p-8">
        <div className="bg-black text-Primary p-4 rounded-md shadow-md flex flex-col sm:flex-row items-center">
          <img
            src={jbl}
            alt="Promotion"
            className="w-full sm:w-1/3 rounded-md mb-4 sm:mb-0"
          />
          <div className="ml-0 sm:ml-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
              Enhance Your Music Experience
            </h3>
            <p className="mt-2">
              Discover the best sound quality with our top-rated speakers
            </p>
            <button className="bg-Secondary text-Variant p-2 rounded-md mt-4">
              Buy Now
            </button>
          </div>
        </div>
      </section>

      {/* Explore products */}
      <section className="p-8">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Explore Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-56 object-cover rounded-md shadow-md cursor-pointer"
              />
              <div className="font-bold mt-2">{product.title}</div>
              <p className="mt-1">{product.description}</p>
              <div className="flex items-center mt-2">
                <p className="font-bold text-xl mr-2">${product.price}</p>
                <button onClick={() => addToWishlist(product)}>
                  <MdFavoriteBorder className="w-7 h-7 -mr-3" />
                </button>
                <button className="bg-Secondary ml-5 py-2 px-4 rounded-md text-Primary flex items-center">
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
