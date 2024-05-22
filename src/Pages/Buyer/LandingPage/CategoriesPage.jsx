import { useState, useEffect, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import { MdFavoriteBorder } from "react-icons/md";
import { useParams } from "react-router-dom";
import BuyerContext from "../BuyerContext/BuyerContext";
import { useNavigate } from "react-router-dom";
import { LiaArrowLeftSolid } from "react-icons/lia";

export const CategoriesPage = () => {
  const { handleAddToCart, handleAddToWishlist } = useContext(BuyerContext)
  const navigate = useNavigate()
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
  }, [categoryName]);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  }

  return (
    <div className="flex flex-col gap-[20px] px-[20px] md:px-[40px] lg:px-[120px] py-[20px]">
      <div className="flex items-center justify-normal md:justify-between">
        <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate('/buyer/home')}>
          <LiaArrowLeftSolid className="fill-Secondary" />
          <p className="text-normal text-Secondary text-base">Back</p>
        </div>
        <div className="text-Secondary mx-1 md:hidden">/</div>
        <h1 className="text-2xl font-bold text-Text text-center flex-none md:flex-grow">
          {categoryName}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-Primary w-full h-[320px] lg:h-[350px] flex flex-col justify-between shadow-inner relative mb-3 md:mb-0">
            <img
              src={
                product.images && product.images.length > 0
                  ? product.images[0]
                  : ""
              }
              onClick={() => handleProductClick(product.id)}
              alt={product.name}
              className="w-full h-[220px] object-cover"
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
  );
};