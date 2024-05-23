import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BuyerContext from "../BuyerContext/BuyerContext";
import { MdFavoriteBorder } from "react-icons/md";

export const StorePage = () => {
    const { handleAddToCart, handleAddToWishlist } = useContext(BuyerContext)
    const { id } = useParams();
    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchStoreData = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:5500/store/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setStoreData(data);
            setLoading(false);
        };

        fetchStoreData();
    }, [id]);

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="w-full bg-Variant3">
                <div className="px-[20px] md:px-[40px] lg:px-[120px] py-[20px] flex flex-col md:flex-row justify-between gap-[10px] md:gap-0">
                    <div className="flex flex-col items-center md:items-start justify-center gap-[10px] md:max-w-[350px] lg:max-w-[700px]">
                        <h1 className="text-lg md:text-2xl text-Text font-semibold">{storeData.store_name}</h1>
                        <p className="text-start hidden sm:block">{storeData.description}</p>
                    </div>
                    <img src={storeData.image} alt={storeData.store_name} className="h-[300px] w-auto md:h-[300px] md:w-[300px] lg:h-[450px] lg:w-[450px] object-cover" />
                </div>
            </div>
            <div className="flex flex-col gap-[8px] px-[20px] md:px-[40px] lg:px-[120px] py-[20px]">
                <p className="text-base text-Text font-semibold">Location:
                    <span
                        className="ml-2 text-base text-Text font-normal">
                        {storeData.location}
                    </span>
                </p>
                <h2 className="text-lg md:text-xl text-Text font-semibold mb-3">Our Products:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
                    {storeData.products.map((product) => (
                        <div key={product.id} className="bg-Primary w-full h-[320px] lg:h-[350px] flex flex-col justify-between shadow-inner relative mb-3 md:mb-0">
                            <img
                                src={
                                    product.images && product.images.length > 0
                                        ? product.images[0]
                                        : ""
                                }
                                onClick={() => handleProductClick(product.id)}
                                alt={product.title}
                                className="w-full h-[220px] md:h-[180px] lg:h-[220px] object-cover cursor-pointer"
                            />
                            <h4 className="text-base font-semibold px-2 ">{product.title}</h4>
                            <p className="text-Secondary px-2 ">$ {product.price}</p>
                            <div className="px-2 flex items-center gap-[2px]">
                                <ReactStars
                                    count={5}
                                    value={
                                        product.reviews.length > 0
                                            ? product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length
                                            : 0
                                    }
                                    size={20}
                                    activeColor="#ffd700"
                                    isHalf={true}
                                    edit={false}
                                />
                                <p className="text-sm font-normal text-Variant2">({product.reviews.length})</p>
                            </div>
                            <div onClick={() => handleAddToCart(product.id)} className="text-center py-1 text-white cursor-pointer bg-black " >
                                Add to Cart
                            </div>
                            <button
                                className="absolute top-2 right-2 bg-Secondary p-1 rounded-full bg-opacity-50 hover:bg-opacity-100 transition-opacity duration-200"
                                onClick={() => handleAddToWishlist(product.id)}
                            >
                                <MdFavoriteBorder className="fill-Primary" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};