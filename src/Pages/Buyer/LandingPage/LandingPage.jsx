import banner from '../../../assets/banner.jpg';
import electronicsIcon from '../../../assets/electronics.svg';
import clothingIcon from '../../../assets/clothing.svg';
import shoesIcon from '../../../assets/shoes.svg';
import beautyIcon from '../../../assets/beauty.svg';
import foodIcon from '../../../assets/food.svg';
import jbl from '../../../assets/jbl.jpg';
import electronicsImg from '../../../assets/electronics.jpg';
import clothingImg from '../../../assets/clothing.jpg';
import shoesImg from '../../../assets/shoes.jpg';
import beautyImg from '../../../assets/beauty.jpg';
import foodImg from '../../../assets/food.jpg';

export const LandingPage = () => {
  const categories = [
    { name: 'Electronics', icon: electronicsIcon },
    { name: 'Clothing', icon: clothingIcon },
    { name: 'Shoes', icon: shoesIcon },
    { name: 'Personal care and beauty', icon: beautyIcon },
    { name: 'Food and Beverages', icon: foodIcon },
  ];

  const trendingCategories = [
    { name: 'Electronics', img: electronicsImg },
    { name: 'Clothing', img: clothingImg },
    { name: 'Shoes', img: shoesImg },
    { name: 'Personal care and beauty', img: beautyImg },
    { name: 'Food and Beverages', img: foodImg },
  ];

  return (
    <div className="bg-Primary text-Text font-body">
      {/* Banner */}
      <div className="relative">
        <img
          src={banner}
          alt="Banner"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 p-4">
          <h2 className="text-3xl text-Primary font-bold">Give your vehicle some love</h2>
          <p className="text-Primary mt-2">Find the best parts and accessories for your car</p>
          <button className="bg-Secondary text-Variant p-2 rounded-md mt-4">Shop Now</button>
        </div>
      </div>

      {/* Categories */}
      <section className="p-8">
        <h3 className="text-2xl font-bold mb-4">Browse By Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center">
              <img src={category.icon} alt={`${category.name} icon`} className="w-12 h-12" />
              <div className="mt-2">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="p-8">
        <div className="bg-black text-Primary p-4 rounded-md shadow-md flex flex-col sm:flex-row items-center">
          <img src={jbl} alt="Promotion" className="w-full sm:w-1/3 rounded-md mb-4 sm:mb-0" />
          <div className="ml-0 sm:ml-4">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">Enhance Your Music Experience</h3>
            <p className="mt-2">Discover the best sound quality with our top-rated speakers</p>
            <button className="bg-Secondary text-Variant p-2 rounded-md mt-4">Buy Now</button>
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="p-8">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Trending Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {trendingCategories.map((category) => (
            <div key={category.name} className="flex flex-col items-center">
<img
  src={category.img}
  alt={category.name}
  className="w-full h-56 object-cover rounded-md shadow-md cursor-pointer"
/>
              <div className="font-bold mt-2">{category.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
