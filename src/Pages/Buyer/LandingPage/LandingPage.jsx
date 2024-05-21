/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import banner2 from "../../../assets/banner2.jpg";
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
import BuyerContext from "../BuyerContext/BuyerContext";



export const LandingPage = () => {
  const{ handleAddToCart, handleAddToWishlist}=useContext(BuyerContext)
  const navigate = useNavigate()

  const categories = [
    { name: "Electronics", icon: electronicsIcon },
    { name: "Clothing", icon: clothingIcon },
    { name: "Shoes", icon: shoesIcon },
    { name: "Personal care and beauty", icon: beautyIcon },
    { name: "Food and Beverages", icon: foodIcon },
  ];

  const [products, setProducts] = useState([]);


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


  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${encodeURIComponent(categoryName)}`);
  };

  const handleProductClick=(productId) =>{
    navigate(`/products/${productId}`);

  }

  return (
    <div className="bg-Primary text-Text font-body">
      {/* Banner */}
      <div className="relative ">
        <img src={banner2} alt="Banner" className="w-full h-64 object-cover px-none" />
        <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 p-4">
          <h2 className="text-3xl text-Primary font-bold">
            Welcome to My Banda
          </h2>
          <p className="text-Primary mt-2">
            Find the best products with the best deals!
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
            <div
              key={category.name}
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src={category.icon}
                alt={`${category.name} icon`}
                className="w-12 h-12"
              onClick={() => handleCategoryClick(category.name)}

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
              Get the best sound quality with JBL speakers and headphones
            </p>
            <button className="bg-Secondary text-Primary p-2 rounded-md mt-4">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="p-8">
        <h3 className="text-2xl font-bold mb-4">Explore Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-Primary rounded-md shadow-md relative"
            >
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : ""
                    
                }
              onClick={()=>handleProductClick(product.id)}

                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-t-md"
              />
              <div className="px-3">
              <h4 className="text-lg font-bold">{product.title}</h4>
              <p className="text-Variant2 text-xs mt-2">{product.description}</p>
              <p className="text-Secondary mt-2">{product.price}</p>
              </div>
              <button
                  className="hover:bg-Secondary bg-Secondary bg-opacity-50 absolute top-3 right-3 text-Primary p-2 rounded-md"
                  onClick={() => handleAddToWishlist(product.id)}
                >
                  <MdFavoriteBorder className="inline-block " />
                  
                </button>
              <div  onClick={() => handleAddToCart(product.id)} className="mt-4 text-center py-1 rounded-b text-white hover:text-Secondary bg-black " >
               Add to Cart
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
