import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { FaStar } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { useParams } from 'react-router-dom';

export const SinglePage = () => {
    const [productData, setProductData] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [productIdInput, setProductIdInput] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetchProductData(id);
        }
    }, [id]);

    const fetchProductData = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in localStorage');
            }

            let userId;
            try {
                const decodedToken = jwtDecode(token);
                userId = decodedToken.sub.id;
            } catch (error) {
                console.error('Error decoding token:', error);
                throw new Error('Failed to decode token');
            }

            const productResponse = await fetch(`http://127.0.0.1:5500/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!productResponse.ok) {
                throw new Error('Failed to fetch product');
            }

            const productData = await productResponse.json();
            setProductData(productData);

            const category = productData.category_name;
            const relatedResponse = await fetch(`http://127.0.0.1:5500/products?userId=${userId}&category=${category}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!relatedResponse.ok) {
                throw new Error('Failed to fetch related products');
            }

            const relatedData = await relatedResponse.json();
            const filteredRelatedProducts = relatedData.filter(product => product.id !== productData.id);
            setRelatedProducts(filteredRelatedProducts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (event) => {
        setProductIdInput(event.target.value);
    };

    const handleFetchProduct = () => {
        fetchProductData(productIdInput);
    };

    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token not found in localStorage');
            }

            const response = await fetch('http://127.0.0.1:5500/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });

            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }

            const data = await response.json();
            alert('Product added to cart')
            console.log('Product added to cart:', data);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart')
        }
    };

    return (
        <>
            <section className="max-w-6xl mx-auto mt-10 p-5 border-2 border-gray-300 shadow-md rounded-2xl">
                <input type="text" value={productIdInput} onChange={handleInputChange} placeholder="Enter Product ID" />
                <button onClick={handleFetchProduct}>Fetch Product</button>
                <h3 className="text-2xl font-bold mb-5">Product</h3>
                {productData && (
                    <div className="border rounded-lg p-5 relative">
                        <div className="relative">
                            <img src={productData.images} alt={productData.title} className="w-full rounded" />
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

            <section className="mt-8">
                <div className="py-2 bg-white max-w-7xl mx-auto">
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold">Related Items</h3>
                        <div className="underline w-28.5 h-1 bg-Secondary mt-2"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {relatedProducts.map((relatedProduct) => (
                            <div key={relatedProduct.id} className="border rounded-lg p-5 relative">
                                <div className="relative">
                                    <img src={relatedProduct.mainImage} alt={relatedProduct.title} className="w-full rounded" />
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
                </div>
            </section>
        </>
    );
};
