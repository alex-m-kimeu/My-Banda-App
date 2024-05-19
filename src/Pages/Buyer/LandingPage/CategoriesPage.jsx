/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const CategoriesPage = () => {
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

  return (
    <div className="bg-Primary font-body text-Text min-h-screen">
      <main className="p-4 md:p-8 lg:p-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center">
          {categoryName}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-3xl shadow-md">
              <img
                src={product.images[0]} // Assuming the first image is the main product image
                alt={product.title}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="px-2 font-semibold">{product.title}</h3>
              <p className="px-2 text-Green">By {product.store.name}</p>
              <div className="flex justify-between">
                <p className="px-2 text-lg text-Green">${product.price}</p>
                <button className="mt-2 px-5 font-bold mr-2 text-xl mb-3 bg-Secondary text-Primary rounded-lg flex items-center">
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
