import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BuyerContext from "../BuyerContext/BuyerContext";
import ReactStars from "react-rating-stars-component";
import { MdFavoriteBorder } from "react-icons/md";

export const SinglePage = () => {
    const { handleAddToCart, handleAddToWishlist } = useContext(BuyerContext)
    const [productData, setProductData] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate()

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

            const allProductsResponse = await fetch(`https://my-banda.onrender.com/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!allProductsResponse.ok) {
                throw new Error("Failed to fetch all products");
            }

            const allProductsData = await allProductsResponse.json();
            const relatedProducts = allProductsData.filter((product) => product.category_name === productData.category_name && product.id !== productData.id);
            setRelatedProducts(relatedProducts);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setProductData({});
            setLoading(false);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[20px] px-[20px] md:px-[40px] lg:px-[120px] py-[20px]">
            <div className="flex flex-col gap-[30px] md:gap-[50px]">
                <div className="flex flex-col lg:flex-row justify-center gap-[20px] lg:gap-[50px]">
                    <div className="flex flex-col sm:flex-row-reverse gap-4 sm:gap-[30px]">
                        <div className="flex-grow max-h-[350px] md:max-h-[632px] sm:max-w-[550px]">
                            <img src={
                                productData && productData.images && productData.images.length > 0
                                    ? productData.images[0]
                                    : ""
                            }
                                alt={productData ? productData.title : ''}
                                className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-row sm:flex-col gap-5 md:gap-4 justify-center md:justify-normal">
                            {productData && productData.images && productData.images.slice(1, 4).map((image, index) => (
                                <div key={index}>
                                    <img
                                        src={image}
                                        alt={productData ? `${productData.title} ${index + 1}` : ''}
                                        className="w-[60px] sm:w-[180px] h-[60px] sm:h-[200px] object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:max-w-[700px] space-y-2 lg:space-y-4">
                        <h1 className="text-lg font-bold">{productData ? productData.title : 'Loading...'}</h1>
                        <div className="flex items-center gap-[2px]">
                            <ReactStars
                                count={5}
                                value={
                                    productData && productData.reviews && productData.reviews.length > 0
                                        ? productData.reviews.reduce((total, review) => total + review.rating, 0) / productData.reviews.length
                                        : 0
                                }
                                size={20}
                                activeColor="#ffd700"
                                isHalf={true}
                                edit={false}
                            />
                            <p className="text-base font-normal text-Variant2">({productData && productData.reviews ? productData.reviews.length : 'Loading...'} Reviews)</p>
                        </div>
                        <h2 className="text-yellow-500 font-bold text-base">${productData ? productData.price : 'Loading...'}</h2>
                        <p className="text-base text-Variant2 text-left"> {productData ? productData.description : 'Loading...'}</p>
                        <div className="border-b-2 mt-4"></div>
                        <h2
                            className="text-base text-Secondary font-bold cursor-pointer"
                            onClick={() => navigate(`/store/${productData ? productData.store.id : ''}`)}
                        >
                            {productData ? productData.store.store_name : 'Loading...'}
                        </h2>
                        <div className="flex justify-between items-center">
                            <button
                                className="bg-Secondary py-1 px-4 cursor-pointer text-white text-lg"
                                onClick={() => handleAddToCart(productData.id)}
                            >
                                Buy Now
                            </button>
                            <div className="border-2 p-1 rounded-md" onClick={() => handleAddToWishlist(productData.id)}>
                                <MdFavoriteBorder className="fill-gray-500 hover:fill-Secondary w-[25px] h-[25px] cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px] md:gap-[30px] mb-2">
                    <h2 className="text-lg md:text-xl text-Text font-semibold">Related Items</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
                        {relatedProducts.slice(0, 4).map((relatedProduct) => (
                            <div key={relatedProduct.id} className="bg-Primary w-full h-[320px] lg:h-[350px] flex flex-col justify-between shadow-inner relative mb-3 md:mb-0">
                                <img
                                    src={
                                        relatedProduct.images && relatedProduct.images.length > 0
                                            ? relatedProduct.images[0]
                                            : ""
                                    }
                                    onClick={() => handleProductClick(relatedProduct.id)}
                                    alt={relatedProduct.title}
                                    className="w-full h-[220px] md:h-[180px] lg:h-[220px] object-cover cursor-pointer"
                                />
                                <h4 className="text-sm font-semibold px-2 ">{relatedProduct.title}</h4>
                                <p className="text-Secondary px-2 ">$ {relatedProduct.price}</p>
                                <div className="px-2 flex items-center gap-[2px]">
                                    <ReactStars
                                        count={5}
                                        value={
                                            relatedProduct.reviews.length > 0
                                                ? relatedProduct.reviews.reduce((total, review) => total + review.rating, 0) / relatedProduct.reviews.length
                                                : 0
                                        }
                                        size={20}
                                        activeColor="#ffd700"
                                        isHalf={true}
                                        edit={false}
                                    />
                                    <p className="text-sm font-normal text-Variant2">({relatedProduct.reviews.length})</p>
                                </div>
                                <div onClick={() => handleAddToCart(relatedProduct.id)} className="text-center py-1 text-white cursor-pointer bg-black " >
                                    Add to Cart
                                </div>
                                <button
                                    className="absolute top-2 right-2 bg-Secondary p-1 rounded-full bg-opacity-50 hover:bg-opacity-100 transition-opacity duration-200"
                                    onClick={() => handleAddToWishlist(relatedProduct.id)}
                                >
                                    <MdFavoriteBorder className="fill-Primary" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};