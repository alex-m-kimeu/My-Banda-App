import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useParams } from "react-router-dom";

export const SinglePage = () => {
    const [productData, setProductData] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [storeData, setStoreData] = useState(null); // State to store store data
    const [productIdInput, setProductIdInput] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProductData(id);
        }
    }, [id]);

    const fetchProductData = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage");
            }

            let userId;
            try {
                const decodedToken = jwtDecode(token);
                userId = decodedToken.sub.id;
            } catch (error) {
                console.error("Error decoding token:", error);
                throw new Error("Failed to decode token");
            }

            const productResponse = await fetch(`https://my-banda.onrender.com/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!productResponse.ok) {
                throw new Error("Failed to fetch product");
            }

            const productData = await productResponse.json();
            setProductData(productData);

            const category = productData.category_name;
            const relatedResponse = await fetch(`https://my-banda.onrender.com/products?userId=${userId}&category=${category}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!relatedResponse.ok) {
                throw new Error("Failed to fetch related products");
            }

            const relatedData = await relatedResponse.json();
            const filteredRelatedProducts = relatedData.filter((product) => product.id !== productData.id);
            setRelatedProducts(filteredRelatedProducts); // Update related products state
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found in localStorage");
            }

            const response = await fetch("https://my-banda.onrender.com/carts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) {
                throw new Error("Failed to add product to cart");
            }

            const data = await response.json();
            alert("Product added to cart");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("Failed to add product to cart");
        }
    };

    const handleRelatedProductClick = (product) => {
        setProductData(product);
    };

    return (
        <>
            <section className="max-w-6xl mx-auto mt-10 p-5 border-2 border-gray-300 shadow-md rounded-2xl">
                {/* Button to fetch store details */}
                <button
                    className="bg-black text-white py- px-2 rounded-lg mt-2 cursor-pointer"
                    onClick={() => fetchProductData(productData.id)}
                >
                    Store Details
                </button>
                <h3 className="text-2xl font-bold mb-5">Product</h3>
                {productData && (
                    <div className="border rounded-lg p-5 relative">
                        <div className="relative" onClick={() => handleRelatedProductClick(productData)}>
                            <img src={productData.images} alt={productData.title} className="w-full rounded cursor-pointer" />
                            <CiHeart className="absolute top-2 right-2" />
                        </div>
                        <h4 className="mt-3 font-bold">{productData.title}</h4>
                        <div className="flex items-center mt-1">
                            {[...Array(5)].map((star, index) => (
                                <FaStar key={index} className="text-yellow-500" />
                            ))}
                            <span className="ml-2 text-gray-600">({productData.totalReviews} reviews)</span>
                        </div>
                        <p className="text-yellow-500 font-bold">${productData.price}</p>
                        <button
                            className="bg-Secondary text-white py-2 px-4 rounded-lg mt-2 cursor-pointer"
                            onClick={() => handleAddToCart(productData.id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                )}
            </section>

            {/* Related Products Section */}
            <section className="max-w-6xl mx-auto mt-10 p-5 border-2 border-gray-300 shadow-md rounded-2xl">
                <h3 className="text-2xl font-bold mb-5">Related Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="border rounded-lg p-5 relative">
                            <div className="relative" onClick={() => handleRelatedProductClick(relatedProduct)}>
                                <img src={relatedProduct.mainImage} alt={relatedProduct.title} className="w-full rounded cursor-pointer" />
                                <CiHeart className="absolute top-2 right-2 cursor-pointer" />
                            </div>
                            <h4 className="mt-3 font-bold">{relatedProduct.title}</h4>
                            <div className="flex items-center mt-1">
                                {[...Array(5)].map((star, index) => (
                                    <FaStar key={index} className="text-yellow-500" />
                                ))}
                                <span className="ml-2 text-gray-600">({relatedProduct.totalReviews} reviews)</span>
                            </div>
                            <p className="text-yellow-500 font-bold">${relatedProduct.price}</p>
                            <button
                                className="bg-Secondary text-white py-2 px-4 rounded-lg mt-2 cursor-pointer"
                                onClick={() => handleAddToCart(relatedProduct.id)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};
