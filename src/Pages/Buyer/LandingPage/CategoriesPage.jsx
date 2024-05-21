/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { MdFavoriteBorder } from "react-icons/md";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BuyerContext from "../BuyerContext/BuyerContext";
import { useNavigate } from "react-router-dom";


export const CategoriesPage = () => {
  const{ handleAddToCart, handleAddToWishlist}=useContext(BuyerContext)
  const navigate = useNavigate()


  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetchProducts(token);
  }, [categoryName]);

  const fetchProducts = (token) => {
    fetch("http://127.0.0.1:5500/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.filter(
          (product) => product.category_name === categoryName
        );
        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error:", error));
  };
  const handleProductClick=(productId) =>{
    navigate(`/products/${productId}`);

  }

  return (
    <div className="bg-Primary font-body text-Text min-h-screen">
      <main className="p-4 md:p-8 lg:p-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-8">
          {categoryName}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : ""
                }

                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {product.title}
                  </h3>
                  <p className="text-Green text-sm mb-2">
                    By {product.store ? product.store.name : "Unknown"}
                  </p>
                  <p className="text-Green text-lg font-bold">
                    ${product.price}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="bg-Secondary text-Primary p-2 rounded-lg flex items-center"
                    onClick={() => handleAddToWishlist(product.id)}
                  >
                    <MdFavoriteBorder className="mr-1" />
                    Wishlist
                  </button>
                  <button
                    className="bg-Secondary text-Primary p-2 rounded-lg flex items-center"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
