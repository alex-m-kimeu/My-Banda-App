const categories = [
  { name: 'Phones', icon: '📱' },
  { name: 'Computers', icon: '💻' },
  { name: 'Smartwatches', icon: '⌚' },
  { name: 'Headphones', icon: '🎧' },
  { name: 'Gaming', icon: '🎮' }
];

const trendingCategories = [
  { name: 'Jewelry', img: 'https://via.placeholder.com/400' },
  { name: 'Laptops', img: 'https://via.placeholder.com/400' },
  { name: 'Books', img: 'https://via.placeholder.com/400' },
  { name: 'Makeup', img: 'https://via.placeholder.com/400' },
  { name: 'Clothing', img: 'https://via.placeholder.com/400' },
  { name: 'Toys', img: 'https://via.placeholder.com/400' },
  { name: 'Accessories', img: 'https://via.placeholder.com/400' },
  { name: 'Tools', img: 'https://via.placeholder.com/400' }
];

const Homepage = () => {
    return (
      <div className="bg-Primary text-Text font-body">
        {/* Banner */}
        <div className="relative">
          <img src="https://via.placeholder.com/1500x500" alt="Banner" className="w-full" />
          <div className="absolute inset-0 flex flex-col justify-center items-start bg-black bg-opacity-50 p-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-Primary font-bold">Give your vehicle some love</h2>
            <p className="text-Primary mt-2">Find the best parts and accessories for your car</p>
            <button className="bg-Secondary text-Variant p-2 rounded-md mt-4">Shop Now</button>
          </div>
        </div>
  
        {/* Categories */}
        <section className="p-8">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Browse By Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col items-center">
                <div className="text-5xl">{category.icon}</div>
                <div className="mt-2 font-semibold">{category.name}</div>
              </div>
            ))}
          </div>
        </section>
  
        {/* Promotional Banner */}
        <section className="p-8">
          <div className="bg-black text-Primary p-4 rounded-md shadow-md flex flex-col sm:flex-row items-center">
            <img src="https://via.placeholder.com/400" alt="Promotion" className="w-full sm:w-1/3 rounded-md mb-4 sm:mb-0" />
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
                <img src={category.img} alt={category.name} className="w-full h-auto rounded-md shadow-md" />
                <div className="font-bold mt-2">{category.name}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }
  
  export default Homepage;
  