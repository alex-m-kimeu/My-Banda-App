import { useState, useEffect, useContext } from "react";
import banner1 from "../../../assets/banner1.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";
import electronics from "../../../assets/electronics.png";
import clothingIcon from "../../../assets/clothing.svg";
import shoes from "../../../assets/shoes.png";
import beauty from "../../../assets/beauty.png";
import jewelry from "../../../assets/jewelry.png";
import headphones from "../../../assets/headphones.png";
import { MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BuyerContext from "../BuyerContext/BuyerContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactStars from "react-rating-stars-component";

export const LandingPage = () => {

  const { handleAddToCart, handleAddToWishlist } = useContext(BuyerContext)
  const navigate = useNavigate()


  const categories = [
    { name: "Electronics", icon: electronics },
    { name: "Clothing", icon: clothingIcon },
    { name: "Shoes", icon: shoes },
    { name: "Health & beauty", icon: beauty },
    { name: "Jewelry", icon: jewelry },
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://my-banda.onrender.com/products", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/categories/${encodeURIComponent(categoryName)}`);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);

  }

  return (
    <div className="bg-Primary">
      <Carousel autoPlay infiniteLoop showThumbs={false} interval={5000} showStatus={false}>
        <div className="relative">
          <img src={banner1} alt="Image 1" className="w-full h-[150px] md:h-[300px] lg:h-[400px]" />
          <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-10 py-4 px-[60px] lg:px-[150px]">
            <h2 className="text-lg md:text-3xl lg:text-4xl text-Text font-bold tracking-wider uppercase">Shop the Latest Trends</h2>
            <p className="text-Primary text-sm md:text-xl mt-2">Discover Endless Possibilities</p>
          </div>
        </div>
        <div className="relative">
          <img src={banner2} alt="Image 1" className="w-full h-[150px] md:h-[300px] lg:h-[400px]" />
          <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-10 py-4 px-[60px] lg:px-[150px]">
            <h2 className="text-lg md:text-3xl lg:text-4xl text-Text font-bold tracking-wider uppercase">Like IT!</h2>
            <p className="text-Primary text-sm md:text-xl mt-2">Order it!!!!</p>
          </div>
        </div>
        <div className="relative">
          <img src={banner3} alt="Image 1" className="w-full h-[150px] md:h-[300px] lg:h-[400px]" />
          <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-10 py-4 px-[60px] lg:px-[150px]">
            <h2 className="text-lg md:text-3xl lg:text-4xl text-Text font-bold tracking-wider uppercase">TImely Deliveries</h2>
            <p className="text-Primary text-sm md:text-xl mt-2">Order, Relax, Wait, Enjoy!</p>
          </div>

        </div>
      </Carousel>
      <div className="flex flex-col gap-[50px] px-[20px] md:px-[60px] lg:px-[120px]">
        <div className="mt-[25px] lg:mt-[40px]">
          <div className="flex gap-[10px] md:gap-[15px] items-center mb-[20px]">
            <div className="w-3 md:w-5 h-8 md:h-10 rounded-[5px] bg-Secondary"></div>
            <span className="text-base font-normal text-Secondary">
              Categories
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-[30px]">Browse By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center gap-[20px] cursor-pointer bg-white p-5 rounded shadow-md hover:bg-Secondary"
                onClick={() => handleCategoryClick(category.name)}
              >
                <img
                  src={category.icon}
                  alt={`${category.name} icon`}
                  className="w-12 h-12"
                />
                <div className="text-center text-base font-normal">
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white w-full h-auto shadow-lg relative">
          <img src={headphones} alt="headphones" className="w-full h-[220px] md:h-[400px] lg:h-[550px]" />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-2 md:px-10 lg:px-20">
            <h2 className="text-base md:text-2xl lg:text-4xl text-Text font-bold tracking-wider uppercase">Best Technology</h2>
            <p className="text-Text text-sm md:text-lg lg:text-xl mt-2 font-medium">Headphones</p>
            <button className="px-2 py-1 md:px-4 md:py-2 bg-Secondary text-white text-sm font-normal rounded-[50px] mt-2">Buy Now</button>
          </div>
        </div>
        <div className="mb-[50px]">
          <div className="flex gap-[10px] md:gap-[15px] items-center mb-[20px]">
            <div className="w-3 md:w-5 h-8 md:h-10 rounded-[5px] bg-Secondary"></div>
            <span className="text-base font-normal text-Secondary">
              Products
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-[30px]">Explore Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-Primary w-full h-[350px] flex flex-col justify-between relative shadow-inner"
              >
                <img
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : ""
                  }
                  onClick={() => handleProductClick(product.id)}
                  alt={product.name}
                  className="w-full h-[220px] md:h-[180px] lg:h-[220px] object-cover cursor-pointer"
                />
                <h4 className="text-base font-semibold px-2 ">
                  {product.title}
                </h4>
                <p className="text-Secondary px-2 ">$ {product.price}</p>
                <div className="px-2 flex items-center gap-[2px]">
                  <ReactStars
                    count={5}
                    value={
                      product.reviews.length > 0
                        ? product.reviews.reduce(
                            (total, review) => total + review.rating,
                            0
                          ) / product.reviews.length
                        : 0
                    }
                    size={20}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                  />
                  <p className="text-sm font-normal text-Variant2">
                    ({product.reviews.length})
                  </p>
                </div>
                <div
                  onClick={() => handleAddToCart(product.id)}
                  className="text-center py-1 text-white cursor-pointer bg-black"
                >
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
    </div>
  );
};
