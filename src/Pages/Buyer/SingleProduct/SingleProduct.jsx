import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

export const SinglePage = () => {
    const [productData, setProductData] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const Id = decodedToken.sub.id;
    
        fetchProducts(token, Id); 
    }, []);

    const fetchProducts = (token, id) => {
        fetch(`'http://127.0.0.1:5500/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setProductData(data);
        })
        .catch(error => console.error('Error:', error));
    };


    const [value, setValue] = useState(0);
    const [amount, setAmount] = useState(1);

    const handleMinus = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    };
    return (
        <>
            <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            {productData.map(product => (
                <article key={product.id} className="flex">
                    <div className="flex flex-col items-start justify-start gap-5 flex-wrap mr-5">
                        {product.images.map((image, index) => (
                            <img
                                key={index}
                                onClick={() => setValue(index)}
                                src={image}
                                alt=""
                                className={`w-20 rounded-xl cursor-pointer ${index === value ? "border-2 border-yellow-300 opacity-80" : "border-2 border-transparent"}`}
                            />
                        ))}
                    </div>
                    <img src={product.mainImage} alt="" className="w-3/4 rounded-2xl" />
                    <article className="px-8 pb-10">
                        <h1 className="text-slate-900 mb-10 font-bold text-3xl lg:text-4xl">{product.title}</h1>
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((star, index) => (
                                    <FontAwesomeIcon key={index} icon={index < product.rating ? faStar : faStarRegular} className={index < product.rating ? "text-yellow-500" : "text-gray-400"} />
                                ))}
                            </div>
                            <span className="ml-2 text-gray-600">({product.totalReviews} reviews)</span>
                        </div>
                        <p className="text-slate-600 mb-10 leading-relaxed">{product.description}</p>

                        <div className="underline w-25 h-1 bg-slate-300 mt-2"></div>
                        <div className="flex flex-wrap items-center justify-between mb-4">
                            <ul className="flex items-center gap-5">
                                <li className="text-slate-900 font-bold text-2xl">{product.price}</li>
                            </ul>
                        </div>

                        <div className="mt-10 lg:flex items-center justify-between gap-2">
                            <ul className="flex items-center justify-between bg-slate-100 py-2 px-4 rounded shadow lg:flex-1">
                                <li onClick={handleMinus} className="cursor-pointer">
                                    <FontAwesomeIcon icon={faMinus} />
                                </li>
                                <li>{amount}</li>
                                <li onClick={() => setAmount(amount + 1)} className="cursor-pointer bg-Secondary  hover:bg-yellow-600 transition-all duration-200 rounded">
                                    <FontAwesomeIcon className="text-white m-1" icon={faPlus} />
                                </li>
                            </ul>

                            <div className="lg:flex-1">
                                <button className="flex items-center justify-center gap-4 bg-Secondary py-2 px-4 text-white font-bold rounded-lg shadow mt-5 w-full lg:mt-0 hover:bg-yellow-600 transition-all duration-200">
                                    Buy Now
                                </button>
                            </div>

                            <div className="cursor-pointer">
                                <FontAwesomeIcon className="flex items-center justify-center gap-2 text-gray-500 mt-4" icon={faHeart} />
                            </div>
                        </div>
                    </article>
                </article>
            ))}
        </section>

            <section className="mt-8">
                <div className="py-2 bg-white max-w-7xl mx-auto">
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold">Related Items</h3>
                        <div className="underline w-28.5 h-1 bg-Secondary mt-2"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {products.map((item) => (
                            <div key={item.id} className="border rounded-lg p-5 relative">
                                <div className="relative">
                                    <img src={item.image} alt={item.name} className="w-full rounded" />
                                    <FontAwesomeIcon icon={faHeart} className="absolute top-2 right-2 text-gray-400" />
                                </div>
                                <h4 className="mt-3 font-bold">{item.title}</h4>
                                <div className="flex items-center mt-1">
                                    {[...Array(5)].map((star, index) => (
                                        <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
                                    ))}
                                    <span className="ml-2 text-gray-600">({item.reviews})</span>
                                </div>
                                <p className="text-yellow-500 font-bold">${item.price}</p>
                                <button className="bg-Secondary text-white py-2 px-4 rounded-lg mt-2">Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
           
        </>
    );
};
 
