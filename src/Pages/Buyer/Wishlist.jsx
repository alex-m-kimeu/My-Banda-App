const products = [
  {
    id: 1,
    name: 'Gucci duffle bag',
    price: '$850',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'RGB liquid CPU Cooler',
    price: '$190',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'GP11 Shooter USB gamepad',
    price: '$950',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Quilted Satin Jacket',
    price: '$710',
    image: 'https://via.placeholder.com/150',
  },
];

export const App = () => {
  return (
    <div className="bg-Primary font-body text-Text min-h-screen">
      <main className="p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Wish-list (4)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-md p-4">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-lg text-Green">{product.price}</p>
              <button className="w-full mt-2 p-2 bg-Secondary text-Variant rounded-lg">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


// buttons(add to cart)
// fetching products
